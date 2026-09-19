import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Sparkles,
  Calendar,
  Building2,
  Brain,
  BarChart3,
  Database,
  Code2,
  Layers,
  Cpu,
} from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: "ai-ml" | "nptel" | "analytics" | "tracks";
  categoryLabel: string;
  year: string;
  badge: string;
  badgeColor: string;
  description: string;
  skills: string[];
  icon: typeof Award;
}

const certificationsData: Certification[] = [
  // IBM SkillsBuild
  {
    id: "ibm-ai",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    category: "ai-ml",
    categoryLabel: "AI & ML",
    year: "2025",
    badge: "IBM Credential",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    description: "Foundational principles of artificial intelligence, neural networks, machine learning pipelines, and ethics in AI.",
    skills: ["AI Foundations", "Machine Learning", "AI Ethics"],
    icon: Brain,
  },
  {
    id: "ibm-data-analysis",
    title: "Data Analysis with Python",
    issuer: "IBM SkillsBuild",
    category: "ai-ml",
    categoryLabel: "Data Science",
    year: "2026",
    badge: "DA0101EN Verified",
    badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    description: "End-to-end data manipulation, statistical modeling, exploratory data analysis, and predictive model fitting using Pandas & NumPy.",
    skills: ["Python", "Pandas", "NumPy", "EDA"],
    icon: BarChart3,
  },
  {
    id: "ibm-python-101",
    title: "Python 101 for Data Science",
    issuer: "IBM SkillsBuild",
    category: "ai-ml",
    categoryLabel: "Programming",
    year: "2026",
    badge: "IBM Credential",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    description: "Core programming paradigms, object-oriented concepts, functional operations, and data structures tailored for data engineering.",
    skills: ["Python 3", "Data Structures", "OOP"],
    icon: Code2,
  },

  // Cisco Networking Academy
  {
    id: "cisco-ds-essentials",
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    category: "ai-ml",
    categoryLabel: "Data Science",
    year: "2026",
    badge: "Cisco Verified",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    description: "Statistical reasoning, hypothesis testing, predictive modeling essentials, and real-world data science project workflows.",
    skills: ["Data Science", "Python", "Predictive Modeling"],
    icon: Cpu,
  },
  {
    id: "cisco-intro-ds",
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    category: "ai-ml",
    categoryLabel: "Data Science",
    year: "2026",
    badge: "Cisco Verified",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    description: "Comprehensive overview of data collection methods, data hygiene, exploratory analytics, and big data technology ecosystems.",
    skills: ["Data Hygiene", "Analytics", "Big Data Concepts"],
    icon: Database,
  },

  // NPTEL Elite (IIT)
  {
    id: "nptel-industry-40",
    title: "Industry 4.0 & Industrial IoT",
    issuer: "NPTEL Elite (IIT Kharagpur)",
    category: "nptel",
    categoryLabel: "IIT Elite",
    year: "2024",
    badge: "Elite — 72% Score",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    description: "National-level elite accreditation covering cyber-physical systems, smart automation, industrial IoT communication protocols, and edge data processing.",
    skills: ["Industrial IoT", "Industry 4.0", "Edge Computing"],
    icon: Sparkles,
  },
  {
    id: "nptel-air-pollution",
    title: "Air Pollution and Control",
    issuer: "NPTEL Elite (IIT Madras)",
    category: "nptel",
    categoryLabel: "IIT Elite",
    year: "2024",
    badge: "Elite — 67% Score",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    description: "National-level elite accreditation analyzing particulate emission modeling, environmental sensor analytics, and standard regulatory compliance.",
    skills: ["Environmental Data", "Dispersion Modeling", "Standards"],
    icon: Award,
  },

  // Analytics & BI Tools
  {
    id: "udemy-full-analytics",
    title: "Python + SQL + Tableau for Data Science",
    issuer: "Udemy",
    category: "analytics",
    categoryLabel: "BI & Analytics",
    year: "2025",
    badge: "Full-Stack Analytics",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    description: "Integrated business intelligence curriculum spanning relational database querying with SQL, exploratory Python scripting, and executive dashboards in Tableau.",
    skills: ["SQL", "Tableau", "Python", "BI Dashboards"],
    icon: BarChart3,
  },
  {
    id: "simplilearn-powerbi",
    title: "Power BI for Beginners",
    issuer: "Simplilearn SkillUp",
    category: "analytics",
    categoryLabel: "BI Tools",
    year: "2025",
    badge: "BI Specialist",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    description: "Relational data modeling, DAX measures and calculated columns, dynamic interactive filtering, and business scorecard reporting.",
    skills: ["Power BI", "DAX", "Data Modeling"],
    icon: Database,
  },
  {
    id: "simplilearn-analytics-excel",
    title: "Business Analytics with Excel",
    issuer: "Simplilearn SkillUp",
    category: "analytics",
    categoryLabel: "Spreadsheet BI",
    year: "2025",
    badge: "Business Analytics",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    description: "Advanced PivotTables, conditional formulas, trend analysis, XLOOKUP/VLOOKUP functions, and executive business summary graphics.",
    skills: ["Advanced Excel", "PivotTables", "Data Summarization"],
    icon: Layers,
  },
  {
    id: "simplilearn-intro-excel",
    title: "Introduction to MS Excel",
    issuer: "Simplilearn SkillUp",
    category: "analytics",
    categoryLabel: "Foundations",
    year: "2025",
    badge: "Core Tools",
    badgeColor: "text-teal-400 bg-teal-500/10 border-teal-500/30",
    description: "Spreadsheet fundamentals, data entry integrity, automated formulas, tabular structures, and data clean-up routines.",
    skills: ["Spreadsheets", "Data Hygiene", "Formulas"],
    icon: Layers,
  },

  // Professional Tracks & Workshops
  {
    id: "oneroadmap-fullstack",
    title: "Full Stack Developer Track",
    issuer: "OneRoadmap",
    category: "tracks",
    categoryLabel: "Development",
    year: "2026",
    badge: "Full-Stack Track",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30",
    description: "Comprehensive full-stack engineering track covering modern responsive frontends, backend REST architectures, and database persistence.",
    skills: ["Web Dev", "REST APIs", "Full-Stack"],
    icon: Code2,
  },
  {
    id: "codsoft-python",
    title: "Python Development Internship",
    issuer: "CodSoft",
    category: "tracks",
    categoryLabel: "Internship Track",
    year: "2025",
    badge: "4-Week Intensive",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    description: "Completed real-world software engineering assignments delivering modular Python desktop automation, OOP applications, and version-controlled repos.",
    skills: ["Python", "Automation", "OOP", "Git"],
    icon: Code2,
  },
  {
    id: "novitech-analytics",
    title: "Data Analytics Intensive",
    issuer: "NoviTech R&D",
    category: "tracks",
    categoryLabel: "Internship Track",
    year: "2025",
    badge: "30-Day Program",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    description: "Industry-guided data analytics internship performing exploratory analysis, statistical data verification, and reporting dashboard development.",
    skills: ["Data Analytics", "Statistical Analysis", "Reporting"],
    icon: BarChart3,
  },
  {
    id: "workshop-ai-trinity",
    title: "AI Trinity: ML, DL & Real-Time Modeling",
    issuer: "Swarnandhra & Purple Tech",
    category: "tracks",
    categoryLabel: "Workshop",
    year: "2025",
    badge: "Technical Summit",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    description: "Hands-on engineering workshop diving into practical machine learning pipelines, deep learning neural networks, and real-time computer vision.",
    skills: ["Machine Learning", "Deep Learning", "Real-Time AI"],
    icon: Cpu,
  },
  {
    id: "workshop-guvi-yuva",
    title: "YUVA AI for ALL",
    issuer: "GUVI — HCL Tech",
    category: "tracks",
    categoryLabel: "Workshop",
    year: "2025",
    badge: "National Initiative",
    badgeColor: "text-pink-400 bg-pink-500/10 border-pink-500/30",
    description: "National artificial intelligence initiative exploring modern generative AI tools, prompt engineering, ethics, and neural network foundations.",
    skills: ["Generative AI", "Prompt Engineering", "AI Ethics"],
    icon: Sparkles,
  },
];

const categories = [
  { id: "all", label: "All Credentials", count: 16 },
  { id: "ai-ml", label: "AI & Data Science", count: 5 },
  { id: "nptel", label: "NPTEL Elite (IIT)", count: 2 },
  { id: "analytics", label: "BI & Analytics", count: 4 },
  { id: "tracks", label: "Tracks & Workshops", count: 5 },
];

export const CertificationsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCerts =
    activeCategory === "all"
      ? certificationsData
      : certificationsData.filter((c) => c.category === activeCategory);

  return (
    <div id="certifications" className="scroll-mt-24 space-y-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Certifications & <span className="text-gradient-primary">Accreditations</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Verified industry credentials from IBM, Cisco, and Elite NPTEL (IIT), alongside specialized technical programs in AI, Data Science, and Full-Stack engineering.
          </p>
        </div>

        {/* Quick Highlights Counter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> 16 Verified Credentials
          </span>
          <span className="px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
            <Award className="w-3.5 h-3.5" /> 2 Elite IIT (NPTEL)
          </span>
          <span className="px-3.5 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> 3 IBM SkillsBuild
          </span>
        </div>
      </motion.div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 pt-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-[1.02]"
                  : "bg-card/70 text-muted-foreground hover:text-foreground border-border/80 hover:border-primary/40 hover:bg-card"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isActive
                    ? "bg-background/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Certifications Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <MagicCard
                  className="h-full p-6 rounded-[2rem] border border-border/80 bg-card/85 shadow-lg flex flex-col justify-between gap-5 group hover:border-primary/50"
                  gradientSize={260}
                  gradientColor="rgba(139, 92, 246, 0.14)"
                  gradientFrom="#8b5cf6"
                  gradientTo="#38bdf8"
                >
                  <div className="space-y-4">
                    {/* Header: Icon & Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-primary/20 transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full border text-[11px] font-extrabold flex items-center gap-1 shadow-sm whitespace-nowrap ${cert.badgeColor}`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {cert.badge}
                      </span>
                    </div>

                    {/* Title & Issuer Info */}
                    <div>
                      <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground mt-2">
                        <span className="flex items-center gap-1.5 text-foreground/90 font-bold">
                          <Building2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          {cert.issuer}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-primary font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {cert.year}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  {/* Footer: Skills Tags & Verification Badge */}
                  <div className="space-y-3 pt-3 border-t border-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-foreground/5 border border-foreground/10 text-[11px] font-medium text-foreground/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                      <span className="flex items-center gap-1 font-semibold text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Completion
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full border border-border/50">
                        {cert.categoryLabel}
                      </span>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CertificationsSection;
