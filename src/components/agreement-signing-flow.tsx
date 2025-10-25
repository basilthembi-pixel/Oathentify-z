'use client';

import { useState, useMemo } from 'react';
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
  FileText,
  Loader2,
  PartyPopper,
  UserCheck,
  Calendar,
  ShieldCheck,
  Badge,
} from 'lucide-react';
import type { Agreement, Party } from '@/lib/types';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge as UiBadge } from './ui/badge';

const step1Schema = z.object({
  email: z.string().email('Please enter a valid email to confirm your identity.'),
});

const step3Schema = z.object({
  signature: z.string().min(2, 'Please type your full name to sign.'),
});

type FormValues = z.infer<typeof step1Schema> & z.infer<typeof step3Schema>;

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function AgreementInfoSummary({ agreement }: { agreement: Agreement }) {
    const creator = agreement.parties.find((p) => p.role === 'creator');
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-headline">Agreement Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created by</span>
                     <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarFallback>{creator?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{creator?.name}</span>
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created on</span>
                    <span className="font-medium">{formatDate(agreement.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Agreement type</span>
                    <UiBadge variant="secondary">{agreement.type}</UiBadge>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <UiBadge variant="outline" className="bg-yellow-100 text-yellow-800">⏳ Awaiting Your Signature</UiBadge>
                </div>
            </CardContent>
        </Card>
    )
}

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
    <div className="space-y-6">
        <Card className="text-center">
             <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary h-12 w-12 flex items-center justify-center rounded-full">
                    <UserCheck className="h-6 w-6" />
                </div>
                <CardTitle className="font-headline text-2xl pt-2">
                     You&apos;re Invited to Sign
                </CardTitle>
                <CardDescription>
                    {creator?.name} has invited you to sign the agreement: <br />
                    <span className="font-semibold text-foreground">{agreement.title}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className="text-left">
                    <FormLabel>Confirm Your Email to Continue</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Enter your email to continue..."
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
        </Card>
        
        <AgreementInfoSummary agreement={agreement} />
    </div>
  );
}

function Step2({ agreement }: { agreement: Agreement }) {
  const creator = agreement.parties.find((p) => p.role === 'creator');
  const recipient = agreement.parties.find((p) => p.role === 'counter-party');

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg font-headline">Review Agreement</h3>
      <div className="space-y-4 rounded-lg border p-4 max-h-96 overflow-y-auto bg-background">
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
  { id: 'Step 1', name: 'Verify', schema: step1Schema, icon: UserCheck },
  { id: 'Step 2', name: 'Review', icon: FileText },
  { id: 'Step 3', name: 'Sign', schema: step3Schema, icon: FileSignature },
  { id: 'Step 4', name: 'Complete', icon: PartyPopper },
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
  
  const progress = useMemo(() => ((currentStep + 1) / (steps.length)) * 100, [currentStep]);

  if (currentStep === steps.length -1) {
      return (
        <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-8">
                <Step4 />
            </CardContent>
        </Card>
      )
  }

  return (
    <div className="space-y-6">
        <div>
            <Progress value={progress} className="h-1" />
            <div className="mt-2 grid grid-cols-4 text-xs sm:text-sm">
                {steps.map((step, index) => (
                    <div key={step.id} className={`flex items-center justify-center gap-2 py-2 px-1 text-center ${index === currentStep ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                        <step.icon className="h-4 w-4 hidden sm:block" />
                        <span>{step.name}</span>
                    </div>
                ))}
            </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {currentStep === 0 && <Step1 agreement={agreement} recipient={recipient} />}
            {currentStep === 1 && 
                <Card><CardContent className="p-6"><Step2 agreement={agreement} /></CardContent></Card>
            }
            {currentStep === 2 && 
                 <Card><CardContent className="p-6"><Step3 /></CardContent></Card>
            }
          </form>
        </FormProvider>
        
        <div className="flex justify-between pt-4">
            <Button onClick={prev} variant="outline" disabled={currentStep === 0}>
                <ChevronLeft /> Back
            </Button>
            <Button onClick={next} disabled={isSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {currentStep === steps.length - 2 ? (
                isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing...
                </>
                ) : (
                    <>
                        Sign & Complete <FileSignature className="ml-2" />
                    </>
                )
            ) : (
                <>
                 {currentStep === 0 ? "Verify & Continue" : "Next"}
                 <ChevronRight className="ml-2" />
                </>
            )}
            </Button>
        </div>
    </div>
  );
}
