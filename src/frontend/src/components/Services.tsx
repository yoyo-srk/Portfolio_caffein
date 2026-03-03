import { Cloud, Database, Globe, Palette, Smartphone, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

const SERVICES = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Building performant, accessible web applications with React, Next.js, and modern tooling. From MVPs to enterprise-scale platforms.",
    color: "oklch(72% 0.24 290)",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile experiences with React Native. Native performance, beautiful UIs, and seamless iOS & Android deployment.",
    color: "oklch(65% 0.2 220)",
  },
  {
    icon: Zap,
    title: "API Design",
    description:
      "RESTful and GraphQL APIs engineered for speed and reliability. JWT auth, rate limiting, comprehensive documentation.",
    color: "oklch(75% 0.25 192)",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description:
      "Designing scalable data models for SQL and NoSQL databases. Query optimization, indexing strategies, and migration planning.",
    color: "oklch(70% 0.22 160)",
  },
  {
    icon: Cloud,
    title: "Cloud Deployment",
    description:
      "Docker containers, CI/CD pipelines, and AWS/GCP infrastructure. Zero-downtime deployments with monitoring and auto-scaling.",
    color: "oklch(68% 0.2 55)",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Crafting pixel-perfect interfaces with Figma and modern CSS. Responsive, accessible, and animated with purpose.",
    color: "oklch(72% 0.22 330)",
  },
];

interface ServiceCardProps {
  service: (typeof SERVICES)[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { icon: Icon, title, description, color } = service;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-2xl p-6 group relative overflow-hidden"
      style={{
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        border: "1px solid oklch(var(--border))",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 24px ${color.replace(")", " / 0.2)")}`;
        (e.currentTarget as HTMLElement).style.borderColor =
          `${color.replace(")", " / 0.3)")}`;
      }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color.replace(")", " / 0.06)")}, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
        style={{
          background: `${color.replace(")", " / 0.1)")}`,
          border: `1px solid ${color.replace(")", " / 0.2)")}`,
        }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      <h3
        className="font-display font-bold text-base mb-3 relative z-10 transition-colors duration-200"
        style={{ color: "oklch(var(--foreground))" }}
      >
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
        {description}
      </p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[600px] h-[200px] rounded-full blur-3xl opacity-5"
        style={{ background: "oklch(72% 0.24 290)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="font-mono text-xs tracking-widest uppercase mb-3 block"
            style={{ color: "oklch(75% 0.25 192)" }}
          >
            What I Offer
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
            Services
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            End-to-end development capabilities to bring your ideas to life.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
