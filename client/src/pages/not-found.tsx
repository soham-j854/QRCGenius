import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md mx-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-2">404</h1>
              <p className="text-lg font-semibold text-foreground mb-2">Page Not Found</p>
              
              <p className="text-muted-foreground mb-6">
                Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
              </p>
              
              <Link href="/">
                <Button className="gap-2" data-testid="button-404-home">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
