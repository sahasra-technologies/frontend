import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import PlacesSection from "@/components/PlacesSection";
import AchievementsSection from "@/components/AchievementsSection";
import ActionSection from "@/components/ActionSection";
import SportsCategories from "@/components/SportsCategories";
import InteractiveHub from "@/components/InteractiveHub";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <HeroSection />
      {/* <StatsSection /> */}
      <PlacesSection />
      <AchievementsSection />
      <ActionSection />
      <SportsCategories />
      <InteractiveHub />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
