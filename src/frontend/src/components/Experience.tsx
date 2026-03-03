import { Briefcase, Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Experience as ExperienceType } from "../backend.d";
import { useGetExperience } from "../hooks/useQueries";

const FALLBACK_EXPERIENCE: ExperienceType[] = [
  {
    role: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    startDate: BigInt(new Date("2022-01-01").getTime() * 1_000_000),
    endDate: undefined,
    isCurrent: true,
    description:
      "Lead engineer for enterprise SaaS products. Architected microservices with Node.js, React dashboards, and CI/CD pipelines. Reduced API response times by 60% through query optimization and caching strategies.",
  },
  {
    role: "Full Stack Developer",
    company: "Digital Innovations Ltd",
    startDate: BigInt(new Date("2020-06-01").getTime() * 1_000_000),
    endDate: BigInt(new Date("2021-12-31").getTime() * 1_000_000),
    isCurrent: false,
    description:
      "Built scalable e-commerce platforms for 10+ clients. Integrated payment gateways, inventory management systems, and custom reporting tools. Shipped 15+ production features in a fast-paced agile environment.",
  },
  {
    role: "Frontend Developer",
    company: "WebStudio Agency",
    startDate: BigInt(new Date("2019-01-01").getTime() * 1_000_000),
    endDate: BigInt(new Date("2020-05-31").getTime() * 1_000_000),
    isCurrent: false,
    description:
      "Developed responsive web applications and landing pages for diverse industries. Specialized in animation-heavy UIs, performance optimization, and cross-browser compatibility.",
  },
];

function formatDate(ts: bigint | undefined, isCurrent: boolean): string {
  if (isCurrent) return "Present";
  if (!ts) return "Present";
  const ms = Number(ts) / 1_000_000;
  const date = new Date(ms);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

interface TimelineItemProps {
  exp: ExperienceType;
  index: number;
  isRight: boolean;
}

function TimelineItem({ exp, index, isRight }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex w-full ${isRight ? "md:justify-end" : "md:justify-start"} justify-start mb-8`}
    >
      {/* Card */}
      <div
        className="glass rounded-xl p-5 w-full md:w-[46%] relative group"
        style={{
          border: "1px solid oklch(var(--border))",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "oklch(72% 0.24 290 / 0.3)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 24px oklch(72% 0.24 290 / 0.12)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "";
          (e.currentTarget as HTMLElement).style.boxShadow = "";
        }}
      >
        {/* Role + current badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-base text-foreground leading-tight">
            {exp.role}
          </h3>
          {exp.isCurrent && (
            <span
              className="shrink-0 px-2 py-0.5 rounded-full text-xs font-mono flex items-center gap-1"
              style={{
                background: "oklch(65% 0.2 150 / 0.12)",
                border: "1px solid oklch(65% 0.2 150 / 0.3)",
                color: "oklch(65% 0.2 150)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Current
            </span>
          )}
        </div>

        {/* Company */}
        <div
          className="flex items-center gap-2 text-sm mb-1"
          style={{ color: "oklch(65% 0.2 220)" }}
        >
          <Briefcase size={13} />
          <span className="font-medium">{exp.company}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar size={12} />
          <span>
            {formatDate(exp.startDate, false)} —{" "}
            {formatDate(exp.endDate, exp.isCurrent)}
          </span>
          <span className="hidden sm:flex items-center gap-1 ml-2">
            <MapPin size={12} />
            Remote
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {exp.description}
        </p>
      </div>

      {/* Timeline dot — desktop */}
      <div className="hidden md:flex absolute left-1/2 top-5 -translate-x-1/2 z-10 items-center justify-center">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, oklch(72% 0.24 290), oklch(75% 0.25 192))",
            boxShadow: "0 0 10px oklch(72% 0.24 290 / 0.6)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { data: backendExp } = useGetExperience();
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  const experiences =
    backendExp && backendExp.length > 0 ? backendExp : FALLBACK_EXPERIENCE;

  // Animate timeline line on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const el = containerRef.current;
          if (el) setLineHeight(el.scrollHeight);
        }
      },
      { threshold: 0.1 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute right-0 top-1/2 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{ background: "oklch(75% 0.25 192)" }}
      />

      <div className="max-w-5xl mx-auto">
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
            Career Path
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl gradient-text">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px overflow-hidden"
            style={{ height: "100%" }}
          >
            <div
              ref={lineRef}
              className="w-full ease-out"
              style={{
                transition: "height 2s ease-out",
                height: lineHeight > 0 ? "100%" : "0%",
                background:
                  "linear-gradient(to bottom, oklch(72% 0.24 290), oklch(65% 0.2 220), oklch(75% 0.25 192))",
              }}
            />
          </div>

          {/* Items */}
          {experiences.map((exp, i) => (
            <TimelineItem
              key={`${exp.role}-${exp.company}`}
              exp={exp}
              index={i}
              isRight={i % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
