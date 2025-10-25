'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Mode = 'corporate' | 'personal';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('corporate');

  useEffect(() => {
    const storedMode = localStorage.getItem('oathentify_mode') as Mode | null;
    if (storedMode && (storedMode === 'corporate' || storedMode === 'personal')) {
      setMode(storedMode);
    }
  }, []);

  const handleSetMode = (newMode: Mode) => {
    setMode(newMode);
    localStorage.setItem('oathentify_mode', newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, setMode: handleSetMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
