import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { QrCode, Heart, Shield, Zap, Globe } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const InteractiveHeart = () => {
  const [isFilled, setIsFilled] = useState(false);

  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div
      className="relative inline-flex items-center justify-center cursor-pointer select-none"
      onClick={handleClick}
      role="button"
      aria-label="Love this"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        animate={isFilled ? {
          scale: [1, 1.4, 1],
          transition: { duration: 0.4 }
        } : {}}
      >
        <Heart
          className={`w-4 h-4 transition-all duration-300 ${isFilled ? "text-red-500 fill-red-500" : "text-slate-500 hover:text-red-500"
            }`}
        />
      </motion.div>

      <AnimatePresence>
        {isFilled && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 0,
                  x: Math.cos(i * 45 * (Math.PI / 180)) * 20,
                  y: Math.sin(i * 45 * (Math.PI / 180)) * 20
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-1 h-1 bg-red-500 rounded-full"
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Footer() {

  return (
    <footer className="bg-black/80 backdrop-blur-3xl text-slate-300 py-16 border-t border-glass-border">
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
                className="inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <SiX className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/jangirsoham07/techza-site"
                target="_blank"
                rel="external noopener noreferrer"
                aria-label="View on GitHub"
                data-testid="link-social-github"
                className="inline-flex items-center justify-center w-11 h-11 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
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
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                  data-testid="link-privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                  data-testid="link-terms"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500 flex items-center justify-center gap-1 flex-wrap">
            <span>2025 QRCGenius. Built with</span>
            <InteractiveHeart />
            <span>for the web.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
