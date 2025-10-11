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
import Achievements from "../components/Achievements";
import Carousel3d from "../components/Carousel3d";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <HeroSection />
      {/* <StatsSection /> */}
      <Achievements />
      {/* <Carousel3d /> */}
      <ActionSection />
      {/* <AchievementsSection /> */}
      <PlacesSection  />
      {/* <SportsCategories /> */}
      <InteractiveHub />
      {/* <CTASection /> */}
      <Footer />
    </div>
  );
};

export default Index;
