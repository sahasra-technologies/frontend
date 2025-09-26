import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface GameTileProps {
  name: string;
  icon: string;
  color: string;
  index: number;
}

const GameTile = ({ name, icon, color, index }: GameTileProps) => {
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
      className={`
        ${color}
        rounded-2xl 
        p-4 sm:p-6 
        cursor-pointer 
        hover:shadow-lg 
        transition-all 
        duration-300 
        group
        flex flex-col items-center justify-center  /* ✅ center content */
      `}
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-white text-center text-sm sm:text-base">
        {name}
      </h3>
    </motion.div>
  );
};

const InteractiveHub = () => {
  const games = [
    {
      name: "Football",
      icon: "⚽",
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      name: "Basketball",
      icon: "🏀",
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
    },
    {
      name: "Tennis",
      icon: "🎾",
      color: "bg-gradient-to-br from-green-300 to-green-500",
    },
    {
      name: "Badminton",
      icon: "🏸",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      name: "Volleyball",
      icon: "🏐",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
    {
      name: "Table Tennis",
      icon: "🏓",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      name: "Darts",
      icon: "🎯",
      color: "bg-gradient-to-br from-red-400 to-red-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Game On! Interactive Sports Hub <span className="text-3xl">🎮</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our interactive collection of sports and games with stunning
            animations!
          </p>
        </motion.div>

        {/* ✅ Responsive grid */}
        <div
          className="
            grid
            grid-cols-2       /* phones */
            sm:grid-cols-3    /* small tablets */
            md:grid-cols-4    /* medium screens */
            lg:grid-cols-5    /* large laptops */
            xl:grid-cols-7    /* big desktops */
            gap-4 sm:gap-6
            place-items-center /* center tiles in cells */
          "
        >
          {games.map((game, index) => (
            <GameTile key={index} {...game} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveHub;
