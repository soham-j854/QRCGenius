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
import { QRDesignStyle, applyDesignStyle } from "@/lib/qr-styles";

interface QRHistoryItem {
  id: string;
  content: string;
  dataUrl: string;
  createdAt: number;
  settings: QRSettings;
}

interface QRSettings {
  width: number;
  height: number;
  fgColor: string;
  bgColor: string;
  errorCorrection: "L" | "M" | "Q" | "H";
  designStyle: QRDesignStyle;
}

type QRType = "text" | "website" | "contact" | "wifi" | "email" | "phone" | "sms";

interface QRFormData {
  website_url?: string;
  contact_name?: string;
  contact_country_code?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_company?: string;
  contact_website?: string;
  wifi_ssid?: string;
  wifi_password?: string;
  wifi_security?: "WPA" | "WEP" | "nopass";
  email_address?: string;
  email_subject?: string;
  email_body?: string;
  phone_number?: string;
  sms_number?: string;
  sms_message?: string;
  text_content?: string;
}

const COUNTRY_CODES = [
  { name: "United States", code: "+1" },
  { name: "India", code: "+91" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Japan", code: "+81" },
  { name: "China", code: "+86" },
  { name: "Brazil", code: "+55" },
  { name: "Mexico", code: "+52" },
  { name: "Spain", code: "+34" },
  { name: "Italy", code: "+39" },
  { name: "Netherlands", code: "+31" },
  { name: "South Korea", code: "+82" },
  { name: "Singapore", code: "+65" },
  { name: "UAE", code: "+971" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Pakistan", code: "+92" },
  { name: "Russia", code: "+7" },
];

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
  const [qrType, setQrType] = useState<QRType>("text");
  const [formData, setFormData] = useState<QRFormData>({
    text_content: "",
  });
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState<QRSettings>({
    width: 500,
    height: 500,
    fgColor: "#000000",
    bgColor: "#ffffff",
    errorCorrection: "H",
    designStyle: "standard",
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

  const buildQRContent = useCallback((type: QRType, data: QRFormData): string => {
    switch (type) {
      case "website":
        return data.website_url || "";
      case "contact":
        const fullPhone = data.contact_country_code ? `${data.contact_country_code}${data.contact_phone || ""}` : data.contact_phone || "";
        return `BEGIN:VCARD
VERSION:3.0
FN:${data.contact_name || ""}
TEL:${fullPhone}
EMAIL:${data.contact_email || ""}
ORG:${data.contact_company || ""}
URL:${data.contact_website || ""}
END:VCARD`;
      case "wifi":
        return `WIFI:T:${data.wifi_security || "WPA"};S:${data.wifi_ssid || ""};P:${data.wifi_password || ""};;`;
      case "email":
        return `mailto:${data.email_address}?subject=${encodeURIComponent(data.email_subject || "")}&body=${encodeURIComponent(data.email_body || "")}`;
      case "phone":
        return `tel:${data.phone_number || ""}`;
      case "sms":
        return `smsto:${data.sms_number}:${data.sms_message || ""}`;
      default:
        return data.text_content || "";
    }
  }, []);

  const handleQRTypeChange = (type: QRType) => {
    setQrType(type);
    setFormData({});
    setContent("");
    setValidationError(null);
  };

  const updateFormData = (key: string, value: string) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    const newContent = buildQRContent(qrType, updated);
    setContent(newContent);
    setValidationError(validateContent(newContent));
  };

  const generateQRCode = async () => {
    const error = validateContent(content);
    if (error) {
      setValidationError(error);
      return;
    }

    // Validate dimensions
    if (settings.width < 100 || settings.width > 1000) {
      setValidationError(`Width must be between 100 and 1000 pixels. Current: ${settings.width}px is too ${settings.width < 100 ? "low" : "high"}.`);
      return;
    }
    if (settings.height < 100 || settings.height > 1000) {
      setValidationError(`Height must be between 100 and 1000 pixels. Current: ${settings.height}px is too ${settings.height < 100 ? "low" : "high"}.`);
      return;
    }

    setIsGenerating(true);
    setValidationError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const qrCanvas = document.createElement("canvas");
      // Use the maximum of width and height to ensure QR code is square
      const size = Math.max(settings.width, settings.height);
      await QRCode.toCanvas(qrCanvas, content, {
        width: size,
        margin: 2,
        errorCorrectionLevel: settings.errorCorrection,
        color: {
          dark: settings.fgColor,
          light: settings.bgColor,
        },
      });

      // Apply design style
      const styledCanvas = applyDesignStyle(
        qrCanvas,
        size / (Math.round(size / 10) + 1),
        settings.designStyle,
        settings.fgColor,
        settings.bgColor
      );

      if (logoFile && logoPreview) {
        const ctx = styledCanvas.getContext("2d");
        if (ctx) {
          const logoImg = new Image();
          logoImg.src = logoPreview;
          await new Promise((resolve) => {
            logoImg.onload = resolve;
          });

          const logoSize = size * 0.2;
          const logoX = (size - logoSize) / 2;
          const logoY = (size - logoSize) / 2;

          ctx.fillStyle = settings.bgColor;
          ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8);

          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
        }
      }

      const dataUrl = styledCanvas.toDataURL("image/png");
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
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="qr-type" className="mb-3 block">
                      QR Code Type
                    </Label>
                    <Select value={qrType} onValueChange={(value) => handleQRTypeChange(value as QRType)}>
                      <SelectTrigger id="qr-type" data-testid="select-qr-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Plain Text</SelectItem>
                        <SelectItem value="website">Website URL</SelectItem>
                        <SelectItem value="contact">Contact Card (vCard)</SelectItem>
                        <SelectItem value="wifi">WiFi Network</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="sms">SMS Message</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    {qrType === "text" && (
                      <div className="space-y-2">
                        <Label htmlFor="text-input">Text Content</Label>
                        <Textarea
                          id="text-input"
                          placeholder="Enter your text..."
                          value={formData.text_content || ""}
                          onChange={(e) => updateFormData("text_content", e.target.value)}
                          className="min-h-[100px] resize-none text-base"
                          data-testid="input-text"
                        />
                      </div>
                    )}

                    {qrType === "website" && (
                      <div className="space-y-2">
                        <Label htmlFor="website-url">Website URL</Label>
                        <Input
                          id="website-url"
                          type="url"
                          placeholder="https://example.com"
                          value={formData.website_url || ""}
                          onChange={(e) => updateFormData("website_url", e.target.value)}
                          data-testid="input-website-url"
                        />
                      </div>
                    )}

                    {qrType === "contact" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="contact-name">Name *</Label>
                          <Input
                            id="contact-name"
                            placeholder="John Doe"
                            value={formData.contact_name || ""}
                            onChange={(e) => updateFormData("contact_name", e.target.value)}
                            data-testid="input-contact-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Select value={formData.contact_country_code || "+1"} onValueChange={(value) => updateFormData("contact_country_code", value)}>
                                <SelectTrigger data-testid="select-country-code">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {COUNTRY_CODES.map((country) => (
                                    <SelectItem key={`${country.name}-${country.code}`} value={country.code}>
                                      {country.name} ({country.code})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex-1">
                              <Input
                                placeholder="555 000 0000"
                                value={formData.contact_phone || ""}
                                onChange={(e) => updateFormData("contact_phone", e.target.value)}
                                data-testid="input-contact-phone"
                              />
                            </div>
                          </div>
                          <Input
                            placeholder="Or enter custom country code (e.g., +880 for Bangladesh)"
                            value={formData.contact_country_code || ""}
                            onChange={(e) => updateFormData("contact_country_code", e.target.value)}
                            className="mt-2 font-mono text-sm"
                            data-testid="input-custom-country-code"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-email">Email</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.contact_email || ""}
                            onChange={(e) => updateFormData("contact_email", e.target.value)}
                            data-testid="input-contact-email"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-company">Company</Label>
                          <Input
                            id="contact-company"
                            placeholder="Your Company"
                            value={formData.contact_company || ""}
                            onChange={(e) => updateFormData("contact_company", e.target.value)}
                            data-testid="input-contact-company"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-website">Website</Label>
                          <Input
                            id="contact-website"
                            type="url"
                            placeholder="https://example.com"
                            value={formData.contact_website || ""}
                            onChange={(e) => updateFormData("contact_website", e.target.value)}
                            data-testid="input-contact-website"
                          />
                        </div>
                      </div>
                    )}

                    {qrType === "wifi" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="wifi-ssid">Network Name (SSID) *</Label>
                          <Input
                            id="wifi-ssid"
                            placeholder="MyNetworkName"
                            value={formData.wifi_ssid || ""}
                            onChange={(e) => updateFormData("wifi_ssid", e.target.value)}
                            data-testid="input-wifi-ssid"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="wifi-security">Security Type</Label>
                          <Select value={formData.wifi_security || "WPA"} onValueChange={(value) => updateFormData("wifi_security", value)}>
                            <SelectTrigger id="wifi-security" data-testid="select-wifi-security">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="WPA">WPA/WPA2</SelectItem>
                              <SelectItem value="WEP">WEP</SelectItem>
                              <SelectItem value="nopass">No Password</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="wifi-password">Password</Label>
                          <Input
                            id="wifi-password"
                            type="password"
                            placeholder="Leave empty if no password"
                            value={formData.wifi_password || ""}
                            onChange={(e) => updateFormData("wifi_password", e.target.value)}
                            data-testid="input-wifi-password"
                          />
                        </div>
                      </div>
                    )}

                    {qrType === "email" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="email-address">Email Address *</Label>
                          <Input
                            id="email-address"
                            type="email"
                            placeholder="recipient@example.com"
                            value={formData.email_address || ""}
                            onChange={(e) => updateFormData("email_address", e.target.value)}
                            data-testid="input-email-address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-subject">Subject</Label>
                          <Input
                            id="email-subject"
                            placeholder="Email subject"
                            value={formData.email_subject || ""}
                            onChange={(e) => updateFormData("email_subject", e.target.value)}
                            data-testid="input-email-subject"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email-body">Message</Label>
                          <Textarea
                            id="email-body"
                            placeholder="Email body"
                            value={formData.email_body || ""}
                            onChange={(e) => updateFormData("email_body", e.target.value)}
                            className="min-h-[80px] resize-none text-base"
                            data-testid="input-email-body"
                          />
                        </div>
                      </div>
                    )}

                    {qrType === "phone" && (
                      <div className="space-y-2">
                        <Label htmlFor="phone-number">Phone Number *</Label>
                        <Input
                          id="phone-number"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone_number || ""}
                          onChange={(e) => updateFormData("phone_number", e.target.value)}
                          data-testid="input-phone-number"
                        />
                      </div>
                    )}

                    {qrType === "sms" && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="sms-number">Phone Number *</Label>
                          <Input
                            id="sms-number"
                            placeholder="+1 (555) 000-0000"
                            value={formData.sms_number || ""}
                            onChange={(e) => updateFormData("sms_number", e.target.value)}
                            data-testid="input-sms-number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sms-message">Message</Label>
                          <Textarea
                            id="sms-message"
                            placeholder="Your SMS message"
                            value={formData.sms_message || ""}
                            onChange={(e) => updateFormData("sms_message", e.target.value)}
                            className="min-h-[80px] resize-none text-base"
                            data-testid="input-sms-message"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-muted/50 rounded-md border border-muted">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Content Preview:</span> {content.length > 0 ? content.substring(0, 80) + (content.length > 80 ? "..." : "") : "No content yet"}
                    </p>
                  </div>

                  {validationError && (
                    <p
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
                          <Label>Width: {settings.width}px</Label>
                          <Slider
                            value={[settings.width]}
                            onValueChange={(value) =>
                              setSettings((prev) => ({ ...prev, width: value[0] }))
                            }
                            min={100}
                            max={1000}
                            step={10}
                            data-testid="slider-width"
                          />
                          <div className="mt-2">
                            <Input
                              type="number"
                              value={settings.width}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue === "") {
                                  setSettings((prev) => ({ ...prev, width: 0 }));
                                } else {
                                  const value = parseInt(inputValue);
                                  if (!isNaN(value)) {
                                    setSettings((prev) => ({ ...prev, width: value }));
                                  }
                                }
                              }}
                              placeholder="Width (100-1000)"
                              className="font-mono text-sm"
                              data-testid="input-width"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Height: {settings.height}px</Label>
                          <Slider
                            value={[settings.height]}
                            onValueChange={(value) =>
                              setSettings((prev) => ({ ...prev, height: value[0] }))
                            }
                            min={100}
                            max={1000}
                            step={10}
                            data-testid="slider-height"
                          />
                          <div className="mt-2">
                            <Input
                              type="number"
                              value={settings.height}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue === "") {
                                  setSettings((prev) => ({ ...prev, height: 0 }));
                                } else {
                                  const value = parseInt(inputValue);
                                  if (!isNaN(value)) {
                                    setSettings((prev) => ({ ...prev, height: value }));
                                  }
                                }
                              }}
                              placeholder="Height (100-1000)"
                              className="font-mono text-sm"
                              data-testid="input-height"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-muted/50 rounded-md border border-muted">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">💡 Tip:</span> Simple everyday QR codes typically use a resolution of <span className="font-mono font-semibold text-foreground">300-500px</span>. Use higher resolutions (600-1000px) for small print applications.
                          </p>
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
                              <SelectItem value="H">High (30% recovery) - Recommended for printing</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            🎯 High error correction is enabled by default. Your QR codes will remain scannable even if 30% is damaged, making them perfect for printed materials.
                          </p>
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
                          style={{ width: `${settings.width}px`, height: `${settings.height}px` }}
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
                            {(() => {
                              const now = new Date();
                              const created = new Date(item.createdAt);
                              const diffMs = now.getTime() - created.getTime();
                              const diffMins = Math.floor(diffMs / 60000);
                              const diffHours = Math.floor(diffMs / 3600000);
                              const diffDays = Math.floor(diffMs / 86400000);

                              if (diffMins < 1) return "Just now";
                              if (diffMins < 60) return `${diffMins}m ago`;
                              if (diffHours < 24) return `${diffHours}h ago`;
                              if (diffDays < 7) return `${diffDays}d ago`;
                              
                              return created.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                            })()}
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
