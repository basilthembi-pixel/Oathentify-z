import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-colors group-hover:bg-accent">
        <ShieldCheck className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline text-primary group-hover:text-accent transition-colors">
        Oathentify
      </span>
    </Link>
  );
}
