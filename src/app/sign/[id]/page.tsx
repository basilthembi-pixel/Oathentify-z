'use client';

import { useParams, notFound } from 'next/navigation';
import { DUMMY_AGREEMENTS } from '@/lib/data';
import { AgreementSigningFlow } from '@/components/agreement-signing-flow';
import { Logo } from '@/components/logo';
import { ShieldCheck } from 'lucide-react';

export default function SigningPage() {
  const params = useParams();
  const { id } = params;

  const agreement = DUMMY_AGREEMENTS.find((a) => a.id === id);

  if (!agreement) {
    notFound();
  }
  
  const recipient = agreement.parties.find(p => p.role === 'counter-party');

  return (
    <div className="flex min-h-screen flex-col items-center bg-secondary p-4">
        <header className="w-full max-w-4xl mx-auto py-6">
             <div className="flex justify-between items-center">
                <Logo />
                 <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span>End-to-end encrypted</span>
                    </div>
                 </div>
            </div>
        </header>
      <main className="w-full max-w-2xl flex-grow">
        <AgreementSigningFlow agreement={agreement} recipient={recipient} />
      </main>
      <footer className="w-full max-w-4xl mx-auto py-4 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Oathentify. All rights reserved.</p>
      </footer>
    </div>
  );
}
