import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Bot, Share2, Mic, Video } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary tracking-tighter">
            Digital Agreements, Ironclad Trust
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Oathentify is the simplest way to create, sign, and manage legally-binding digital agreements. Secure your commitments in minutes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary">How It Works</h2>
              <p className="mt-2 text-lg text-muted-foreground">Three simple steps to a binding agreement.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-primary">1. Create</h3>
                <p className="mt-2 text-muted-foreground">
                  Draft your agreement from scratch, use our templates, or let our AI assistant help you generate terms.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-primary">2. Sign</h3>
                <p className="mt-2 text-muted-foreground">
                  Invite parties to sign using text, voice, or video. All signatures are timestamped and securely recorded.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                  <Share2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-headline font-semibold text-primary">3. Share & Manage</h3>
                <p className="mt-2 text-muted-foreground">
                  Securely share via link and manage all your agreements from a centralized dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Features for Modern Agreements</h2>
              <p className="mt-2 text-lg text-muted-foreground">Built for speed, security, and simplicity.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Bot className="text-accent" /> AI-Powered Terms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Stuck on wording? Our AI suggests relevant clauses based on your agreement type, ensuring you're covered.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Mic className="text-accent" /> Multi-Modal Signatures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Go beyond text. Capture intent with voice and video signatures for a new level of authentication and non-repudiation.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Video className="text-accent" /> Tamper-Proof Audit Trail
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Every action is logged. Get a complete, court-ready evidence package with timestamps, IP addresses, and more.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center">
          <Logo />
          <p className="text-muted-foreground mt-4 sm:mt-0">&copy; {new Date().getFullYear()} Oathentify. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
