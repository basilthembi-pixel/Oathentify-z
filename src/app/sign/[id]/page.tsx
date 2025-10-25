'use client';

import { useParams, notFound } from 'next/navigation';
import { DUMMY_AGREEMENTS } from '@/lib/data';
import { AgreementSigningFlow } from '@/components/agreement-signing-flow';
import { Logo } from '@/components/logo';

export default function SigningPage() {
  const params = useParams();
  const { id } = params;

  const agreement = DUMMY_AGREEMENTS.find((a) => a.id === id);

  if (!agreement) {
    notFound();
  }
  
  const recipient = agreement.parties.find(p => p.role === 'counter-party');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-2xl">
         <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <AgreementSigningFlow agreement={agreement} recipient={recipient} />
      </div>
    </div>
  );
}
