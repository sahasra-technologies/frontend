import React from "react";
import { motion } from "framer-motion";
import image1 from '../assets/Tournment/Winners/Vintage_box_cricket_Uppal.jpg';
import image2 from '../assets/Tournment/img1.png';
import image3 from '../assets/Tournment/img2.png';
import image4 from '../assets/Tournment/img3.png';
import image5 from '../assets/Tournment/img4.png';

const achievements = [
  { name: "Cricket", image: image1 },
  { name: "Basketball", image: image2 },
  { name: "Football", image: image3 },
  { name: "Pickleball", image: image4 },
  { name: "Tennis", image: image5 },
];

const Achievements = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-4">Achievements</h2>

        {/* Section Description */}
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore the accomplishments of our players across various games. Each achievement
          represents dedication, skill, and fun!
        </p>

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
