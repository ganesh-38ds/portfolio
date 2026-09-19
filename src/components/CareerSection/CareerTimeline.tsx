import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Award, Layers, Users, Globe } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "May – Jun 2026",
      title: "Full Stack Development with Python — Intern",
      subtitle: "Datavalley India Pvt. Ltd. (with APSCHE)",
      description:
        "Built and tested web application components end to end — front-end pages through back-end logic — following team coding standards and review process. Practiced version control and production coding habits in a mentor-guided track.",
      icon: <Briefcase className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2026 · 120 hrs",
      title: "Data Analytics with Tableau — Virtual Intern",
      subtitle: "SmartBridge Educational Services (with APSCHE)",
      description:
        "Completed a state-sponsored virtual internship program building interactive Tableau dashboards for complex data analytics use cases and business intelligence reporting.",
      icon: <Layers className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2026",
      title: "Full Stack Developer Track",
      subtitle: "OneRoadmap Certification",
      description:
        "Comprehensive full-stack engineering modules focusing on end-to-end web architectures, REST API design, and client-server state synchronization.",
      icon: <Globe className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2025 – 2026",
      title: "Python Development Intern",
      subtitle: "CodSoft (4-Week Internship)",
      description:
        "Built modular Python applications, implemented automated algorithmic tasks, and strengthened core software development practices.",
      icon: <Award className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      year: "2025",
      title: "Data Analytics Masterclass",
      subtitle: "NoviTech R&D (30 Days)",
      description:
        "Intensive 30-day program exploring statistical metrics, data wrangling with Pandas/NumPy, and interactive visualization techniques.",
      icon: <Users className="h-4 w-4 mr-2 text-primary" />,
    },
  ];

  return (
    <div id="career">
      <ScrollTimeline
        events={careerEvents}
        title="Career Journey"
        subtitle="An evolving path of leadership, innovation, and impact"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
