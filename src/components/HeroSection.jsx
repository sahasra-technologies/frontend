import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useState, useRef } from "react";
import {
  AnimatedSection,
  InteractiveCard,
  MagneticButton,
  FloatingElement,
  ParticleBackground,
} from "./AnimationWrapper";

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const floatingIcons = [
    {
      icon: "🏀",
      className: "top-20 right-10 text-5xl",
      delay: 0,
      amplitude: 25,
      duration: 4,
    },
    {
      icon: "⚽",
      className: "top-40 right-32 text-4xl",
      delay: 1,
      amplitude: 20,
      duration: 3.5,
    },
    {
      icon: "🏸",
      className: "top-60 left-10 text-4xl",
      delay: 2,
      amplitude: 30,
      duration: 3,
    },
    {
      icon: "🎾",
      className: "top-32 left-32 text-3xl",
      delay: 0.5,
      amplitude: 15,
      duration: 4.5,
    },
    {
      icon: "🏐",
      className: "bottom-40 right-20 text-4xl",
      delay: 1.5,
      amplitude: 25,
      duration: 3.8,
    },
    {
      icon: "🏓",
      className: "bottom-60 left-20 text-3xl",
      delay: 2.5,
      amplitude: 20,
      duration: 4.2,
    },
  ];

  const searchSuggestions = [
    "🏀 Basketball courts near me",
    "⚽ Football teams looking for players",
    "🎾 Tennis coaching sessions",
    "🏸 Badminton tournaments this week",
    "🏊‍♂️ Swimming pools with coaching",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ y, opacity }}
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden pt-20"
    >
      {/* Enhanced particle background */}
      <ParticleBackground count={30} />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-sports-blue/20 to-sports-purple/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-sports-orange/20 to-sports-red/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      /> */}

      {/* Floating sports icons with enhanced animations */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: item.delay + 1,
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className={`absolute hidden lg:block ${item.className} cursor-pointer`}
          whileHover={{
            scale: 1.3,
            rotate: [0, -10, 10, 0],
            zIndex: 10,
          }}
        >
          <FloatingElement
            amplitude={item.amplitude}
            duration={item.duration}
            delay={item.delay}
          >
            <motion.div
              whileHover={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                background: "rgba(255,255,255,0.9)",
              }}
              className="p-2 rounded-full backdrop-blur-sm"
            >
              {item.icon}
            </motion.div>
          </FloatingElement>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left content with enhanced animations */}
          <AnimatedSection direction="left" className="space-y-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  FIND YOUR
                  <br />
                  <motion.span
                    className="bg-sport-blue bg-clip-text text-transparent bg-size-200 bg-pos-0"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    SPORTS BUDDY!
                  </motion.span>
                  <motion.span
                    className="text-4xl ml-4"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    🏃‍♂️
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.p
                className="text-xl text-gray-600 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Whether you're a weekend warrior or aspiring champion, discover
                awesome venues, meet like-minded athletes, and experience the
                thrill of competitive sports like never before!
                <motion.span
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 2 }}
                >
                  ✨
                </motion.span>
              </motion.p>
            </div>

            {/* Enhanced Search bar */}
            {/* Search suggestions */}
            {/* <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <motion.form
                onSubmit={handleSearchSubmit}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/50"
                animate={
                  isSearchFocused
                    ? {
                        scale: 1.02,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                      }
                    : {}
                }
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="What sport are you interested in today?"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="h-14 text-lg border-0 focus:ring-2 focus:ring-sports-blue bg-gray-50/50 rounded-2xl pl-12"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <motion.div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-sports-purple" />
                    </motion.div>
                  </div>
                  <MagneticButton
                    type="submit"
                    className="bg-sports-blue hover:bg-sports-blue-dark text-white h-14 px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Let's Go!
                    <Zap className="w-4 h-4 ml-2" />
                  </MagneticButton>
                </div>

                
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-2"
                  >
                    {searchSuggestions.slice(0, 3).map((suggestion, index) => (
                      <motion.button
                        key={suggestion}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="block w-full text-left text-sm text-gray-600 hover:text-sports-blue hover:bg-gray-50 p-2 rounded-lg transition-all"
                        onClick={() =>
                          setSearchValue(
                            suggestion.split(" ").slice(1).join(" "),
                          )
                        }
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </motion.form>
            </motion.div> */}

            {/* Enhanced Action buttons */}
            {/* <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton className="bg-black text-white hover:bg-gray-800 border-black px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Find Players Now
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </MagneticButton>

              <InteractiveCard>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:border-sports-blue hover:text-sports-blue px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Browse Venues
                </Button>
              </InteractiveCard>
            </motion.div> */}
          </AnimatedSection>

          {/* Right content section with floating elements */}
          <AnimatedSection
            direction="right"
            delay={0.3}
            className="relative h-full flex items-center justify-center"
          >
            {/* Floating sports icons positioned like in reference */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.8, type: "spring" }}
              className="absolute top-20 left-16 text-3xl cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 15 }}
            >
              <FloatingElement amplitude={20} duration={3.5}>
                🎾
              </FloatingElement>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1, type: "spring" }}
              className="absolute top-8 right-8 text-4xl cursor-pointer"
              whileHover={{ scale: 1.2, rotate: -15 }}
            >
              <FloatingElement amplitude={25} duration={4} delay={1}>
                🏀
              </FloatingElement>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.2, type: "spring" }}
              className="absolute bottom-32 right-16 text-3xl cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 15 }}
            >
              <FloatingElement amplitude={20} duration={3} delay={2}>
                ⚽
              </FloatingElement>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.4, type: "spring" }}
              className="absolute bottom-16 left-8 text-3xl cursor-pointer"
              whileHover={{ scale: 1.2, rotate: -15 }}
            >
              <FloatingElement amplitude={18} duration={4.5} delay={1.5}>
                🏸
              </FloatingElement>
            </motion.div>

            {/* Tiny platform badge matching reference exactly */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.6,
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.15 },
              }}
              className="absolute top-12 right-4 bg-white rounded-md shadow-sm px-2 py-1.5 text-center border border-gray-100 z-10 min-w-0"
            >
              <div className="text-[10px] font-medium text-gray-800 leading-tight whitespace-nowrap">
                YOUR ONE STOP
              </div>
              <div className="text-[10px] font-medium text-gray-800 leading-tight whitespace-nowrap">
                PLATFORM
              </div>

              {/* Tiny soccer ball icon */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                }}
                className="absolute -top-0.5 -right-0.5 text-xs"
              >
                ⚽
              </motion.div>
            </motion.div>

            {/* Fill the space with additional interactive elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-2 gap-6 max-w-sm mx-auto mt-16"
            >
              {[
                { icon: Users, label: "Connect", emoji: "👥" },
                { icon: MapPin, label: "Discover", emoji: "📍" },
                { icon: Calendar, label: "Schedule", emoji: "📅" },
                { icon: () => <span>🏆</span>, label: "Compete", emoji: "🏆" },
              ].map((feature, index) => (
                <InteractiveCard key={feature.label} hoverScale={1.08}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 p-4 rounded-2xl text-center hover:bg-white/90 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <motion.div
                      className="text-2xl mb-2"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      {feature.emoji}
                    </motion.div>
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                      {feature.label}
                    </p>
                  </motion.div>
                </InteractiveCard>
              ))}
            </motion.div>

            {/* Additional floating decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="absolute bottom-8 right-24 space-y-3"
            >
              {["🎯", "⚡", "🌟"].map((emoji, index) => (
                <motion.div
                  key={emoji}
                  className="bg-white/70 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    y: {
                      duration: 2.5 + index * 0.3,
                      repeat: Infinity,
                      delay: index * 0.4,
                    },
                    rotate: {
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      delay: index * 0.2,
                    },
                  }}
                >
                  <span className="text-lg">{emoji}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
