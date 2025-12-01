import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Mail, Phone } from "lucide-react";

export default function Contact() {
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

          <header className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have questions about QRCGenius? We're here to help.
            </p>
          </header>

          <div className="max-w-3xl">
            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We'd love to hear from you! Whether you have questions about using QRCGenius, 
                  feedback about features, or need support, please don't hesitate to reach out. 
                  As a free QR code generator, we're committed to providing the best experience 
                  for our users. Your inquiries, suggestions, and feedback help us continuously 
                  improve. Contact us directly using the information below, and we'll get back 
                  to you as soon as possible.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Email</h3>
                      <a 
                        href="mailto:sohamj@zohomail.in" 
                        className="text-lg text-primary hover:underline font-medium"
                        data-testid="link-email"
                      >
                        sohamj@zohomail.in
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                      <a 
                        href="tel:+919829927067" 
                        className="text-lg text-primary hover:underline font-medium"
                        data-testid="link-phone"
                      >
                        +91 9829927067
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Why We're Here
                </h3>
                <p className="text-muted-foreground">
                  QRCGenius was created to provide everyone with access to a free, reliable, 
                  and easy-to-use QR code generator. We believe quality tools should be 
                  accessible to all without barriers. If you have any questions, suggestions 
                  for improvements, or just want to say hello, we'd be happy to hear from you!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
