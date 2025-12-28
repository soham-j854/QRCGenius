import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, QrCode } from "lucide-react";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  const homeNavItems = [
    { label: "Home", section: "home" },
    { label: "How It Works", section: "how-it-works" },
    { label: "Examples", section: "examples" },
    { label: "FAQ", section: "faq" },
  ];

  const pageNavItems = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavClick = (section: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(section);
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass-surface backdrop-blur-3xl border-b border-glass-border transition-all duration-300 hover:bg-glass-surface/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground" data-testid="text-logo">
              QRCGenius
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {isHomePage && homeNavItems.map((item) => (
              <Button
                key={item.section}
                variant="ghost"
                onClick={() => handleNavClick(item.section)}
                data-testid={`link-nav-${item.section}`}
              >
                {item.label}
              </Button>
            ))}
            {pageNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border" data-testid="nav-mobile">
            <div className="flex flex-col gap-1">
              {isHomePage && homeNavItems.map((item) => (
                <Button
                  key={item.section}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleNavClick(item.section)}
                  data-testid={`link-nav-mobile-${item.section}`}
                >
                  {item.label}
                </Button>
              ))}
              {pageNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="justify-start w-full"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-nav-mobile-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
