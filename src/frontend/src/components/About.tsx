import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Skill } from "../backend.d";
import { useGetAbout, useGetSkills } from "../hooks/useQueries";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  isVisible: boolean;
}

function StatCard({ value, label, suffix = "+", isVisible }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = duration / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      className="p-6 rounded-xl text-center glass gradient-border"
    >
      <div className="font-display font-bold text-4xl gradient-text mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

const TECH_STACK = [
  { name: "React", color: "oklch(72% 0.24 200)" },
  { name: "Next.js", color: "oklch(70% 0.005 0)" },
  { name: "Node.js", color: "oklch(65% 0.2 150)" },
  { name: "TypeScript", color: "oklch(62% 0.19 240)" },
  { name: "MongoDB", color: "oklch(65% 0.2 150)" },
  { name: "Python", color: "oklch(75% 0.2 100)" },
  { name: "Docker", color: "oklch(60% 0.2 220)" },
  { name: "AWS", color: "oklch(72% 0.22 55)" },
  { name: "PostgreSQL", color: "oklch(60% 0.18 260)" },
  { name: "GraphQL", color: "oklch(70% 0.2 320)" },
];

const SAMPLE_SKILLS: Skill[] = [
  {
    name: "React / Next.js",
    proficiency: BigInt(92),
    category: "Frontend" as unknown as import("../backend.d").Category,
  },
  {
    name: "TypeScript",
    proficiency: BigInt(90),
    category: "Frontend" as unknown as import("../backend.d").Category,
  },
  {
    name: "Node.js",
    proficiency: BigInt(88),
    category: "Backend" as unknown as import("../backend.d").Category,
  },
  {
    name: "Python",
    proficiency: BigInt(80),
    category: "Backend" as unknown as import("../backend.d").Category,
  },
  {
    name: "MongoDB / PostgreSQL",
    proficiency: BigInt(84),
    category: "Backend" as unknown as import("../backend.d").Category,
  },
  {
    name: "Docker / AWS",
    proficiency: BigInt(75),
    category: "DevOps" as unknown as import("../backend.d").Category,
  },
];

export default function About() {
  const { data: about, isLoading: loadingAbout } = useGetAbout();
  const { data: skillsData } = useGetSkills();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const skills =
    skillsData && skillsData.length > 0 ? skillsData : SAMPLE_SKILLS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: about ? Number(about.yearsExperience) : 5,
      label: "Years Experience",
    },
    {
      value: about ? Number(about.projectsCount) : 40,
      label: "Projects Built",
    },
    { value: about ? Number(about.clientsCount) : 20, label: "Happy Clients" },
    { value: 12, label: "Technologies" },
  ];

  const bioText =
    about?.bio ||
    "Full Stack Developer with a passion for building elegant, performant web applications. Experienced in React, Node.js, TypeScript, and cloud infrastructure. I love turning complex problems into simple, beautiful solutions that scale.";

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background blob */}
      <div
        className="absolute -right-32 top-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "oklch(65% 0.2 220)" }}
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
            Who I am
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl gradient-text">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Profile + bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-start gap-8"
          >
            {/* Avatar with animated gradient border */}
            <div className="relative">
              <div
                className="w-52 h-52 rounded-full p-1"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(72% 0.24 290), oklch(65% 0.2 220), oklch(75% 0.25 192))",
                  animation: "spin-slow 8s linear infinite",
                }}
              >
                <div
                  className="w-full h-full rounded-full overflow-hidden"
                  style={{ background: "oklch(var(--card))" }}
                >
                  <img
                    src="/assets/uploads/pic_aai-1.png"
                    alt="Sarfaraj Kashmani"
                    className="w-full h-full object-cover rounded-full"
                    style={{ animation: "none" }}
                  />
                </div>
              </div>
              {/* Glow pulse */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse-glow"
                style={{ background: "oklch(72% 0.24 290)" }}
              />
            </div>

            {/* Bio */}
            {loadingAbout ? (
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed text-base text-center lg:text-left">
                {bioText}
              </p>
            )}

            {/* Tech stack pills */}
            <div className="w-full">
              <p className="font-semibold text-sm mb-4 text-foreground">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <motion.span
                    key={tech.name}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium cursor-default"
                    style={{
                      background: `${tech.color.replace(")", " / 0.1)")}`,
                      border: `1px solid ${tech.color.replace(")", " / 0.25)")}`,
                      color: tech.color,
                    }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Stats + Skills */}
          <div ref={sectionRef} className="space-y-10">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    isVisible={inView}
                  />
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="font-display font-semibold text-lg">
                Core Skills
              </h3>
              {skills.map((skill, i) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground font-mono">
                      {Number(skill.proficiency)}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "oklch(var(--muted))" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          i % 3 === 0
                            ? "linear-gradient(90deg, oklch(72% 0.24 290), oklch(65% 0.2 220))"
                            : i % 3 === 1
                              ? "linear-gradient(90deg, oklch(65% 0.2 220), oklch(75% 0.25 192))"
                              : "linear-gradient(90deg, oklch(75% 0.25 192), oklch(72% 0.24 290))",
                        boxShadow: "0 0 8px oklch(72% 0.24 290 / 0.5)",
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Number(skill.proficiency)}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
