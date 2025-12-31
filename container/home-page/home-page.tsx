import Navbar from "@/components/common/navbar";
import FeaturesSection from "@/components/home-page/sections/features-section";
import FlowChartSection from "@/components/home-page/sections/flow-chart-section";
import FooterSection from "@/components/home-page/sections/footer-section";
import HeroSection from "@/components/home-page/sections/hero-section";
import HowItWorksSection from "@/components/home-page/sections/how-it-works-section";
import ProblemSection from "@/components/home-page/sections/problem-section";
import TargetAudienceSection from "@/components/home-page/sections/target-audience-section";
import ValuePropositionSection from "@/components/home-page/sections/value-proposition-section";

const HomePage = () => {
  return (
    <section>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ValuePropositionSection />
      <HowItWorksSection />
      <FlowChartSection />
      <TargetAudienceSection />
      <FeaturesSection />
      <FooterSection />
    </section>
  );
};

export default HomePage;
