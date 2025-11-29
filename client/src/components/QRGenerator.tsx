import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Download,
  Copy,
  Check,
  Loader2,
  Image as ImageIcon,
  X,
  Palette,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface QRHistoryItem {
  id: string;
  content: string;
  dataUrl: string;
  createdAt: number;
  settings: QRSettings;
}

interface QRSettings {
  size: number;
  fgColor: string;
  bgColor: string;
  errorCorrection: "L" | "M" | "Q" | "H";
}

const COLOR_PRESETS = [
  { name: "Classic", fg: "#000000", bg: "#ffffff" },
  { name: "Ocean", fg: "#0ea5e9", bg: "#f0f9ff" },
  { name: "Forest", fg: "#16a34a", bg: "#f0fdf4" },
  { name: "Sunset", fg: "#ea580c", bg: "#fff7ed" },
  { name: "Royal", fg: "#7c3aed", bg: "#faf5ff" },
];

const MAX_CONTENT_LENGTH = 1000;

export default function QRGenerator() {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState<QRSettings>({
    size: 300,
    fgColor: "#000000",
    bgColor: "#ffffff",
    errorCorrection: "M",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("qrgenius-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("qrgenius-history", JSON.stringify(history.slice(0, 5)));
  }, [history]);

  const validateContent = useCallback((text: string): string | null => {
    if (!text.trim()) {
      return "Please enter some content to generate a QR code.";
    }
    if (text.length > MAX_CONTENT_LENGTH) {
      return `Content is too long. Maximum ${MAX_CONTENT_LENGTH} characters allowed.`;
    }
    return null;
  }, []);

  const handleContentChange = (value: string) => {
    setContent(value);
    setValidationError(validateContent(value));
  };

  const generateQRCode = async () => {
    const error = validateContent(content);
    if (error) {
      setValidationError(error);
      return;
    }

    setIsGenerating(true);
    setValidationError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const qrCanvas = document.createElement("canvas");
      await QRCode.toCanvas(qrCanvas, content, {
        width: settings.size,
        margin: 2,
        errorCorrectionLevel: settings.errorCorrection,
        color: {
          dark: settings.fgColor,
          light: settings.bgColor,
        },
      });

      if (logoFile && logoPreview) {
        const ctx = qrCanvas.getContext("2d");
        if (ctx) {
          const logoImg = new Image();
          logoImg.src = logoPreview;
          await new Promise((resolve) => {
            logoImg.onload = resolve;
          });

          const logoSize = settings.size * 0.2;
          const logoX = (settings.size - logoSize) / 2;
          const logoY = (settings.size - logoSize) / 2;

          ctx.fillStyle = settings.bgColor;
          ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8);

          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        }
      }

      const dataUrl = qrCanvas.toDataURL("image/png");
      setQrDataUrl(dataUrl);

      const newItem: QRHistoryItem = {
        id: Date.now().toString(),
        content,
        dataUrl,
        createdAt: Date.now(),
        settings: { ...settings },
      };
      setHistory((prev) => [newItem, ...prev.slice(0, 4)]);

      toast({
        title: "QR Code Generated!",
        description: "Your QR code is ready to download.",
      });
    } catch (error) {
      console.error("QR generation error:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Logo must be less than 1MB.",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, SVG).",
        variant: "destructive",
      });
      return;
    }

    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadQR = (format: "png" | "svg") => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = `qrcode-${Date.now()}.${format}`;
    link.href = qrDataUrl;
    link.click();

    toast({
      title: "Downloaded!",
      description: `QR code saved as ${format.toUpperCase()}.`,
    });
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) return;

    try {
      const blob = await (await fetch(qrDataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "QR code copied to clipboard.",
      });
    } catch (error) {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      });
    }
  };

  const loadFromHistory = (item: QRHistoryItem) => {
    setContent(item.content);
    setSettings(item.settings);
    setQrDataUrl(item.dataUrl);
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    setSettings((prev) => ({
      ...prev,
      fgColor: preset.fg,
      bgColor: preset.bg,
    }));
  };

  return (
    <section id="generator" className="py-16 md:py-24" aria-label="QR Code Generator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Free Online QR Code Generator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create custom QR codes for websites, WiFi networks, contact cards, and more. 
            Download in PNG or SVG format. No registration required.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create Your QR Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content">
                    Content
                    <span className="text-muted-foreground ml-2 text-sm font-normal">
                      ({content.length}/{MAX_CONTENT_LENGTH})
                    </span>
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Enter URL, text, vCard, WiFi credentials...&#10;&#10;Examples:&#10;https://example.com&#10;WIFI:T:WPA;S:MyNetwork;P:password;;"
                    value={content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    className="min-h-[120px] resize-none text-base"
                    aria-describedby="content-error"
                    data-testid="input-content"
                  />
                  {validationError && (
                    <p
                      id="content-error"
                      className="text-sm text-destructive"
                      role="alert"
                      data-testid="text-validation-error"
                    >
                      {validationError}
                    </p>
                  )}
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="customization">
                    <AccordionTrigger data-testid="button-customization-toggle">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Customization Options
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 pt-4">
                        <div className="space-y-3">
                          <Label>Size: {settings.size}px</Label>
                          <Slider
                            value={[settings.size]}
                            onValueChange={(value) =>
                              setSettings((prev) => ({ ...prev, size: value[0] }))
                            }
                            min={100}
                            max={500}
                            step={10}
                            data-testid="slider-size"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label>Color Presets</Label>
                          <div className="flex flex-wrap gap-2">
                            {COLOR_PRESETS.map((preset) => (
                              <Button
                                key={preset.name}
                                variant="outline"
                                size="sm"
                                onClick={() => applyPreset(preset)}
                                className="gap-2"
                                data-testid={`button-preset-${preset.name.toLowerCase()}`}
                              >
                                <div
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: preset.fg }}
                                />
                                {preset.name}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fgColor">Foreground Color</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                id="fgColor"
                                value={settings.fgColor}
                                onChange={(e) =>
                                  setSettings((prev) => ({
                                    ...prev,
                                    fgColor: e.target.value,
                                  }))
                                }
                                className="w-12 h-9 p-1 cursor-pointer"
                                data-testid="input-fg-color"
                              />
                              <Input
                                type="text"
                                value={settings.fgColor}
                                onChange={(e) =>
                                  setSettings((prev) => ({
                                    ...prev,
                                    fgColor: e.target.value,
                                  }))
                                }
                                className="flex-1 font-mono text-sm"
                                data-testid="input-fg-color-hex"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bgColor">Background Color</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                id="bgColor"
                                value={settings.bgColor}
                                onChange={(e) =>
                                  setSettings((prev) => ({
                                    ...prev,
                                    bgColor: e.target.value,
                                  }))
                                }
                                className="w-12 h-9 p-1 cursor-pointer"
                                data-testid="input-bg-color"
                              />
                              <Input
                                type="text"
                                value={settings.bgColor}
                                onChange={(e) =>
                                  setSettings((prev) => ({
                                    ...prev,
                                    bgColor: e.target.value,
                                  }))
                                }
                                className="flex-1 font-mono text-sm"
                                data-testid="input-bg-color-hex"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="errorCorrection">Error Correction Level</Label>
                          <Select
                            value={settings.errorCorrection}
                            onValueChange={(value: "L" | "M" | "Q" | "H") =>
                              setSettings((prev) => ({
                                ...prev,
                                errorCorrection: value,
                              }))
                            }
                          >
                            <SelectTrigger id="errorCorrection" data-testid="select-error-correction">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="L">Low (7% recovery)</SelectItem>
                              <SelectItem value="M">Medium (15% recovery)</SelectItem>
                              <SelectItem value="Q">Quartile (25% recovery)</SelectItem>
                              <SelectItem value="H">High (30% recovery)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Logo (Optional)</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              ref={fileInputRef}
                              type="file"
                              accept="image/png,image/jpeg,image/svg+xml"
                              onChange={handleLogoUpload}
                              className="hidden"
                              id="logo-upload"
                              data-testid="input-logo-upload"
                            />
                            <Button
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="gap-2"
                              data-testid="button-upload-logo"
                            >
                              <ImageIcon className="w-4 h-4" />
                              Upload Logo
                            </Button>
                            {logoPreview && (
                              <div className="flex items-center gap-2">
                                <img
                                  src={logoPreview}
                                  alt="Logo preview"
                                  className="w-10 h-10 object-contain rounded border"
                                />
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={removeLogo}
                                  data-testid="button-remove-logo"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, or SVG. Max 1MB. Will be centered at 20% of QR size.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button
                  onClick={generateQRCode}
                  disabled={isGenerating || !!validationError || !content.trim()}
                  className="w-full gap-2"
                  size="lg"
                  data-testid="button-generate"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate QR Code"
                  )}
                </Button>

                {qrDataUrl && (
                  <div
                    className="mt-8 p-6 bg-muted/30 rounded-lg"
                    aria-live="polite"
                    data-testid="section-qr-output"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-2">Your QR Code</h3>
                      <p className="text-sm text-muted-foreground">
                        Scan with any QR code reader
                      </p>
                    </div>

                    <div className="flex justify-center mb-6">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <img
                          src={qrDataUrl}
                          alt={`QR Code for: ${content.substring(0, 50)}${content.length > 50 ? "..." : ""}`}
                          className="max-w-full"
                          style={{ width: settings.size, height: settings.size }}
                          data-testid="img-qr-output"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                      <Button
                        variant="outline"
                        onClick={() => downloadQR("png")}
                        className="gap-2"
                        data-testid="button-download-png"
                      >
                        <Download className="w-4 h-4" />
                        PNG
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => downloadQR("svg")}
                        className="gap-2"
                        data-testid="button-download-svg"
                      >
                        <Download className="w-4 h-4" />
                        SVG
                      </Button>
                      <Button
                        variant="outline"
                        onClick={copyToClipboard}
                        className="gap-2"
                        data-testid="button-copy"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent QR Codes</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No QR codes yet</p>
                    <p className="text-xs mt-1">Your recent codes will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover-elevate cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(item)}
                        data-testid={`card-history-${item.id}`}
                      >
                        <img
                          src={item.dataUrl}
                          alt="QR code thumbnail"
                          className="w-12 h-12 rounded border bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.content.substring(0, 30)}
                            {item.content.length > 30 ? "..." : ""}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromHistory(item.id);
                          }}
                          data-testid={`button-delete-history-${item.id}`}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
