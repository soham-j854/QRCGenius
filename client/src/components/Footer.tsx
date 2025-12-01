import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QrCode, Heart, Shield, Zap, Globe } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <QrCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">QRCGenius</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Instant, Free QR Codes for Everyone
            </p>
            <div className="flex gap-3">
              <a
                href="https://x.com/jangirsoham08"
                target="_blank"
                rel="external noopener noreferrer"
                aria-label="Follow us on X"
                data-testid="link-social-x"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/jangirsoham07/techza-site"
                target="_blank"
                rel="external noopener noreferrer"
                aria-label="View on GitHub"
                data-testid="link-social-github"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <SiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Why Free?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong className="text-white">No Limits</strong> — Create as many QR codes as you need
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong className="text-white">Privacy-First</strong> — Everything runs in your browser
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  <strong className="text-white">Open Standards</strong> — Built on proven technology
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                  data-testid="link-about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                  data-testid="link-contact"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                  onClick={() => setPrivacyOpen(true)}
                  data-testid="link-privacy"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                  onClick={() => setTermsOpen(true)}
                  data-testid="link-terms"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-1 flex-wrap">
            <span>2025 QRCGenius. Built with</span>
            <Heart className="w-4 h-4 text-red-500 inline" />
            <span>for the web.</span>
          </p>
        </div>
      </div>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
            <DialogDescription>
              How QRCGenius handles your data and protects your privacy.
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert">
            <p className="text-muted-foreground">Last updated: January 2025</p>
            <h3 className="text-foreground">Data Collection</h3>
            <p className="text-muted-foreground">
              QRCGenius does not collect, store, or process any personal data. All QR code generation happens entirely in your browser (client-side). We have no access to the content you encode.
            </p>
            <h3 className="text-foreground">Local Storage</h3>
            <p className="text-muted-foreground">
              Your recent QR codes are stored locally in your browser using LocalStorage. This data never leaves your device and can be cleared at any time through your browser settings or by using the delete buttons in the app.
            </p>
            <h3 className="text-foreground">Cookies & Tracking</h3>
            <p className="text-muted-foreground">
              We do not use cookies, analytics, or any tracking scripts. We do not serve advertisements.
            </p>
            <h3 className="text-foreground">GDPR Compliance</h3>
            <p className="text-muted-foreground">
              Since we don't collect any personal data, QRCGenius is fully compliant with GDPR and other privacy regulations.
            </p>
            <h3 className="text-foreground">Contact</h3>
            <p className="text-muted-foreground">
              For privacy-related questions, please contact us at hello@qrcgenius.app.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Terms of Service</DialogTitle>
            <DialogDescription>
              Terms and conditions for using QRCGenius.
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert">
            <p className="text-muted-foreground">Last updated: January 2025</p>
            <h3 className="text-foreground">Service Description</h3>
            <p className="text-muted-foreground">
              QRCGenius provides a free QR code generation service. The service is provided "as is" without warranties of any kind.
            </p>
            <h3 className="text-foreground">Acceptable Use</h3>
            <p className="text-muted-foreground">
              You agree to use QRCGenius only for lawful purposes. You may not use the service to create QR codes that link to illegal, harmful, or malicious content.
            </p>
            <h3 className="text-foreground">Intellectual Property</h3>
            <p className="text-muted-foreground">
              QR codes you generate are yours to use freely. The QRCGenius brand, logo, and website design remain our intellectual property.
            </p>
            <h3 className="text-foreground">Limitation of Liability</h3>
            <p className="text-muted-foreground">
              QRCGenius is not liable for any damages arising from the use of our service. We make no guarantees about the scannability or functionality of generated QR codes.
            </p>
            <h3 className="text-foreground">Changes to Terms</h3>
            <p className="text-muted-foreground">
              We may update these terms at any time. Continued use of the service constitutes acceptance of new terms.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
