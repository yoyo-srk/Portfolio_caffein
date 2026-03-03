import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Github, Layers } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import type { Project } from "../backend.d";
import { Category__1 } from "../backend.d";
import { useGetProjects } from "../hooks/useQueries";

const FALLBACK_PROJECTS: Project[] = [
  {
    title: "AI Chat Application",
    description:
      "A real-time AI chat platform with GPT-4 integration, conversation history, and multi-user support. Built with a focus on low-latency responses.",
    techStack: [
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "OpenAI" },
      { name: "MongoDB" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: Category__1.FullStack,
    imageUrl: "/assets/generated/project-1.dim_800x500.jpg",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A scalable e-commerce solution with Stripe payments, inventory management, analytics dashboard, and a headless CMS for product management.",
    techStack: [
      { name: "React" },
      { name: "Express" },
      { name: "Stripe" },
      { name: "PostgreSQL" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: Category__1.FullStack,
    imageUrl: "/assets/generated/project-2.dim_800x500.jpg",
  },
  {
    title: "Analytics Dashboard",
    description:
      "An interactive data visualization dashboard featuring real-time metrics, custom chart components, and exportable reports for business intelligence.",
    techStack: [{ name: "React" }, { name: "D3.js" }, { name: "TailwindCSS" }],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: Category__1.Frontend,
    imageUrl: "/assets/generated/project-3.dim_800x500.jpg",
  },
  {
    title: "REST API Framework",
    description:
      "A high-performance REST API boilerplate with JWT authentication, rate limiting, input validation, Swagger documentation, and Docker deployment.",
    techStack: [
      { name: "Node.js" },
      { name: "TypeScript" },
      { name: "Redis" },
      { name: "PostgreSQL" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: Category__1.Backend,
    imageUrl: "/assets/generated/project-2.dim_800x500.jpg",
  },
  {
    title: "Mobile Finance App",
    description:
      "A cross-platform mobile app for personal finance tracking, with AI-powered expense categorization, budget forecasting, and multi-currency support.",
    techStack: [
      { name: "React Native" },
      { name: "Expo" },
      { name: "Firebase" },
      { name: "TensorFlow" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: Category__1.Mobile,
    imageUrl: "/assets/generated/project-1.dim_800x500.jpg",
  },
  {
    title: "DevOps Pipeline Dashboard",
    description:
      "A CI/CD monitoring dashboard showing build statuses, deployment history, performance metrics, and cost analysis across multiple cloud providers.",
    techStack: [
      { name: "React" },
      { name: "Node.js" },
      { name: "Docker" },
      { name: "AWS" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: Category__1.Backend,
    imageUrl: "/assets/generated/project-3.dim_800x500.jpg",
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  Frontend: "Frontend",
  Backend: "Backend",
  FullStack: "Full Stack",
  Mobile: "Mobile",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el)
      el.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  const image = project.imageUrl?.startsWith("/")
    ? project.imageUrl
    : "/assets/generated/project-1.dim_800x500.jpg";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 30px oklch(72% 0.24 290 / 0.2), 0 0 60px oklch(65% 0.2 220 / 0.1)";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, oklch(18% 0.015 270))",
          }}
        />
        {/* Category badge */}
        <span
          className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-mono font-medium"
          style={{
            background: "oklch(72% 0.24 290 / 0.2)",
            border: "1px solid oklch(72% 0.24 290 / 0.3)",
            color: "oklch(72% 0.24 290)",
          }}
        >
          {CATEGORY_LABELS[project.category] || project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg mb-2 text-foreground group-hover:gradient-text transition-all">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech.name}
              className="px-2 py-0.5 rounded text-xs font-mono"
              style={{
                background: "oklch(65% 0.2 220 / 0.08)",
                border: "1px solid oklch(65% 0.2 220 / 0.18)",
                color: "oklch(65% 0.2 220)",
              }}
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(72% 0.24 290 / 0.8), oklch(65% 0.2 220 / 0.8))",
                color: "white",
              }}
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 glass"
              style={{
                border: "1px solid oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
            >
              <Github size={13} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { data: backendProjects, isLoading } = useGetProjects();
  const [activeCategory, setActiveCategory] = useState("All");

  const projects =
    backendProjects && backendProjects.length > 0
      ? backendProjects
      : FALLBACK_PROJECTS;

  const categories = ["All", "Frontend", "Backend", "FullStack", "Mobile"];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute -left-32 bottom-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "oklch(72% 0.24 290)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="font-mono text-xs tracking-widest uppercase mb-3 block"
            style={{ color: "oklch(75% 0.25 192)" }}
          >
            My Work
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A selection of projects that showcase my skills across the full
            stack.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                activeCategory === cat
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(72% 0.24 290), oklch(65% 0.2 220))",
                      color: "white",
                      boxShadow: "0 0 16px oklch(72% 0.24 290 / 0.4)",
                    }
                  : {
                      background: "oklch(var(--muted) / 0.5)",
                      color: "oklch(var(--muted-foreground))",
                      border: "1px solid oklch(var(--border))",
                    }
              }
            >
              <Layers size={13} className="inline mr-1.5 -mt-0.5" />
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              <div key={i} className="rounded-2xl overflow-hidden glass p-1">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.title} project={project} index={i} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-3 text-center py-16 text-muted-foreground">
                  No projects in this category yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
