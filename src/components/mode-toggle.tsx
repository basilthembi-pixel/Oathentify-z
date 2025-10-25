'use client';

import { Building2, Heart } from 'lucide-react';
import { useMode } from '@/context/mode-provider';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div className="flex items-center gap-2">
      <div className="bg-secondary rounded-lg p-1 flex">
        <button
          onClick={() => setMode('corporate')}
          className={cn(
            'px-3 py-1 rounded-md text-sm font-medium transition flex items-center gap-2',
            mode === 'corporate'
              ? 'bg-background shadow text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Building2 className="w-4 h-4" />
          Corporate
        </button>
        <button
          onClick={() => setMode('casual')}
          className={cn(
            'px-3 py-1 rounded-md text-sm font-medium transition flex items-center gap-2',
            mode === 'casual'
              ? 'bg-background shadow text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Heart className="w-4 h-4" />
          Casual
        </button>
        <button
          onClick={() => setMode('relationship')}
          className={cn(
            'px-3 py-1 rounded-md text-sm font-medium transition flex items-center gap-2',
            mode === 'relationship'
              ? 'bg-background shadow text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Heart className="w-4 h-4 text-pink-500" />
          Relationship
        </button>
      </div>
    </div>
  );
}
