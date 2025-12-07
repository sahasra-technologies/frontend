import React from "react";
import { motion } from "framer-motion";
import { Search, PlayCircle } from "lucide-react";

export default function MobileHeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* 🌟 Animated Logo (visible on mobile only) */}
      <motion.div
  className="lg:hidden flex items-center justify-center gap-3 mt-6"
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <img src="/Play_primary.svg" alt="Logo" className="w-20 h-auto" />

  <h1 className="text-4xl text-gray-900">
    Play<span className="text-sports-blue">Date</span>
  </h1>
</motion.div>


      {/* 🌈 Gradient Orb (mobile optimized) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 
        bg-gradient-to-r from-sports-blue/20 to-sports-purple/20 rounded-full blur-3xl 
        lg:w-96 lg:h-96 lg:-top-16" />

      {/* 🏆 Floating Icons → visible on all screens, but positioned tighter on mobile */}
      {/* <motion.div
        className="absolute top-10 left-4 text-4xl lg:text-6xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ⚽
      </motion.div> */}

      {/* <motion.div
        className="absolute top-24 right-8 text-4xl lg:text-6xl"
        animate={{ y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 3.5 }}
      >
        🏏
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-12 text-4xl lg:text-6xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🏀
      </motion.div> */}

      {/* 🟦 Main Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 
        lg:grid lg:grid-cols-2 lg:items-center lg:pt-40">

        {/* LEFT SIDE */}
        <div className="text-center lg:text-left space-y-6">

          <motion.h1
            className="text-4xl leading-tight text-gray-900 
            md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            FIND YOUR
            <span className="text-sports-blue"> SPORTS BUDDY!</span>  
            {/* <br className="hidden lg:block" />
            Near You */}
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Whether you're a weekend warrior or aspiring champion, discover awesome venues, meet like-minded athletes, and experience the thrill of competitive sports like never before!
          </motion.p>

          {/* 🔍 Search Bar */}
          {/* <motion.div
            className="flex items-center gap-3 bg-white shadow-lg px-4 py-3
            rounded-xl max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for venues or sports..."
              className="w-full focus:outline-none text-gray-700"
            />
          </motion.div> */}

          {/* ▶ Watch Demo Button */}
          {/* <motion.button
            className="flex items-center gap-2 mx-auto lg:mx-0 mt-4 
            bg-sports-blue text-white px-6 py-3 rounded-xl shadow-lg font-semibold
            active:scale-95 transition"
            whileTap={{ scale: 0.95 }}
          >
            <PlayCircle size={20} />
            Watch Demo
          </motion.button> */}
        </div>

        {/* RIGHT SIDE – Feature Cards */}
        <motion.div
          className="mt-16 lg:mt-0 grid grid-cols-2 gap-4 max-w-sm mx-auto"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <span className="text-4xl">🏏</span>
            <p className="font-semibold mt-2">Cricket Nets</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <span className="text-4xl">⚽</span>
            <p className="font-semibold mt-2">Football Turf</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <span className="text-4xl">🏸</span>
            <p className="font-semibold mt-2">Badminton Court</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center">
            <span className="text-4xl">🏀</span>
            <p className="font-semibold mt-2">Basketball Arena</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
