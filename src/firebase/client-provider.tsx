'use client';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { firebaseConfig } from './config';

interface FirebaseContextValue {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebaseContextValue = useMemo(() => {
    if (!app) {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
    }
    return { app, auth, db };
  }, []);

  return <FirebaseProvider {...firebaseContextValue}>{children}</FirebaseProvider>;
}
