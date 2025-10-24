'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Clock,
  Users,
  PlusCircle,
  Filter,
} from 'lucide-react';
import { DUMMY_AGREEMENTS } from '@/lib/data';
import type { Agreement } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusStyles: { [key: string]: string } = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
  executed: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  partial: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  expired: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
  disputed: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
  draft: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700',
};

const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
};

const AgreementCard = ({ agreement }: { agreement: Agreement }) => {
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    setUpdatedAt(timeAgo(agreement.updatedAt));
  }, [agreement.updatedAt]);


  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-lg mb-2">{agreement.title}</CardTitle>
            <Badge variant="outline" className={`${statusStyles[agreement.status]} capitalize`}>{agreement.status}</Badge>
        </div>
        <CardDescription className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4" /> {agreement.type} Agreement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{agreement.parties.map(p => p.name).join(' & ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {updatedAt ? (
                <span>Last updated: {updatedAt}</span>
            ) : (
                <span>Loading...</span>
            )}
          </div>
          <Button className="w-full mt-2" variant="outline">View Agreement</Button>
        </div>
      </CardContent>
    </Card>
  );
};


export default function DashboardPage() {
    const [filters, setFilters] = useState<Record<string, boolean>>({
        pending: true,
        executed: true,
        partial: true,
        expired: true,
        disputed: true,
        draft: true,
    });
    
    const toggleFilter = (status: string) => {
        setFilters(prev => ({ ...prev, [status]: !prev[status] }));
    };

    const filteredAgreements = DUMMY_AGREEMENTS.filter(
        agreement => filters[agreement.status]
    );

    const filterStatuses = Object.keys(statusStyles);

    return (
        <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-bold font-headline text-foreground">Your Agreements</h2>
                <p className="text-muted-foreground">Manage all your digital commitments in one place.</p>
            </div>
            <div className="flex items-center gap-2">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {filterStatuses.map(status => (
                             <DropdownMenuCheckboxItem
                                key={status}
                                checked={filters[status]}
                                onCheckedChange={() => toggleFilter(status)}
                                className="capitalize"
                             >
                                {status}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button asChild className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/new">
                        <PlusCircle className="h-4 w-4" />
                        New Agreement
                    </Link>
                </Button>
            </div>
        </div>

        {filteredAgreements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgreements.map((agreement) => (
                <AgreementCard key={agreement.id} agreement={agreement} />
            ))}
            </div>
        ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No agreements found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    Your filtered agreements will appear here.
                </p>
                <Button className="mt-6" asChild>
                    <Link href="/new">Create New Agreement</Link>
                </Button>
            </div>
        )}
        </div>
    );
}
