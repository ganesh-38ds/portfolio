import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Brain,
  Server,
  BarChart3,
  Database,
  Cpu,
  Terminal,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";

interface SkillGroup {
  id: string;
  category: string;
  filterTag: "ai" | "backend" | "bi" | "core" | "tools";
  icon: typeof Code2;
  color: string;
  badgeBg: string;
  borderColor: string;
  skills: { name: string; level: string; isPrimary?: boolean }[];
  description: string;
}

const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    category: "Programming Languages",
    filterTag: "core",
    icon: Code2,
    color: "text-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    borderColor: "border-blue-500/20",
    description: "Core programming languages utilized for AI development, database querying, and application logic.",
    skills: [
      { name: "Python", level: "Expert", isPrimary: true },
      { name: "SQL", level: "Advanced", isPrimary: true },
      { name: "Java", level: "Intermediate" },
      { name: "C", level: "Foundational" },
    ],
  },
  {
    id: "ai-ml",
    category: "AI & Machine Learning",
    filterTag: "ai",
    icon: Brain,
    color: "text-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    borderColor: "border-purple-500/20",
    description: "Architectures for dense semantic retrieval, predictive model fitting, and LLM orchestration.",
    skills: [
      { name: "RAG Architectures", level: "Advanced", isPrimary: true },
      { name: "ChromaDB", level: "Advanced", isPrimary: true },
      { name: "Scikit-learn", level: "Advanced", isPrimary: true },
      { name: "Pandas", level: "Expert", isPrimary: true },
      { name: "NumPy", level: "Advanced" },
      { name: "LLM APIs (Groq, Gemini)", level: "Advanced", isPrimary: true },
    ],
  },
  {
    id: "backend",
    category: "Web & Backend Systems",
    filterTag: "backend",
    icon: Server,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    borderColor: "border-emerald-500/20",
    description: "Production-ready RESTful APIs, authentication modules, and modular backend services.",
    skills: [
      { name: "FastAPI", level: "Advanced", isPrimary: true },
      { name: "Flask", level: "Advanced", isPrimary: true },
      { name: "SQLAlchemy ORM", level: "Advanced" },
      { name: "Flask-Login", level: "Intermediate" },
      { name: "HTML5 / CSS3", level: "Proficient" },
      { name: "JavaScript", level: "Proficient" },
    ],
  },
  {
    id: "bi-analytics",
    category: "Data Visualization & BI",
    filterTag: "bi",
    icon: BarChart3,
    color: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    borderColor: "border-amber-500/20",
    description: "Interactive executive scorecards, dynamic multi-dimensional slicers, and storytelling charts.",
    skills: [
      { name: "Power BI", level: "Advanced", isPrimary: true },
      { name: "Tableau", level: "Advanced", isPrimary: true },
      { name: "Plotly", level: "Advanced" },
      { name: "Matplotlib & Seaborn", level: "Advanced" },
      { name: "Excel Analytics", level: "Proficient" },
    ],
  },
  {
    id: "databases",
    category: "Databases & Storage",
    filterTag: "backend",
    icon: Database,
    color: "text-cyan-400",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    borderColor: "border-cyan-500/20",
    description: "Relational persistence, vector embeddings storage, schema migration, and ACID compliance.",
    skills: [
      { name: "MySQL", level: "Advanced", isPrimary: true },
      { name: "SQLite", level: "Advanced", isPrimary: true },
      { name: "PostgreSQL-ready Design", level: "Advanced" },
      { name: "Vector Databases", level: "Advanced" },
    ],
  },
  {
    id: "core-cs",
    category: "Core Computer Science",
    filterTag: "core",
    icon: Cpu,
    color: "text-rose-400",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    borderColor: "border-rose-500/20",
    description: "Fundamental engineering principles ensuring algorithmic efficiency, system reliability, and modular code.",
    skills: [
      { name: "Data Structures & Algorithms (DSA)", level: "Advanced", isPrimary: true },
      { name: "Object-Oriented Programming (OOP)", level: "Expert", isPrimary: true },
      { name: "DBMS", level: "Advanced" },
      { name: "Operating Systems", level: "Proficient" },
      { name: "Computer Networks", level: "Proficient" },
    ],
  },
  {
    id: "tools",
    category: "Tools & DevOps Workflow",
    filterTag: "tools",
    icon: Terminal,
    color: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    borderColor: "border-sky-500/20",
    description: "Modern developer environment, containerization, reproducible environments, and version control.",
    skills: [
      { name: "Docker", level: "Advanced", isPrimary: true },
      { name: "Git & GitHub", level: "Expert", isPrimary: true },
      { name: "Streamlit", level: "Advanced", isPrimary: true },
      { name: "VS Code", level: "Expert" },
      { name: "Jupyter Notebook", level: "Expert" },
    ],
  },
];

const proficiencyGauges = [
  { name: "Python & Data Science (Pandas, NumPy)", level: 95, color: "from-blue-500 to-cyan-400" },
  { name: "RAG & Vector Retrieval (ChromaDB, LLMs)", level: 92, color: "from-purple-500 to-indigo-400" },
  { name: "Machine Learning Pipelines (Scikit-learn)", level: 90, color: "from-cyan-500 to-teal-400" },
  { name: "Backend REST Services (FastAPI, Flask)", level: 88, color: "from-emerald-500 to-teal-400" },
  { name: "Business Intelligence & Dashboards (Power BI, Tableau)", level: 92, color: "from-amber-500 to-orange-400" },
  { name: "Containerization & Version Control (Docker, Git)", level: 86, color: "from-sky-500 to-blue-400" },
];

const categoryFilters = [
  { id: "all", label: "All Skills" },
  { id: "ai", label: "AI & Machine Learning" },
  { id: "backend", label: "Backend & Databases" },
  { id: "bi", label: "BI & Data Analytics" },
  { id: "core", label: "Languages & Core CS" },
  { id: "tools", label: "Tools & DevOps" },
];

export default function ProfessionalProfile() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredGroups =
    activeFilter === "all"
      ? skillGroups
      : skillGroups.filter((g) => g.filterTag === activeFilter);

  return (
    <motion.section
      id="skills"
      className="space-y-12 scroll-mt-24"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-md">
              <Code2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Technical <span className="text-gradient-primary">Arsenal & Skills</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A comprehensive overview of frameworks, data pipelines, database architectures, and engineering tools mastered through hands-on project delivery.
          </p>
        </div>

        {/* Highlight counter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> 7 Skill Domains
          </span>
          <span className="px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> 35+ Technologies
          </span>
        </div>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categoryFilters.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-[1.02]"
                  : "bg-card/70 text-muted-foreground hover:text-foreground border-border/80 hover:border-primary/40 hover:bg-card"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Skill Categories Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredGroups.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <MagicCard
                  className="h-full p-6 rounded-[2rem] border border-border/80 bg-card/85 shadow-lg flex flex-col justify-between gap-5 group hover:border-primary/50"
                  gradientSize={260}
                  gradientColor="rgba(139, 92, 246, 0.12)"
                  gradientFrom="#8b5cf6"
                  gradientTo="#38bdf8"
                >
                  <div className="space-y-4">
                    {/* Header: Icon, Category Name & Skill Count Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-primary/20 transition-all duration-300">
                          <Icon className={`w-6 h-6 ${group.color}`} />
                        </div>
                        <h3 className="text-lg font-extrabold text-foreground tracking-tight">
                          {group.category}
                        </h3>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${group.badgeBg}`}>
                        {group.skills.length} skills
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {group.description}
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {group.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 border ${
                            skill.isPrimary
                              ? "bg-primary/15 border-primary/30 text-foreground font-bold shadow-sm hover:scale-105"
                              : "bg-foreground/5 border-foreground/10 text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                          }`}
                        >
                          {skill.isPrimary && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          )}
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Production Tested
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full border border-border/50">
                      Verified
                    </span>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Core Proficiency Metrics */}
      <div className="glass-panel p-8 rounded-[2.25rem] border border-foreground/15 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-primary" /> Key Domain Proficiencies
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Relative proficiency metrics evaluated across 8 independent applications and 2 APSCHE internships.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full w-max">
            Benchmark 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {proficiencyGauges.map((gauge, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-foreground font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {gauge.name}
                </span>
                <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                  {gauge.level}%
                </span>
              </div>
              <div className="h-2.5 w-full bg-muted/70 rounded-full overflow-hidden border border-border/40 p-[1px]">
                <motion.div
                  className={`h-full bg-gradient-to-r ${gauge.color} rounded-full relative shadow-[0_0_12px_rgba(139,92,246,0.4)]`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${gauge.level}%` }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.1 + idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
