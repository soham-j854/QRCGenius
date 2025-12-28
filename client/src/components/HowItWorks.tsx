import { CardContent } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/GlassCard";
import { Edit3, Settings, Download, Smartphone } from "lucide-react";

const steps = [
  {
    icon: Edit3,
    title: "Enter Your Content",
    description:
      "Paste any URL, text, WiFi credentials, vCard, or other data you want to encode.",
  },
  {
    icon: Settings,
    title: "Customize Design",
    description:
      "Choose colors, size, error correction level, and optionally add your logo.",
  },
  {
    icon: Download,
    title: "Generate & Download",
    description:
      "Click generate and download your QR code in PNG or SVG format instantly.",
  },
  {
    icon: Smartphone,
    title: "Scan & Share",
    description:
      "Test with any QR scanner and share your code anywhere—print or digital.",
  },
];

const useCases = [
  { title: "Websites", example: "Link to your portfolio or business page" },
  { title: "WiFi Access", example: "Share network credentials without typing" },
  { title: "Contact Cards", example: "vCard for easy contact saving" },
  { title: "Events", example: "Calendar events and ticket links" },
  { title: "Payments", example: "Payment links and donation pages" },
  { title: "Social Media", example: "Instagram, LinkedIn, Twitter profiles" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            How to Create a QR Code for Free
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Generate professional QR codes in four simple steps. Our free online QR code generator
            requires no account, has no limits, and is completely free to use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <GlassCard key={step.title} className="relative overflow-visible" hoverEffect={false}>
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <CardContent className="pt-8 pb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </GlassCard>
          ))}
        </div>

        <div className="text-center mb-12 space-y-3 mt-20">
          <h3 className="text-3xl font-bold text-foreground">
            Popular Use Cases
          </h3>
          <p className="text-muted-foreground text-lg">
            QR codes can be used for almost anything
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="flex items-start gap-3 p-4 rounded-lg bg-glass-surface border border-glass-border hover:bg-white/5 transition-colors"
              data-testid={`card-usecase-${useCase.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-foreground">{useCase.title}</h4>
                <p className="text-sm text-muted-foreground">{useCase.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
