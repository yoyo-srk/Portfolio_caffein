import { Github, Heart, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer
      className="relative overflow-hidden py-12 px-4 sm:px-6"
      style={{
        borderTop: "1px solid oklch(var(--border))",
        background: "oklch(12% 0.015 270)",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "linear-gradient(to top, oklch(72% 0.24 290 / 0.3), transparent)",
        }}
      />

      {/* Watermark */}
      <div
        className="absolute bottom-4 right-6 opacity-10 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <img
          src="/assets/uploads/sk_watermark_tp-2.png"
          alt=""
          aria-hidden="true"
          className="w-24 h-24 object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <img
                src="/assets/uploads/sk_logo-3.png"
                alt="SK Logo"
                className="w-9 h-9 rounded-lg object-contain"
              />
              <span className="font-display font-bold text-lg gradient-text">
                Sarfaraj Kashmani
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              "Crafting Web Excellence"
            </p>
          </motion.div>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 glass"
                style={{ color: "oklch(60% 0.005 0)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(72% 0.24 290)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 12px oklch(72% 0.24 290 / 0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "oklch(60% 0.005 0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(var(--border)), transparent)",
          }}
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {year} Sarfaraj Kashmani. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <Heart
              size={13}
              className="inline"
              style={{ color: "oklch(65% 0.2 25)", fill: "oklch(65% 0.2 25)" }}
            />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
              style={{ color: "oklch(72% 0.24 290)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
