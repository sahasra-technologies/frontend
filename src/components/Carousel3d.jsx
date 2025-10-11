import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import image1 from '../assets/Tournment/Winners/Vintage_box_cricket_Uppal.png';
import image2 from '../assets/Tournment/Winners/C5_SPORTS_ARENA_LB_Nagar_Zone.png';
import image3 from '../assets/Tournment/Winners/Cricket_Adda_Dilsukhnagar_zone.png';
import image4 from '../assets/Tournment/Winners/Vintage_box_cricket_Uppal.png';
// import image5 from '../assets/Tournment/img4.png';
import { v4 as uuidv4 } from "uuid";
import CarouselCard from "./CarouselCard";
import Carousel from "./Carousel";

// const achievements = [
//   { name: "Cricket", image: image1 },
//   { name: "Basketball", image: image2 },
//   { name: "Football", image: image3 },
//   { name: "Pickleball", image: image4 },
//   { name: "Tennis", image: image5 },
// ];

const Carousel3d = () => {
  // return (
  //   <section className="py-12 bg-gray-50">
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //       {/* Section Title */}
  //       <h2 className="text-3xl font-bold text-center mb-4">Achievements</h2>

  //       {/* Section Description */}
  //       <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
  //         Explore the accomplishments of our players across various games. Each achievement
  //         represents dedication, skill, and fun!
  //       </p>

  //       {/* Achievement Grid */}
  //       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
  //         {achievements.map((achievement, index) => (
  //           <motion.div
  //             key={index}
  //             className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
  //             initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
  //             whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
  //             viewport={{ once: true }}
  //             transition={{
  //               delay: index * 0.1,
  //               type: "spring",
  //               stiffness: 100,
  //               damping: 10,
  //             }}
  //             whileHover={{ scale: 1.05, rotateY: 10 }}
  //           >
  //             {/* Full Cover Image */}
  //             <motion.img
  //               src={achievement.image}
  //               alt={achievement.name}
  //               className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
  //               whileHover={{ scale: 1.1 }}
  //               transition={{ duration: 0.3 }}
  //             />

  //             {/* Text Overlay */}
  //             <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg font-semibold">
  //               {achievement.name}
  //             </div>
  //           </motion.div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );
  const cards = [
    { key: uuidv4(), content: <CarouselCard imagen={image1} /> },
    { key: uuidv4(), content: <CarouselCard imagen={image2} /> },
    { key: uuidv4(), content: <CarouselCard imagen={image3} /> },
    { key: uuidv4(), content: <CarouselCard imagen={image4} /> },
    // { key: uuidv4(), content: <CarouselCard imagen={img5} /> },
  ];

  const [activeCard, setActiveCard] = useState(0);

  // ✅ Auto-rotate every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [cards.length]);

  // ✅ Responsive sizing
  const getResponsiveSize = () => {
    const width = window.innerWidth;
    if (width <= 480) return { width: "95%", height: "280px", offset: 1 };
    if (width <= 768) return { width: "85%", height: "350px", offset: 2 };
    if (width <= 1024) return { width: "70%", height: "420px", offset: 3 };
    return { width: "50%", height: "500px", offset: 2 };
  };

  const [carouselSize, setCarouselSize] = useState(getResponsiveSize());

  useEffect(() => {
    const handleResize = () => setCarouselSize(getResponsiveSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Section Title */}
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Achievements
        </h2>

        {/* ✅ Section Description */}
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Explore the accomplishments of our players across various games. Each
          achievement represents dedication, skill, and fun!
        </p>

        {/* ✅ Carousel Container */}
        <div
          className="flex justify-center items-center"
          style={{ width: "100%" }}
        >
          <Carousel
            cards={cards}
            activeCard={activeCard}
            height={carouselSize.height}
            width={carouselSize.width}
            margin="0 auto"
            offset={carouselSize.offset}
            showArrows={false}
            slides={cards}
          />
        </div>
      </div>
    </section>
  );
};

export default Carousel3d;
