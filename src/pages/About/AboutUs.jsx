import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
// import HeroSection from "@/components/HeroSection";
import AboutHeroSection from "@/components/AboutHeroSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
import AudienceSection from "@/components/AudienceSection";
import FeaturesSection from "@/components/FeaturesSection";
import MissionSection from "@/components/MissionSection";
import CTASection from "@/components/CTASection";
import AboutCTASection from "@/components/AboutCTASection";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const [counters, setCounters] = useState({
    matches: 0,
    players: 0,
    communities: 0,
  });

  const observerRef = useRef();
  const sectionsRef = useRef([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1 },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (isVisible.hero) {
      const animateCounter = (target, key, duration = 2000) => {
        const start = Date.now();
        const startValue = 0;

        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(
            startValue + (target - startValue) * progress,
          );

          setCounters((prev) => ({
            ...prev,
            [key]: current,
          }));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      };

      setTimeout(() => {
        animateCounter(10000, "matches", 2000);
        animateCounter(25000, "players", 2500);
        animateCounter(50, "communities", 1500);
      }, 500);
    }
  }, [isVisible.hero]);

  const addToRefs = (el, index) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  const problemItems = [
    { emoji: "💬", text: "Endless Coordination", delay: "0ms" },
    { emoji: "📞", text: "Cold Calls", delay: "100ms" },
    { emoji: "⏳", text: "Wasted Time", delay: "200ms" },
    { emoji: "😞", text: "Weekend Blues", delay: "300ms" },
  ];

  const audienceCards = [
    {
      emoji: "👨‍💼",
      title: "Working Professionals",
      description: "Craving the rush of a Sunday showdown",
      bgColor: "bg-playdate-card-blue-light",
      delay: "0ms",
    },
    {
      emoji: "🎯",
      title: "College Players",
      description: "Hungry to prove yourself in competition",
      bgColor: "bg-playdate-card-blue-lighter",
      delay: "200ms",
    },
    {
      emoji: "⭐",
      title: "First-time Athletes",
      description: "Looking for your tribe and community",
      bgColor: "bg-playdate-card-orange-light",
      delay: "400ms",
    },
  ];

  const features = [
    { emoji: "🎮", text: "Playmate Matchmaking" },
    { emoji: "📊", text: "Rivalry Tracking" },
    { emoji: "⚡", text: "Instant Booking & Updates" },
    { emoji: "📷", text: "Media Coverage & Leaderboards" },
    { emoji: "🌐", text: "All-Age Friendly" },
  ];

  const noMoreStatements = [
    "No more turf politics.",
    "No more flaky teams.",
    'No more ghosting after saying "let\'s play soon."',
    "Just real games, real rivalries, and real glory.",
  ];

  return (
    <div className="py-lg px-lg p-4">
        <Header />
        <div className="max-w-6xl mx-auto">
            <AboutHeroSection />
            <ProblemSolutionSection 
                isVisible={isVisible} 
                addToRefs={addToRefs} 
                problemItems={problemItems} 
                activeFeature={activeFeature} 
                setActiveFeature={setActiveFeature} 
                hoveredCard={hoveredCard} 
                setHoveredCard={setHoveredCard}
            />
            <AudienceSection
            isVisible={isVisible.audience}
                audienceCards={audienceCards}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                noMoreStatements={noMoreStatements}
                sectionRef={(el) => sectionsRef.current[2] = el}
            />
            <FeaturesSection
                isVisible={isVisible.features}
                features={features}
                activeFeature={activeFeature}
                setActiveFeature={setActiveFeature}
                sectionRef={(el) => sectionsRef.current[3] = el}
            />
            <MissionSection isVisible={isVisible.mission} sectionRef={(el) => sectionsRef.current[4] = el} />
            <AboutCTASection isVisible={isVisible.cta} sectionRef={(el) => sectionsRef.current[5] = el} />
            {/* <CTASection /> */}
            </div>
        
        
        {/* <Footer /> */}
    </div>
  );
};

export default AboutUs;