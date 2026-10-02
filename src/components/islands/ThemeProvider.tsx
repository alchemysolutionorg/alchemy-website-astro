import React, { createContext, useContext, useEffect, useState } from "react";
import { AlchemyLogo } from "@/components/AlchemyLogo";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "dark" | "light";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "dark",
  setTheme: () => null,
});

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

// Navbar component
const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Engineering", href: "#engineering" },
  { name: "Why Alchemy", href: "#why-alchemy" },
  { name: "Process", href: "#process" },
  { name: "Testimonials", href: "#testimonials" },
];

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-4 glass-card border-b border-white/8 shadow-md" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
              <AlchemyLogo />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-wide">ALCHEMY</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="relative text-sm font-medium hover:text-primary transition-colors duration-200 after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Start Project
            </a>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 right-0 z-[70] md:hidden flex flex-col border-b border-border bg-background shadow-2xl dark:border-white/8"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 dark:border-white/8">
                <a href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <AlchemyLogo />
                  <span className="font-display font-bold text-xl tracking-wide">ALCHEMY</span>
                </a>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:hover:bg-white/10" aria-label="Close menu">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col px-6 pt-4 pb-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.25 }}
                    className="flex items-center text-lg font-semibold py-4 border-b border-black/5 hover:text-primary transition-colors duration-200 last:border-0 dark:border-white/8"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              <div className="px-6 pt-4 pb-8">
                <motion.a
                  href="#contact"
                  onClick={(e) => scrollTo(e, "#contact")}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.25 }}
                  className="flex items-center justify-center w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
                >
                  Start Project
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Main combined component
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "alchemy-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored === "light" || stored === "dark") setTheme(stored);
    setResolved(true);
  }, [storageKey]);

  useEffect(() => {
    if (!resolved) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey, resolved]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      <Navbar />
      {children}
    </ThemeProviderContext.Provider>
  );
}

export default ThemeProvider;