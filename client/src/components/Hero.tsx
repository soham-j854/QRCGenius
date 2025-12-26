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
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">100% Free Forever</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Free QR Code Generator Online{" "}
              <span className="text-primary">- Create Instantly</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Generate custom QR codes for URLs, WiFi, vCards, text, email, and phone numbers.
              Free online QR code maker with no sign-up required. Download PNG or SVG instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="gap-2"
                data-testid="button-get-started"
              >
                Get Started
                <ArrowDown className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const howItWorks = document.getElementById("how-it-works");
                  howItWorks?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
              <GlassCard className="p-8">
                <div className="text-center mb-4">
                  <p className="text-sm text-white/70">Demo QR Code</p>
                  <p className="text-xs text-white/50 mt-1">Scan to visit QRCGenius</p>
                </div>
                <canvas
                  ref={canvasRef}
                  className="mx-auto rounded-lg mix-blend-screen opacity-90"
                  data-testid="img-demo-qr"
                />
                <div className="mt-4 text-center">
                  <span className="text-xs text-white/40">
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
