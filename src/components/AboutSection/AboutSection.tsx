import { motion } from "framer-motion";
import { Code2, Globe2, Layout, Users } from "lucide-react";

const stats = [
  { icon: <Code2 className="w-6 h-6" />, label: "Shipped Projects", value: "8" },
  { icon: <Users className="w-6 h-6" />, label: "APSCHE Internships", value: "2+" },
  { icon: <Layout className="w-6 h-6" />, label: "B.Tech CGPA", value: "7.31" },
  { icon: <Globe2 className="w-6 h-6" />, label: "Certifications", value: "16+" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        className="flex flex-col md:flex-row gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Passionate about <span className="text-gradient-primary">Data &amp; AI Engineering</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Third-year Computer Science &amp; Engineering (Data Science) undergraduate who has shipped eight independent projects spanning retrieval-augmented generation, applied machine learning, BI dashboards, and full-stack web applications — including a live-deployed sales analytics platform. Completed a Full-Stack Development internship at Datavalley and a Data Analytics internship with SmartBridge, both under APSCHE.
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-panel p-6 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-colors group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              <div className="text-primary mb-4 p-3 bg-primary/10 w-max rounded-xl">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

