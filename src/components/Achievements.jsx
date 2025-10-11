import React from "react";
import { motion } from "framer-motion";
import image1 from '../assets/Tournment/Winners/Vintage_box_cricket_Uppal.png';
import image2 from '../assets/Tournment/Winners/Super_Cairo_Nagole.png';
import image3 from '../assets/Tournment/Winners/Cricket_Adda_Dilsukhnagar_zone.png';
import image4 from '../assets/Tournment/Winners/C5_SPORTS_ARENA_LB_Nagar_Zone.png';
// import image5 from '../assets/Tournment/img4.png';

const achievements = [
  { name: "Vintage box cricket (Uppal)", image: image1 },
  { name: "Super Cairo (Nagole)", image: image2 },
  { name: "Cricket Adda ( Dilsukhnagar zone )", image: image3 },
  { name: "C5 SPORTS ARENA (LB Nagar Zone)", image: image4 },
  // { name: "Tennis", image: image5 },
];

const Achievements = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Achievements</h2>

        {/* Section Description */}
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
          Explore the accomplishments of our players across various games. Each achievement
          represents dedication, skill, and fun!
        </p>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
            >
              {/* Full Cover Image */}
              <motion.img
                src={achievement.image}
                alt={achievement.name}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Text Overlay */}
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg font-semibold">
                {achievement.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
