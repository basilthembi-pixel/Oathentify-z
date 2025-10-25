'use client';

import { useState, useMemo, useTransition, useRef, useEffect } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
  Download,
  FileCheck,
  FileSignature,
  FileText,
  Info,
  Link2Off,
  Loader2,
  Mail,
  Mic,
  PartyPopper,
  Pen,
  UserCheck,
  Video,
  ShieldCheck,
  Clock,
  Home,
  Waves,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import type { Agreement, Party } from '@/lib/types';
import Link from 'next/link';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge as UiBadge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useToast } from '@/hooks/use-toast';

const step1Schema = z.object({
  email: z
    .string()
    .email('Please enter a valid email to confirm your identity.'),
});

const step3Schema = z.object({
  signatureMethod: z.enum(['text', 'voice', 'video'], {
    required_error: 'Please select a signature method.',
  }),
});

const textSignatureSchema = z.object({
  signature: z.string().min(2, 'Please type your full name to sign.'),
  agreedToTerms: z.literal<boolean>(true, {
    errorMap: () => ({ message: 'You must agree to the terms to sign.' }),
  }),
});

type FormValues = z.infer<typeof step1Schema> &
  z.infer<typeof step3Schema> &
  z.infer<typeof textSignatureSchema>;

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function AgreementInfoSummary({ agreement }: { agreement: Agreement }) {
  const creator = agreement.parties.find((p) => p.role === 'creator');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-headline">
          Agreement Details
        </CardTitle>
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
          <UiBadge
            variant="outline"
            className="bg-yellow-100 text-yellow-800"
          >
            ⏳ Awaiting Your Signature
          </UiBadge>
        </div>
      </CardContent>
    </Card>
  );
}

function Step1({ agreement }: { agreement: Agreement }) {
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
            <span className="font-semibold text-foreground">
              {agreement.title}
            </span>
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
                  <Input placeholder="Enter your email to continue..." {...field} />
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

const signatureMethods = [
  {
    name: 'text',
    title: 'Type Your Signature',
    description: 'Quick and simple',
    icon: Pen,
    badge: 'FREE',
  },
  {
    name: 'voice',
    title: 'Voice Signature',
    description: 'Record a verbal agreement',
    icon: Mic,
    badge: 'FREE',
  },
  {
    name: 'video',
    title: 'Video Signature',
    description: 'Record a video confirmation',
    icon: Video,
    badge: 'PREMIUM',
  },
];

function Step3() {
  const form = useFormContext<FormValues>();
  const selectedMethod = form.watch('signatureMethod');

  return (
    <div>
      <h3 className="font-semibold text-lg font-headline">
        Choose How to Sign
      </h3>
      <p className="text-muted-foreground text-sm mb-4">
        Select your preferred signing method from the options below.
      </p>
      <FormField
        control={form.control}
        name="signatureMethod"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormControl>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {signatureMethods.map((method) => (
                  <div
                    key={method.name}
                    onClick={() => field.onChange(method.name)}
                    className={cn(
                      'border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:-translate-y-1',
                      selectedMethod === method.name
                        ? 'border-primary ring-2 ring-primary/50'
                        : 'border-border'
                    )}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <method.icon className="h-8 w-8 text-primary" />
                      <UiBadge
                        variant={method.badge === 'FREE' ? 'secondary' : 'default'}
                      >
                        {method.badge}
                      </UiBadge>
                    </div>
                    <h4 className="font-semibold">{method.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage className="text-center" />
          </FormItem>
        )}
      />
    </div>
  );
}

function TextSignatureStep() {
  const form = useFormContext<FormValues>();
  const signatureName = form.watch('signature');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg font-headline">
          Type Your Signature
        </h3>
        <p className="text-muted-foreground text-sm">
          Please type your full name in the box below to electronically sign
          this agreement. This is a legally binding signature.
        </p>
      </div>
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
      <FormField
        control={form.control}
        name="agreedToTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I,{' '}
                <span className="font-bold">
                  {signatureName || '[Your Name]'}
                </span>
                , agree to all terms in this agreement.
              </FormLabel>
              <FormDescription>
                By signing, you acknowledge this is legally binding under the
                ESIGN Act.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>
          Your IP address and approximate location will be securely recorded as
          part of the signature.
        </AlertDescription>
      </Alert>
    </div>
  );
}

function VoiceSignatureStep() {
  const { toast } = useToast();
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const getMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasMicPermission(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setHasMicPermission(false);
        toast({
          variant: 'destructive',
          title: 'Microphone Access Denied',
          description: 'Please enable microphone permissions in your browser settings.',
        });
      }
    };
    getMicPermission();
  }, [toast]);

  const handleStartRecording = async () => {
    if (!hasMicPermission) return;
    setAudioUrl(null);
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };
    mediaRecorderRef.current.start();
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => setIsPlaying(false);
      audioRef.current.addEventListener('ended', handleEnded);
      return () => {
        if(audioRef.current) {
            audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [audioUrl]);
  
  if (!hasMicPermission) {
    return (
        <Alert variant="destructive">
            <Mic className="h-4 w-4" />
            <AlertTitle>Microphone Access Required</AlertTitle>
            <AlertDescription>
            Please allow microphone access in your browser to use this feature. You may need to refresh the page after granting permission.
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="space-y-4">
        <div>
            <h3 className="font-semibold text-lg font-headline">Record Voice Signature</h3>
            <p className="text-muted-foreground text-sm">Record yourself stating your agreement.</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 bg-secondary/50 min-h-[200px]">
            {audioUrl ? (
                <div className="flex w-full items-center justify-center gap-4">
                    <Button onClick={handleTogglePlay} size="icon" variant="outline" className="rounded-full h-14 w-14">
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <audio ref={audioRef} src={audioUrl} />
                    <Button onClick={() => setAudioUrl(null)} size="icon" variant="outline" className="rounded-full h-14 w-14">
                        <RotateCcw className="h-6 w-6 text-destructive" />
                    </Button>
                </div>
            ) : (
                <>
                    <Button 
                        onClick={isRecording ? handleStopRecording : handleStartRecording} 
                        size="icon" 
                        className={cn("rounded-full h-20 w-20 transition-all", isRecording && "bg-red-500 hover:bg-red-600 animate-pulse")}
                    >
                        <Mic className="h-8 w-8" />
                    </Button>
                    <p className="text-sm text-muted-foreground">{isRecording ? "Recording... Click to stop." : "Click to start recording"}</p>
                </>
            )}
             <Waves className="w-full h-10 text-primary/20" />
        </div>
    </div>
  );
}

function VideoSignatureStep() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);

  return (
    <div className="space-y-4">
       <div>
        <h3 className="font-semibold text-lg font-headline">
          Record Video Signature
        </h3>
        <p className="text-muted-foreground text-sm">
          Record a short video of yourself stating your agreement.
        </p>
      </div>
      <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden">
        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
        {!hasCameraPermission && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                 <Video className="h-12 w-12 text-white/50" />
                 <p className="mt-2 text-center">Camera access is required for video signatures.</p>
             </div>
        )}
      </div>
      
      {!hasCameraPermission && (
          <Alert variant="destructive">
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access in your browser settings to use this feature. You may need to refresh the page after granting permission.
              </AlertDescription>
          </Alert>
      )}

      <div className="flex justify-center">
        <Button size="lg" disabled={!hasCameraPermission} className="rounded-full h-16 w-16 p-0">
          <div className="h-8 w-8 rounded-full bg-red-500 border-2 border-white"></div>
        </Button>
      </div>
    </div>
  );
}

function Step5({ agreement }: { agreement: Agreement }) {
  const handleDownload = () => {
    const creator = agreement.parties.find(p => p.role === 'creator');
    const recipient = agreement.parties.find(p => p.role === 'counter-party');

    const content = `
AGREEMENT
-------------------------
Title: ${agreement.title}
ID: ${agreement.id}
Type: ${agreement.type}
Status: ${agreement.status}
Created At: ${formatDate(agreement.createdAt)}

Parties Involved
-------------------------
Creator:
- Name: ${creator?.name}
- Email: ${creator?.email}
- Status: ${creator?.status}

Counter-Party:
- Name: ${recipient?.name}
- Email: ${recipient?.email}
- Status: Signed

Agreement Terms
-------------------------
${agreement.description}

-------------------------
Signed on: ${new Date().toLocaleString()}
This is a legally binding document.
    `;

    const blob = new Blob([content.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${agreement.title.replace(/\s/g, '_')}_signed.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <PartyPopper className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-2xl font-bold font-headline">
          Agreement Signed!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Your signature for{' '}
          <span className="font-semibold text-foreground">
            {agreement.title}
          </span>{' '}
          has been recorded.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <h4 className="font-semibold">Notification Sent</h4>
              <p className="text-sm text-muted-foreground">
                {agreement.parties.find((p) => p.role === 'creator')?.name} has
                been notified. You will receive a final copy via email once all
                parties have signed.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FileCheck className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <h4 className="font-semibold">Agreement Status</h4>
              <p className="text-sm text-muted-foreground">
                The agreement is now legally binding on your part. It will be
                fully executed once all parties have signed.
              </p>
              <UiBadge className="mt-2" variant="secondary">
                Partially Signed
              </UiBadge>
            </div>
          </div>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download a Copy
          </Button>
           <Button variant="outline" className="w-full" asChild>
            <Link href={`/agreements/${agreement.id}`}>
              <FileText className="mr-2 h-4 w-4" />
              View Full Agreement
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Manage Your Agreements</CardTitle>
          <CardDescription>
            Create a free account to store, track, and manage all your signed
            documents in one secure place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link href="/signup">Create a Free Account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function AlreadySigned({ agreement }: { agreement: Agreement }) {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="text-center p-6 md:p-8">
        <div className="mx-auto bg-green-100 text-green-600 h-16 w-16 flex items-center justify-center rounded-full">
            <ShieldCheck className="h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-headline mt-4">Agreement Already Signed</CardTitle>
        <CardDescription>
          You have already signed this agreement. No further action is required from you.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 md:px-8">
        <div className="border rounded-lg p-4 text-sm space-y-3">
             <div className="flex justify-between">
                <span className="text-muted-foreground">Agreement:</span>
                <span className="font-semibold">{agreement.title}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <UiBadge variant="outline" className="bg-green-100 text-green-800">Signed</UiBadge>
            </div>
             <div className="flex justify-between">
                <span className="text-muted-foreground">Signed On:</span>
                <span className="font-semibold">{formatDate(agreement.updatedAt)}</span>
            </div>
        </div>
      </CardContent>
       <CardFooter className="bg-muted/50 p-4 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full" asChild>
                <Link href={`/agreements/${agreement.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    View Full Agreement
                </Link>
            </Button>
      </CardFooter>
    </Card>
  )
}

export function InvalidLinkError() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <Card className="w-full max-w-md p-8">
            <div className="mx-auto bg-red-100 text-red-600 h-16 w-16 flex items-center justify-center rounded-full">
                <Link2Off className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold font-headline">Invalid or Expired Link</h2>
            <p className="mt-2 text-muted-foreground">
                This signing link may have expired, been used already, or is incorrect. Please contact the sender to get a new link.
            </p>
            <div className="mt-6">
                <Button asChild>
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Go to Homepage
                    </Link>
                </Button>
            </div>
        </Card>
    </div>
  );
}

export function ExpiredAgreement({ agreement }: { agreement: Agreement }) {
  const creator = agreement.parties.find(p => p.role === 'creator');
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <Card className="w-full max-w-md p-8">
            <div className="mx-auto bg-yellow-100 text-yellow-600 h-16 w-16 flex items-center justify-center rounded-full">
                <Clock className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold font-headline">Agreement Expired</h2>
            <p className="mt-2 text-muted-foreground">
                This agreement, "{agreement.title}", has expired and can no longer be signed.
            </p>
             <div className="mt-6">
                <Button asChild variant="secondary">
                    <a href={`mailto:${creator?.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contact {creator?.name}
                    </a>
                </Button>
            </div>
        </Card>
    </div>
  );
}


const steps = [
  { id: 'Step 1', name: 'Verify', schema: step1Schema, icon: UserCheck },
  { id: 'Step 2', name: 'Review', icon: FileText },
  { id: 'Step 3', name: 'Method', schema: step3Schema, icon: FileSignature },
  { id: 'Step 4', name: 'Sign', schema: textSignatureSchema, icon: Pen },
  { id: 'Step 5', name: 'Complete', icon: PartyPopper },
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
      signatureMethod: 'text',
      signature: '',
      agreedToTerms: false,
    },
    mode: 'onChange',
  });

  const { trigger, watch } = methods;
  const signatureMethod = watch('signatureMethod');

  const next = async () => {
    let currentSchema = steps[currentStep].schema;
    
    // In the signing step, the schema depends on the chosen method
    if (currentStep === 3) {
      if (signatureMethod === 'text') {
        currentSchema = textSignatureSchema;
      } else {
        // For now, other methods don't have validation
        currentSchema = undefined;
      }
    }

    if (currentSchema) {
      const fieldsToValidate = Object.keys(
        currentSchema.shape
      ) as (keyof FormValues)[];
      if (fieldsToValidate.length > 0) {
        const output = await trigger(fieldsToValidate, { shouldFocus: true });
        if (!output) return;
      }
    }

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        // If the current step is the signing step, simulate submission
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          setCurrentStep((step) => step + 1);
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

  const progress = useMemo(
    () => ((currentStep + 1) / steps.length) * 100,
    [currentStep]
  );
  
  const currentStepIcon = useMemo(() => {
    if(currentStep === 3) { // Sign step
      return signatureMethods.find(m => m.name === signatureMethod)?.icon || Pen;
    }
    return steps[currentStep].icon;
  }, [currentStep, signatureMethod]);

  if (currentStep === steps.length - 1) {
    return (
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-6 md:p-8">
          <Step5 agreement={agreement} />
        </CardContent>
      </Card>
    );
  }

  const renderSignatureStep = () => {
    switch (signatureMethod) {
      case 'text':
        return <TextSignatureStep />;
      case 'voice':
        return <VoiceSignatureStep />;
      case 'video':
        return <VideoSignatureStep />;
      default:
        return null;
    }
  };

  const isVoiceOrVideoStep = currentStep === 3 && (signatureMethod === 'voice' || signatureMethod === 'video');

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <div>
        <Progress value={progress} className="h-1" />
        <div className="mt-2 grid grid-cols-5 text-xs sm:text-sm">
          {steps.map((step, index) => {
             const Icon = index === 3 ? (signatureMethods.find(m => m.name === signatureMethod)?.icon || Pen) : step.icon;
            return (
                <div
                key={step.id}
                className={cn(
                    'flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 text-center',
                    index === currentStep
                    ? 'font-semibold text-primary'
                    : 'text-muted-foreground'
                )}
                >
                <Icon className="h-4 w-4" />
                <span>{step.name}</span>
                </div>
            )
          })}
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {currentStep === 0 && <Step1 agreement={agreement} />}
          {currentStep === 1 && (
            <Card>
              <CardContent className="p-6">
                <Step2 agreement={agreement} />
              </CardContent>
            </Card>
          )}
          {currentStep === 2 && (
            <Card>
              <CardContent className="p-6">
                <Step3 />
              </CardContent>
            </Card>
          )}
          {currentStep === 3 && (
            <Card>
              <CardContent className="p-6">{renderSignatureStep()}</CardContent>
            </Card>
          )}
        </form>
      </FormProvider>

      <div className="fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-sm p-4 border-t md:static md:bg-transparent md:p-0 md:border-none">
        <div className="flex justify-between w-full max-w-2xl mx-auto">
          <Button onClick={prev} variant="outline" disabled={currentStep === 0}>
            <ChevronLeft /> Back
          </Button>
          <Button
            onClick={next}
            disabled={isSubmitting || isVoiceOrVideoStep}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
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
                {currentStep === 0 ? 'Verify & Continue' : 'Next'}
                <ChevronRight className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
