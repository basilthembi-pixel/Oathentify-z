'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Mail, MessageSquare, QrCode, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.75 13.96c.25.13.41.2.52.34.11.14.15.33.11.53-.05.2-.18.38-.37.54-.19.16-.42.28-.7.38-1.03.39-2.2.1-3.26-.28-1.06-.38-2.1-1.03-3-1.84s-1.46-1.94-1.84-3c-.38-1.06-.67-2.23-.28-3.26.1-.28.22-.51.38-.7.16-.19.34-.32.54-.37.2-.04.4.01.53.11.14.11.19.27.34.52l.14.24c.12.2.2.38.22.56.02.18-.03.38-.11.58l-.2.43c-.09.18-.07.36.04.51.11.15.28.31.5.51s.41.35.61.5.34.28.51.5c.15.11.33.13.51.04l.43-.2c.2-.08.4-.13.58-.11.18.02.36.1.56.22l.24.14c.25.15.41.2.52.34.11.14.15.33.11.53-.05.2-.18.38-.37.54-.19.16-.42.28-.7.38-1.03.39-2.2.1-3.26-.28C9.25 15.22 6.75 12.72 6.04 10c-.39-1.06-.1-2.23.28-3.26.28-.76.92-1.39 1.68-1.68C8.75 4.78 10 5 10.72 6.04c.72 1.04 1.22 3.54.28 4.26-.94.72-2.19.43-3.26-.28a.5.5 0 0 0-.68.68c1.39 2.5 3.89 5 6.39 6.39a.5.5 0 0 0 .68-.68c-.71-1.07-.99-2.32-.28-3.26s3.22-1.22 4.26-.28Z" />
    </svg>
  );

export function AgreementShare() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const agreementLink = 'https://oathentify.com/agreements/ag-12345-xyz';

  const handleCopy = () => {
    navigator.clipboard.writeText(agreementLink).then(() => {
      setCopied(true);
      toast({
        title: 'Copied to clipboard!',
        description: 'You can now share the agreement link.',
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Share Agreement</CardTitle>
        <CardDescription>
          Choose a method to share this agreement for signing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="whatsapp">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="whatsapp"><WhatsAppIcon className="h-5 w-5"/></TabsTrigger>
            <TabsTrigger value="email"><Mail className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="sms"><MessageSquare className="h-5 w-5" /></TabsTrigger>
            <TabsTrigger value="qr"><QrCode className="h-5 w-5" /></TabsTrigger>
          </TabsList>
          <TabsContent value="whatsapp" className="space-y-4 pt-4">
            <h3 className="font-semibold text-center">Send via WhatsApp</h3>
            <div className="space-y-2">
              <Label htmlFor="whatsapp-phone">Recipient&apos;s Phone</Label>
              <Input id="whatsapp-phone" placeholder="+1 (555) 123-4567" />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <WhatsAppIcon className="w-4 h-4 mr-2" /> Send via WhatsApp
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              A message will be sent from our official business number.
            </p>
          </TabsContent>
          <TabsContent value="email">
            {/* Email sharing content will go here */}
             <div className="text-center text-muted-foreground py-8">
                Email sharing coming soon.
            </div>
          </TabsContent>
          <TabsContent value="sms">
            {/* SMS sharing content will go here */}
            <div className="text-center text-muted-foreground py-8">
                SMS sharing coming soon.
            </div>
          </TabsContent>
          <TabsContent value="qr">
             <div className="flex flex-col items-center space-y-4 pt-4">
                <div className="p-4 bg-white rounded-lg border">
                    {/* Placeholder for QR code image */}
                    <QrCode className="w-40 h-40" />
                </div>
                <p className="text-sm text-muted-foreground">Scan this code to sign on a mobile device.</p>
             </div>
          </TabsContent>
        </Tabs>
        <div className="mt-6 space-y-2">
            <Label htmlFor="share-link">Or copy the secure link</Label>
            <div className="flex space-x-2">
              <Input id="share-link" value={agreementLink} readOnly />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
