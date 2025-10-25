'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DUMMY_TEMPLATES = [
    {
        id: 'tmpl-1',
        title: 'Standard Non-Disclosure Agreement',
        description: 'A general-purpose NDA for protecting confidential information.',
        category: 'Legal',
    },
    {
        id: 'tmpl-2',
        title: 'Freelance Service Agreement',
        description: 'A contract for hiring freelancers for specific projects.',
        category: 'Services',
    },
    {
        id: 'tmpl-3',
        title: 'Simple Loan Agreement',
        description: 'A basic agreement for personal loans between two parties.',
        category: 'Financial',
    },
];

export default function TemplatesPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold font-headline text-foreground">Agreement Templates</h2>
          <p className="text-muted-foreground">
            Create and manage reusable templates for your common agreements.
          </p>
        </div>
        <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="mb-8">
          <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-10"/>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_TEMPLATES.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-start gap-3">
                <FileText className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <span>{template.title}</span>
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">{template.category}</span>
                    <Button variant="outline">Use Template</Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
