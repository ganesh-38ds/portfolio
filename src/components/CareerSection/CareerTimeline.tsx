import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Layers } from "lucide-react";

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
