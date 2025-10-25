'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { DUMMY_AGREEMENTS } from '@/lib/data';
import type { Agreement, Party } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  FileSignature,
  Calendar,
  ChevronLeft,
  Link as LinkIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const statusStyles: { [key: string]: string } = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
  executed: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  partial: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  expired: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
  disputed: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
  draft: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700',
};

const PartyStatusIcon = ({ status }: { status: Party['status'] }) => {
  if (status === 'signed') {
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
  return <AlertCircle className="h-5 w-5 text-yellow-500" />;
};

export default function AgreementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const agreement = DUMMY_AGREEMENTS.find(
    (a) => a.id === id
  );

  if (!agreement) {
    notFound();
  }
  
  const formatDate = (dateStr: string) => {
      return new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
      });
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="mb-6 flex justify-between items-center">
             <Button variant="outline" onClick={() => router.back()} className="gap-2">
                <ChevronLeft />
                Back to Dashboard
            </Button>
            <Button variant="outline" asChild>
                <Link href={`/sign/${agreement.id}`} target="_blank">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    View Signing Page
                </Link>
            </Button>
        </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <CardTitle className="font-headline text-2xl mb-2">{agreement.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> {agreement.type} Agreement
                    </div>
                     <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Created on {formatDate(agreement.createdAt)}
                    </div>
                     <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Last updated {formatDate(agreement.updatedAt)}
                    </div>
                </div>
              </div>
            <Badge variant="outline" className={`${statusStyles[agreement.status]} capitalize text-base px-4 py-2`}>
              {agreement.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <section>
                    <h3 className="font-semibold text-lg font-headline mb-2 flex items-center gap-2"><FileSignature className="h-5 w-5 text-primary"/> Agreement Terms</h3>
                    <div className="p-4 border rounded-lg bg-secondary/50">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{agreement.description}</p>
                    </div>
                </section>
            </div>
            <div className="space-y-6">
                <section>
                    <h3 className="font-semibold text-lg font-headline mb-2 flex items-center gap-2"><Users className="h-5 w-5 text-primary"/> Parties Involved</h3>
                    <div className="space-y-4">
                        {agreement.parties.map(party => (
                            <div key={party.uid} className="flex items-center justify-between p-3 border rounded-lg bg-secondary/50">
                                <div>
                                    <p className="font-semibold">{party.name}</p>
                                    <p className="text-sm text-muted-foreground">{party.email}</p>
                                    <p className="text-xs capitalize text-muted-foreground mt-1">({party.role.replace('-', ' ')})</p>
                                </div>
                               <div className="flex flex-col items-center gap-1">
                                    <PartyStatusIcon status={party.status} />
                                    <span className="text-xs capitalize">{party.status}</span>
                               </div>
                            </div>
                        ))}
                    </div>
                </section>
                {agreement.status === 'pending' && (
                     <Button className="w-full" asChild>
                        <Link href={`/sign/${agreement.id}`}>Sign Agreement</Link>
                    </Button>
                )}
            </div>
        </CardContent>
         <CardFooter className="bg-muted/50 p-4 border-t text-center">
            <p className="text-xs text-muted-foreground w-full">Agreement ID: {agreement.id}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
