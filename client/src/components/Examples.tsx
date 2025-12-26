import { useState, useEffect, useRef } from "react";
import { CardContent } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Download, Copy, Check, Wifi, User, MapPin, Link2, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface Example {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: typeof Wifi;
  category: string;
}

const examples: Example[] = [
  {
    id: "wifi",
    title: "WiFi Network",
    description: "Share your WiFi credentials easily",
    content: "WIFI:T:WPA;S:MyNetwork;P:SecurePass123;;",
    icon: Wifi,
    category: "Connectivity",
  },
  {
    id: "vcard",
    title: "Contact Card",
    description: "Share contact information",
    content:
      "BEGIN:VCARD\nVERSION:3.0\nN:Doe;John\nFN:John Doe\nTEL:+1-234-567-8900\nEMAIL:john@example.com\nEND:VCARD",
    icon: User,
    category: "Contact",
  },
  {
    id: "location",
    title: "Location",
    description: "Share a geographic location",
    content: "geo:40.7128,-74.0060",
    icon: MapPin,
    category: "Navigation",
  },
  {
    id: "url",
    title: "Website URL",
    description: "Link to any website",
    content: "https://example.com",
    icon: Link2,
    category: "Web",
  },
  {
    id: "email",
    title: "Email Address",
    description: "Quick email composition",
    content: "mailto:hello@example.com?subject=Hello&body=Hi%20there!",
    icon: Mail,
    category: "Communication",
  },
  {
    id: "phone",
    title: "Phone Number",
    description: "Quick dial phone number",
    content: "tel:+1-234-567-8900",
    icon: Phone,
    category: "Communication",
  },
];

export default function Examples() {
  const { toast } = useToast();
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [qrImages, setQrImages] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const dialogCanvasRef = useRef<HTMLCanvasElement>(null);
  const [dialogQrUrl, setDialogQrUrl] = useState<string | null>(null);

  useEffect(() => {
    examples.forEach(async (example) => {
      try {
        const url = await QRCode.toDataURL(example.content, {
          width: 120,
          margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        });
        setQrImages((prev) => ({ ...prev, [example.id]: url }));
      } catch (e) {
        console.error("Failed to generate example QR:", e);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedExample) {
      QRCode.toDataURL(selectedExample.content, {
        width: 300,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      }).then(setDialogQrUrl);
    }
  }, [selectedExample]);

  const downloadQR = () => {
    if (!dialogQrUrl || !selectedExample) return;
    const link = document.createElement("a");
    link.download = `qrcode-${selectedExample.id}.png`;
    link.href = dialogQrUrl;
    link.click();
    toast({
      title: "Downloaded!",
      description: "QR code saved to your device.",
    });
  };

  const copyContent = async () => {
    if (!selectedExample) return;
    await navigator.clipboard.writeText(selectedExample.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  return (
    <section id="examples" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Example QR Codes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore different types of QR codes you can create. Click any example
            to preview and download.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <GlassCard
              key={example.id}
              className="hover-elevate cursor-pointer transition-all"
              onClick={() => setSelectedExample(example)}
              data-testid={`card-example-${example.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {qrImages[example.id] ? (
                      <img
                        src={qrImages[example.id]}
                        alt={`${example.title} QR code`}
                        className="w-20 h-20 rounded-lg border bg-white"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg border bg-muted animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <example.icon className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        {example.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {example.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {example.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          ))}
        </div>

        <Dialog
          open={!!selectedExample}
          onOpenChange={() => setSelectedExample(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedExample && (
                  <>
                    <selectedExample.icon className="w-5 h-5 text-primary" />
                    {selectedExample.title}
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedExample?.description}
              </DialogDescription>
            </DialogHeader>

            {selectedExample && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  {dialogQrUrl ? (
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <img
                        src={dialogQrUrl}
                        alt={`${selectedExample.title} QR code`}
                        className="w-64 h-64"
                        data-testid="img-example-qr-preview"
                      />
                    </div>
                  ) : (
                    <div className="w-64 h-64 bg-muted animate-pulse rounded-lg" />
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Content:</p>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-all">
                    {selectedExample.content}
                  </pre>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={downloadQR}
                    className="flex-1 gap-2"
                    data-testid="button-example-download"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    onClick={copyContent}
                    className="flex-1 gap-2"
                    data-testid="button-example-copy"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Content
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
