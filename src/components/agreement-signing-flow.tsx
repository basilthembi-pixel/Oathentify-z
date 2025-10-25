'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Progress } from '@/components/ui/progress';
import {
  ChevronLeft,
  ChevronRight,
  FileSignature,
  Loader2,
  PartyPopper,
  UserCheck,
} from 'lucide-react';
import type { Agreement, Party } from '@/lib/types';
import Link from 'next/link';

const step1Schema = z.object({
  email: z.string().email('Please enter a valid email to confirm your identity.'),
});

const step3Schema = z.object({
  signature: z.string().min(2, 'Please type your full name to sign.'),
});

type FormValues = z.infer<typeof step1Schema> & z.infer<typeof step3Schema>;

function Step1({
  agreement,
  recipient,
}: {
  agreement: Agreement;
  recipient?: Party;
}) {
  const form = useFormContext<FormValues>();
  const creator = agreement.parties.find((p) => p.role === 'creator');

  return (
    <div className="text-center">
      <UserCheck className="mx-auto h-12 w-12 text-primary" />
      <h2 className="mt-4 text-2xl font-bold font-headline">
        You&apos;re Invited to Sign
      </h2>
      <p className="mt-2 text-muted-foreground">
        {creator?.name} has invited you to sign the agreement: <br />
        <span className="font-semibold text-foreground">{agreement.title}</span>
      </p>
      <div className="mt-6 text-left">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Your Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email to continue..."
                  {...field}
                  defaultValue={recipient?.email}
                />
              </FormControl>
              <FormDescription>
                We need to verify you are the intended recipient.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function Step2({ agreement }: { agreement: Agreement }) {
  const creator = agreement.parties.find((p) => p.role === 'creator');
  const recipient = agreement.parties.find((p) => p.role === 'counter-party');

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg font-headline">Review Agreement</h3>
      <div className="space-y-4 rounded-lg border p-4 max-h-96 overflow-y-auto">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Title</p>
          <p className="font-semibold">{agreement.title}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">From</p>
          <p className="font-semibold">
            {creator?.name} ({creator?.email})
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">To</p>
          <p className="font-semibold">
            {recipient?.name} ({recipient?.email})
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Terms</p>
          <p className="text-sm whitespace-pre-wrap bg-secondary p-3 rounded-md">
            {agreement.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Step3() {
    const form = useFormContext<FormValues>();

    return (
        <div>
             <h3 className="font-semibold text-lg font-headline">Provide Signature</h3>
             <p className="text-muted-foreground text-sm mb-4">Please type your full name in the box below to electronically sign this agreement. This is a legally binding signature.</p>
             <FormField
                control={form.control}
                name="signature"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Type your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
        </div>
    )
}

function Step4() {
  return (
    <div className="text-center py-10">
      <PartyPopper className="mx-auto h-16 w-16 text-green-500" />
      <h2 className="mt-4 text-2xl font-bold font-headline">
        Agreement Signed!
      </h2>
      <p className="mt-2 text-muted-foreground">
        Thank you! A confirmation has been sent to all parties.
      </p>
      <div className="mt-8 border-t pt-6">
        <h3 className="font-semibold text-foreground">Want to manage your agreements?</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">Create a free Oathentify account to store, track, and manage all your agreements in one place.</p>
        <Button asChild>
          <Link href="/signup">Create a Free Account</Link>
        </Button>
      </div>
    </div>
  );
}

const steps = [
  { id: 'Step 1', name: 'Verify', schema: step1Schema },
  { id: 'Step 2', name: 'Review' },
  { id: 'Step 3', name: 'Sign', schema: step3Schema },
  { id: 'Step 4', name: 'Complete' },
];

export function AgreementSigningFlow({
  agreement,
  recipient,
}: {
  agreement: Agreement;
  recipient?: Party;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(steps[currentStep].schema || z.object({})),
    defaultValues: {
      email: recipient?.email || '',
      signature: '',
    },
  });

  const { trigger } = methods;

  const next = async () => {
    const currentSchema = steps[currentStep].schema;
    if (currentSchema) {
      const output = await trigger(Object.keys(currentSchema.shape) as (keyof FormValues)[], { shouldFocus: true });
      if (!output) return;
    }

    if (currentStep < steps.length - 1) {
       if (currentStep === steps.length - 2) {
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setCurrentStep(step => step + 1);
        }, 1500);
      } else {
        setCurrentStep((step) => step + 1);
      }
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  
  if (currentStep === steps.length -1) {
      return (
        <Card className="overflow-hidden">
            <CardContent className="p-8">
                <Step4 />
            </CardContent>
        </Card>
      )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 p-6 border-b">
        <div className="pt-4">
          <Progress value={progress} className="h-2" />
          <div className="mt-2 grid grid-cols-3">
            <span className="text-sm font-medium text-primary">
              {steps[currentStep].name}
            </span>
            <span className="text-sm text-center text-muted-foreground">
              Step {currentStep + 1} of {steps.length - 1}
            </span>
            <span className="text-sm text-right text-muted-foreground">
              {steps[currentStep + 1]?.name}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 min-h-[350px] flex flex-col justify-center">
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 0 && <Step1 agreement={agreement} recipient={recipient} />}
            {currentStep === 1 && <Step2 agreement={agreement} />}
            {currentStep === 2 && <Step3 />}
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="flex justify-between p-6 bg-muted/50 border-t">
        <Button onClick={prev} variant="outline" disabled={currentStep === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={next} disabled={isSubmitting}>
          {currentStep === steps.length - 2 ? (
            isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing...
              </>
            ) : (
                <>
                    <FileSignature className="mr-2 h-4 w-4" />
                    Sign & Complete
                </>
            )
          ) : (
            'Next'
          )}
          {currentStep < steps.length - 2 && (
            <ChevronRight className="ml-2 h-4 w-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
