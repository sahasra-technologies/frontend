import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { FloatingElement, ParticleBackground } from "./AnimationWrapper";

const floatingIcons = [
  // { icon: "🏀", className: "top-20 right-10 text-5xl", delay: 0, amplitude: 25, duration: 4 },
  // { icon: "⚽", className: "top-40 right-32 text-4xl", delay: 1, amplitude: 20, duration: 3.5 },
  // { icon: "🏸", className: "top-60 left-10 text-4xl", delay: 2, amplitude: 30, duration: 3 },
  // { icon: "🎾", className: "top-32 left-32 text-3xl", delay: 0.5, amplitude: 15, duration: 4.5 },
  // { icon: "🏐", className: "bottom-40 right-20 text-4xl", delay: 1.5, amplitude: 25, duration: 3.8 },
  // { icon: "🏓", className: "bottom-60 left-20 text-3xl", delay: 2.5, amplitude: 20, duration: 4.2 },
];

const AboutHeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ y, opacity }}
      className="relative min-h-screen bg-gradient-to-b from-[#e6edf8] to-[#f9fbfe] flex items-center justify-center overflow-hidden p-4 sm:p-8"
    >
      {/* Particle background */}
      <ParticleBackground count={30} />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-sports-blue/20 to-sports-purple/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-sports-orange/20 to-sports-red/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating sports icons */}
      {floatingIcons.map(({ icon, className, delay, amplitude, duration }, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: delay + 1, duration: 0.8, type: "spring", stiffness: 200, damping: 15 }}
          className={`absolute hidden lg:block ${className} cursor-pointer`}
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0], zIndex: 10 }}
        >
          <FloatingElement amplitude={amplitude} duration={duration} delay={delay}>
            <motion.div
              whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.2)", background: "rgba(255,255,255,0.9)" }}
              className="p-2 rounded-full backdrop-blur-sm"
            >
              {icon}
            </motion.div>
          </FloatingElement>
        </motion.div>
      ))}

      {/* Central container matching uploaded image style */}
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-8 sm:p-12 max-w-3xl w-full text-center">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-4 animate-bounce">
          About
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          More Than a Game,
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
          We're building a sports culture where every match matters, every player has a stage, and every weekend feels like game day. Join thousands of athletes finding their tribe and unleashing their potential on courts and fields across the nation.
        </p>
        {/* <div className="grid grid-cols-3 gap-6 justify-items-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">10,000+</div>
            <div className="text-sm text-gray-500">Matches</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">25,000+</div>
            <div className="text-sm text-gray-500">Players</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-gray-500">Communities</div>
          </div>
        </div> */}
      </div>
    </motion.section>
  );
};

export default AboutHeroSection;
