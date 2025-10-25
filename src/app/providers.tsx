'use client';

import { FirebaseClientProvider } from '@/firebase';
import { ModeProvider } from '@/context/mode-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseClientProvider>
      <ModeProvider>
        {children}
      </ModeProvider>
    </FirebaseClientProvider>
  );
}
