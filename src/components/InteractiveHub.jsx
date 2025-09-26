import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PickleballImg  from '../assets/images/Pickleball.png'

const GameTile = ({ name, icon, color, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      className={`${color} rounded-2xl p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group 
        flex flex-col items-center justify-center text-center w-full max-w-[120px] sm:max-w-[140px]`}
    >
      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-white text-xs sm:text-sm leading-tight">{name}</h3>
    </motion.div>
  );
};

const InteractiveHub = () => {
  const games = [
    { name: "Cricket", icon: "🏏", color: "bg-gradient-to-br from-yellow-400 to-yellow-600" },
    { name: "Pickleball", icon: <img src={PickleballImg} alt="Pickleball" className="w-10 h-10 sm:w-12 sm:h-12" />, color: "bg-gradient-to-br from-blue-400 to-blue-600" },
    { name: "Football", icon: "⚽", color: "bg-gradient-to-br from-green-400 to-green-600" },
    { name: "Basketball", icon: "🏀", color: "bg-gradient-to-br from-orange-400 to-orange-600" },
    { name: "Tennis", icon: "🎾", color: "bg-gradient-to-br from-green-300 to-green-500" },
    { name: "Badminton", icon: "🏸", color: "bg-gradient-to-br from-purple-400 to-purple-600" },
    { name: "Volleyball", icon: "🏐", color: "bg-gradient-to-br from-pink-400 to-pink-600" },
    { name: "Darts", icon: "🎯", color: "bg-gradient-to-br from-red-400 to-red-600" },
    // { name: "Table Tennis", icon: "🏓", color: "bg-gradient-to-br from-blue-400 to-blue-600"},
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Game On! Interactive Sports Hub <span className="text-2xl sm:text-3xl">🎮</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our interactive collection of sports and games with stunning animations!
          </p>
        </motion.div>

        {/* Game Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 justify-items-center">
          {games.map((game, index) => (
            <GameTile key={index} {...game} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveHub;
