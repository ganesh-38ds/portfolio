import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink, CheckCircle2, Sparkles, Layers } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  link: string;
  image: string;
  tags: string[];
  bulletPoints: string[];
  gridClass: string;
}

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Mikey AI — Multilingual Voice & Vision Assistant",
      subtitle: "Real-time multilingual voice and vision conversational assistant with continuous talk mode, live web search, and document intelligence.",
      link: "https://github.com/ganesh-38ds",
      image: "/projects/shadowcall-ai.jpg",
      tags: ["FastAPI", "Groq API", "Google Gemini", "Edge-TTS", "Web Speech API", "SQLite / PostgreSQL"],
      bulletPoints: [
        "Built a continuous hands-free voice assistant using Web Speech API, low-latency Groq/Gemini models, and Edge-TTS with seamless English and Telugu voice switching.",
        "Integrated multimodal image analysis, live news & weather feeds, document Q&A (PDF/DOCX), and reminders on a dual-engine backend (SQLite & PostgreSQL)."
      ],
      gridClass: "md:col-span-7 h-[420px]",
    },
    {
      id: 2,
      title: "AI-Powered Autonomous Data Analyst",
      subtitle: "Automated dataset cleaning, anomaly detection, natural-language SQL queries, and executive summary generation",
      link: "https://github.com/ganesh-38ds",
      image: "/projects/autonomous-analyst.jpg",
      tags: ["Python", "Streamlit", "Groq API", "Llama 3", "Plotly", "Pandas"],
      bulletPoints: [
        "Automated data cleaning and anomaly detection for raw uploaded datasets, with no manual preprocessing required.",
        "Built a 'chat with your data' natural-language query engine and one-click executive summary generation."
      ],
      gridClass: "md:col-span-5 h-[420px]",
    },
    {
      id: 3,
      title: "Sales Trends & Insights Web App",
      subtitle: "Cloud-hosted multi-year sales analytics visualizing revenue trends, profit margins, and segment health",
      link: "https://sales-qirs.onrender.com/",
      image: "/projects/sales-trends.png",
      tags: ["Python", "Flask", "Power BI", "Plotly", "Render"],
      bulletPoints: [
        "Deployed a production sales analytics platform visualizing multi-year revenue, profit margin, and customer segment trends, hosted live on Render."
      ],
      gridClass: "md:col-span-4 h-[380px]",
    },
    {
      id: 4,
      title: "Kaaram-Kada E-Commerce Store",
      subtitle: "Full-stack food & snack e-commerce platform with cart checkout, authentication, and inventory administration",
      link: "https://github.com/ganesh-38ds",
      image: "/projects/kaaram-kada.jpg",
      tags: ["Python", "Flask", "SQLite", "SQLAlchemy", "Flask-Login"],
      bulletPoints: [
        "Built a complete food/snack e-commerce store with cart checkout, user authentication, inventory tracking, and an admin portal for products and orders."
      ],
      gridClass: "md:col-span-4 h-[380px]",
    },
    {
      id: 5,
      title: "Expense Tracker Pro",
      subtitle: "Personal finance web application for transaction categorization, budget thresholds, and cash-flow health",
      link: "https://github.com/ganesh-38ds/expense-tracker",
      image: "/projects/expense-tracker.jpg",
      tags: ["Python", "Flask", "SQLite", "SQLAlchemy", "Chart.js"],
      bulletPoints: [
        "Built a personal finance web app to track income/expenses, categorize transactions, and visualize monthly budgeting health with Chart.js."
      ],
      gridClass: "md:col-span-4 h-[380px]",
    },
  ];

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center md:text-left">
          Selected <span className="text-gradient-primary">Works</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-lg">
          A showcase of complex AI systems, analytics dashboards, and scalable applications I've engineered.
        </p>
      </motion.div>

      {/* 12-Column Full-Width Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`group relative overflow-hidden rounded-[2.25rem] block shadow-xl border border-foreground/10 cursor-pointer ${project.gridClass}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 bg-neutral-950">
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 transform-gpu"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
              <div className="flex items-end justify-between gap-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 transform-gpu">
                <div className="z-10 max-w-lg">
                  {/* Tech Tags Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] md:text-[11px] font-semibold text-white/90 shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-[10px] text-white/70 font-medium border border-white/10">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1.5 tracking-tight drop-shadow-md leading-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Subtitle / Short Description */}
                  <p className="text-xs md:text-sm font-medium text-white/80 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>
                
                {/* Arrow Action Icon Button */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 group-hover:bg-white group-hover:text-black transition-all duration-300 rotate-45 group-hover:rotate-0 z-10 shadow-lg"
                  title="Open Project Link"
                >
                  <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.25rem] border border-white/20 bg-[#0e0f15] text-white backdrop-blur-2xl shadow-2xl p-6 md:p-8 z-10 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-20 border border-white/15"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Banner Image */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/15 bg-neutral-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/25 text-xs font-bold text-white flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Featured Project
                  </span>
                </div>
              </div>

              {/* Title & Short Description */}
              <div className="space-y-2.5">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {selectedProject.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Bullet Points */}
              {selectedProject.bulletPoints && selectedProject.bulletPoints.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" /> Key Engineering Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.bulletPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3.5 text-sm leading-relaxed p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-zinc-100 font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Tags */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-xs font-semibold text-purple-300 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-primary to-sky-500 hover:from-purple-500 hover:to-sky-400 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Explore Repository / Demo</span>
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-2xl border border-white/20 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
