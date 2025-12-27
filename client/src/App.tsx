import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import CookieConsent from "react-cookie-consent";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const NotFound = lazy(() => import("@/pages/not-found"));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="w-10 h-10 text-primary animate-spin" />
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <div className="relative isolate min-h-screen">
            <LiquidBackground />
            <Router />
            <CookieConsent
              location="bottom"
              buttonText="Accept"
              declineButtonText="Decline"
              enableDeclineButton
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              buttonStyle={{
                background: "hsl(142 76% 36%)",
                color: "white",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                padding: "8px 16px",
              }}
              declineButtonStyle={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "rgba(255, 255, 255, 0.7)",
                borderRadius: "8px",
                fontSize: "14px",
                padding: "8px 16px",
              }}
              expires={150}
            >
              We use additional cookies to improve your experience. By clicking "Accept", you agree to our use of cookies as described in our{" "}
              <a
                href="/privacy"
                style={{ color: "hsl(142 76% 56%)", textDecoration: "underline" }}
              >
                Privacy Policy
              </a>
              .
            </CookieConsent>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
