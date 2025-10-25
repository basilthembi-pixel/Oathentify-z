'use client';
import { useState, useTransition, useEffect, useRef, useActionState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  FileText,
  Loader2,
  PartyPopper,
  User,
  Users,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { AGREEMENT_TYPES } from '@/lib/data';
import { suggestTermsAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { AgreementShare } from '@/components/agreement-share';

const step1Schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  agreementType: z.string().min(1, 'Please select an agreement type.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
});

const step2Schema = z.object({
  counterPartyName: z.string().min(2, 'Name is required.'),
  counterPartyEmail: z.string().email('Invalid email address.'),
});

type FormValues = z.infer<typeof step1Schema> & z.infer<typeof step2Schema>;

function Step1() {
  const form = useFormContext<FormValues>();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [aiState, formAction] = useActionState(suggestTermsAction, {
    suggestedTerms: '',
    error: '',
  });

  const handleSuggestTerms = () => {
    startTransition(() => {
        const formData = new FormData();
        formData.append('agreementType', form.getValues('agreementType'));
        formAction(formData);
    });
  };

  useEffect(() => {
    if (aiState.suggestedTerms) {
      form.setValue('description', aiState.suggestedTerms, { shouldValidate: true });
      toast({
        title: 'AI Suggestion Added',
        description: 'The AI-suggested terms have been added to the description.',
      });
    }
    if (aiState.error) {
      toast({
        variant: 'destructive',
        title: 'AI Suggestion Failed',
        description: aiState.error,
      });
    }
  }, [aiState, form, toast]);

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agreement Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Freelance Work Contract" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="agreementType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Agreement Type</FormLabel>
            <div className="flex gap-2">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {AGREEMENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                        {type}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <Button type="button" variant="outline" onClick={handleSuggestTerms} disabled={!form.watch('agreementType') || isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Suggest Terms
                </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Terms & Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the terms of the agreement..."
                className="min-h-[200px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
                This is the body of your agreement. Be as detailed as possible.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step2() {
  const form = useFormContext<FormValues>();
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="counterPartyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Counter-Party Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Jane Smith" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="counterPartyEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Counter-Party Email</FormLabel>
            <FormControl>
              <Input placeholder="e.g., jane.smith@example.com" {...field} />
            </FormControl>
             <FormDescription>
                They will receive an invitation to sign this agreement.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step3({ getValues }: { getValues: () => FormValues }) {
  const values = getValues();
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold font-headline">Review Your Agreement</h3>
        <div className="space-y-4 rounded-lg border p-4 mt-2">
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Title</p>
                <p className="font-semibold">{values.title}</p>
            </div>
             <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p className="font-semibold">{values.agreementType}</p>
            </div>
             <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Counter-Party</p>
                <p className="font-semibold">{values.counterPartyName} ({values.counterPartyEmail})</p>
            </div>
             <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Terms</p>
                <p className="text-sm whitespace-pre-wrap bg-secondary p-3 rounded-md">{values.description}</p>
            </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold font-headline">Share & Send</h3>
         <div className="mt-2">
            <AgreementShare />
         </div>
      </div>
    </div>
  );
}

function Step4() {
    return (
        <div className="text-center py-10">
            <PartyPopper className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold font-headline">Agreement Sent!</h2>
            <p className="mt-2 text-muted-foreground">Your agreement has been sent to the counter-party for their signature.</p>
            <div className="mt-6 flex justify-center gap-4">
                <Button asChild>
                    <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>Create Another</Button>
            </div>
        </div>
    );
}

const steps = [
  { id: 'Step 1', name: 'Details', icon: FileText, fields: ['title', 'agreementType', 'description'] },
  { id: 'Step 2', name: 'Parties', icon: Users, fields: ['counterPartyName', 'counterPartyEmail'] },
  { id: 'Step 3', name: 'Review & Send', icon: FileCheck2 },
  { id: 'Step 4', name: 'Complete', icon: PartyPopper }
];

export default function NewAgreementPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const methods = useForm<FormValues>({
    resolver: zodResolver(currentStep === 0 ? step1Schema : step2Schema),
    defaultValues: {
      title: '',
      agreementType: '',
      description: '',
      counterPartyName: '',
      counterPartyEmail: '',
    },
  });

  const { trigger, getValues } = methods;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as (keyof FormValues)[], { shouldFocus: true });
    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // Final "send" step
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
          setIsSubmitting(false);
          setCurrentStep(step => step + 1);
        }, 1500);
      } else {
        setCurrentStep(step => step + 1);
      }
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };
  
  const progress = ((currentStep + 1) / (steps.length -1)) * 100;
  
  if (currentStep === steps.length -1) {
    return (
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <Step4 />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 p-6 border-b">
          <CardTitle className="font-headline text-2xl">Create New Agreement</CardTitle>
          <div className="pt-4">
              <Progress value={progress} className="h-2"/>
              <div className="mt-2 grid grid-cols-3">
                  <span className="text-sm font-medium text-primary">{steps[currentStep].name}</span>
                  <span className="text-sm text-center text-muted-foreground">Step {currentStep + 1} of {steps.length - 1}</span>
                  <span className="text-sm text-right text-muted-foreground">{steps[currentStep + 1]?.name}</span>
              </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <FormProvider {...methods}>
            <form ref={formRef} onSubmit={e => e.preventDefault()}>
              {currentStep === 0 && <Step1 />}
              {currentStep === 1 && <Step2 />}
              {currentStep === 2 && <Step3 getValues={getValues} />}
            </form>
          </FormProvider>
        </CardContent>
        <div className="flex justify-between p-6 bg-muted/50 border-t">
          <Button onClick={prev} variant="outline" disabled={currentStep === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={next} disabled={isSubmitting}>
            {currentStep === steps.length - 2 ? (
              isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                'Send Agreement'
              )
            ) : (
              'Next'
            )}
            {currentStep < steps.length - 2 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
