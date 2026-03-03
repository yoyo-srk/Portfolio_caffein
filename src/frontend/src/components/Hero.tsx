import type { Engine } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ChevronDown, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const ROLES = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "TypeScript Expert",
];

export default function Hero() {
  const [engineReady, setEngineReady] = useState(false);
  const [displayedRole, setDisplayedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Init tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  // Typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const speed = isDeleting ? 60 : 100;
    const pause = isDeleting ? 0 : 2000;

    const timer = setTimeout(
      () => {
        if (!isDeleting && displayedRole === currentRole) {
          setTimeout(() => setIsDeleting(true), pause);
          return;
        }
        if (isDeleting && displayedRole === "") {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
          return;
        }
        setDisplayedRole((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentRole.slice(0, prev.length + 1),
        );
      },
      isDeleting || displayedRole !== currentRole ? speed : 0,
    );

    return () => clearTimeout(timer);
  }, [displayedRole, roleIndex, isDeleting]);

  // Cursor glow
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: ["#a855f7", "#3b82f6", "#06b6d4"] },
      links: {
        color: "#a855f7",
        distance: 130,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: { default: "bounce" as const },
        random: false,
        speed: 0.6,
        straight: false,
      },
      number: { density: { enable: true }, value: 60 },
      opacity: { value: 0.25 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor glow effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, oklch(72% 0.24 290 / 0.05), transparent 40%)`,
        }}
      />

      {/* Particle background */}
      {engineReady && (
        <div className="absolute inset-0 z-0">
          <Particles id="tsparticles" options={particlesOptions} />
        </div>
      )}

      {/* Ambient glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 animate-blob-move"
        style={{ background: "oklch(72% 0.24 290)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{
          background: "oklch(75% 0.25 192)",
          animationDelay: "3s",
          animation: "blob-move 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background: "oklch(65% 0.2 220)",
          animation: "blob-move 12s ease-in-out infinite",
          animationDelay: "6s",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-mono text-xs"
          style={{
            background: "oklch(72% 0.24 290 / 0.1)",
            border: "1px solid oklch(72% 0.24 290 / 0.2)",
            color: "oklch(72% 0.24 290)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "oklch(75% 0.25 192)" }}
          />
          Available for freelance work
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] mb-4"
        >
          <span className="block text-foreground">Sarfaraj</span>
          <span className="block gradient-text">Kashmani</span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-10 flex items-center justify-center mb-4"
        >
          <span
            className="font-display font-semibold text-xl sm:text-2xl lg:text-3xl"
            style={{ color: "oklch(65% 0.2 220)" }}
          >
            {displayedRole}
            <span
              className="inline-block w-0.5 h-7 ml-1 align-middle"
              style={{
                background: "oklch(75% 0.25 192)",
                animation: "blink-cursor 1s step-end infinite",
              }}
            />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-lg sm:text-xl text-muted-foreground mb-3 font-display italic"
        >
          "Crafting Web Excellence"
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
        >
          I build scalable, performant web applications with modern
          technologies. Turning complex ideas into intuitive digital
          experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
        >
          <button
            type="button"
            onClick={scrollToProjects}
            className="px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-neon-purple"
            style={{
              background:
                "linear-gradient(135deg, oklch(72% 0.24 290), oklch(65% 0.2 220))",
              color: "white",
            }}
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={scrollToContact}
            className="px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 glass"
            style={{
              border: "1px solid oklch(72% 0.24 290 / 0.3)",
              color: "oklch(72% 0.24 290)",
            }}
          >
            Contact Me
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 glass"
              style={{
                color: "oklch(60% 0.005 0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 16px oklch(72% 0.24 290 / 0.6)";
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(72% 0.24 290)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(72% 0.24 290 / 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(60% 0.005 0)";
                (e.currentTarget as HTMLElement).style.borderColor = "";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono">scroll</span>
        <div className="animate-bounce-down">
          <ChevronDown size={18} style={{ color: "oklch(72% 0.24 290)" }} />
        </div>
      </motion.div>
    </section>
  );
}
