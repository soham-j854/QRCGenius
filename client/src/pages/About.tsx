import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, Zap, Heart, Globe, Lock } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="mb-6 gap-2" data-testid="link-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <article>
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-about-title">
                About QRGenius
              </h1>
              <p className="text-xl text-muted-foreground">
                The free, fast, and privacy-focused QR code generator trusted by millions worldwide.
              </p>
            </header>

            <section className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                QRGenius was created with a simple mission: to provide everyone with access to 
                high-quality QR code generation tools without any barriers. We believe that 
                creating QR codes should be free, fast, and accessible to all, whether you're 
                a small business owner, a marketing professional, or just someone who wants 
                to share information quickly.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Unlike other QR code generators that require sign-ups, subscriptions, or display 
                intrusive advertisements, QRGenius is committed to remaining 100% free forever. 
                We don't collect your data, we don't require registration, and we don't limit 
                how many QR codes you can create.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Why Choose QRGenius?</h2>
            </section>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Instant Generation</h3>
                      <p className="text-sm text-muted-foreground">
                        Create QR codes in milliseconds. No waiting, no processing delays. 
                        Your QR code is ready the moment you click generate.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Complete Privacy</h3>
                      <p className="text-sm text-muted-foreground">
                        All QR code generation happens in your browser. We never send your 
                        data to any server, ensuring your information stays private.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Forever Free</h3>
                      <p className="text-sm text-muted-foreground">
                        No subscriptions, no hidden fees, no premium tiers. Every feature 
                        is available to everyone at no cost, forever.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Universal Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Works on any device with a modern browser. No app downloads required, 
                        no compatibility issues. Just open and create.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <section className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">What You Can Create</h2>
              <p className="text-muted-foreground leading-relaxed">
                QRGenius supports a wide variety of QR code types to meet all your needs:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>URL QR Codes:</strong> Link directly to any website or web page</li>
                <li><strong>Text QR Codes:</strong> Share plain text messages or notes</li>
                <li><strong>WiFi QR Codes:</strong> Let guests connect to your network instantly</li>
                <li><strong>vCard QR Codes:</strong> Share contact information digitally</li>
                <li><strong>Email QR Codes:</strong> Pre-fill email addresses for quick contact</li>
                <li><strong>Phone QR Codes:</strong> Enable one-tap calling from any smartphone</li>
                <li><strong>Location QR Codes:</strong> Share GPS coordinates and map locations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Customization Options</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every QR code you create with QRGenius can be customized to match your brand 
                or preferences. Choose from multiple color presets, adjust the size from 100px 
                to 500px, select your preferred error correction level for better reliability, 
                and even add your own logo to the center of the QR code.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Download Formats</h2>
              <p className="text-muted-foreground leading-relaxed">
                Download your QR codes in PNG format for digital use on websites, emails, and 
                social media, or choose SVG format for high-quality printing at any size without 
                losing quality. Both formats are instantly available with a single click.
              </p>
            </section>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Ready to Create Your First QR Code?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Join millions of users who trust QRGenius for their QR code needs.
                </p>
                <Link href="/#generator">
                  <Button size="lg" data-testid="button-start-creating">
                    Start Creating - It's Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
