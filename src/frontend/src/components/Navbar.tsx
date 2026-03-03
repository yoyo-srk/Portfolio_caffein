import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  isLight: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isLight, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-60px 0px -60px 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <motion.header
      className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-glass" : ""
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="relative group flex items-center gap-2"
          >
            <img
              src="/assets/uploads/sk_logo-3.png"
              alt="SK Logo"
              className="w-9 h-9 rounded-lg object-contain"
            />
            <span className="font-display font-semibold text-sm hidden sm:block gradient-text">
              Sarfaraj Kashmani
            </span>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "gradient-text"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "oklch(72% 0.24 290)" }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                color: "oklch(var(--muted-foreground))",
              }}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: "oklch(var(--muted) / 0.5)",
                color: "oklch(var(--muted-foreground))",
              }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden glass-strong"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col py-3 px-4 gap-1">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "gradient-text"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      style={
                        isActive
                          ? {
                              background: "oklch(72% 0.24 290 / 0.08)",
                            }
                          : {}
                      }
                    >
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
