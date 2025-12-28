import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";

import { ArrowDown, Sparkles } from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

interface HeroProps {
  onGetStarted?: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, "https://qrcgenius.app", {
        width: 120,
        margin: 2,
        color: {
          dark: "#22c55e",
          light: "#ffffff",
        },
      });
    }
  }, []);

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      const generator = document.getElementById("generator");
      generator?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/12 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary border border-primary/20 mb-2 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">100% Free Forever</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              Free QR Code{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Generator</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Create stunning QR codes in seconds. No sign-up, no limits. Perfect for URLs, WiFi networks, contact cards, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="gap-2 h-12 px-8 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                data-testid="button-get-started"
              >
                Get Started
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const howItWorks = document.getElementById("how-it-works");
                  howItWorks?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-12 px-8 text-base font-semibold rounded-lg"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 via-emerald-300/20 to-primary/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-emerald-200/10 rounded-3xl blur-2xl" />
              <GlassCard className="p-10 relative" hoverEffect={true}>
                <div className="text-center mb-6 space-y-1">
                  <p className="text-sm font-semibold text-foreground">Demo QR Code</p>
                  <p className="text-xs text-muted-foreground">Scan to visit QRCGenius</p>
                </div>
                <div className="bg-white rounded-xl p-4 inline-block w-full flex justify-center">
                  <canvas
                    ref={canvasRef}
                    className="rounded-lg"
                    data-testid="img-demo-qr"
                  />
                </div>
                <div className="mt-6 text-center">
                  <span className="text-xs text-muted-foreground font-medium">
                    Powered by QRCGenius
                  </span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
