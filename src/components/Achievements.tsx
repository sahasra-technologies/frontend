import { motion } from "framer-motion";

interface Achievement {
  name: string;
  image: string;
}

const achievements: Achievement[] = [
  { name: "Cricket", image: "/images/cricket.png" },
  { name: "Basketball", image: "/images/basketball.png" },
  { name: "Football", image: "/images/football.png" },
  { name: "Pickleball", image: "/images/pickleball.png" },
  { name: "Tennis", image: "/images/tennis.png" },
];

const Achievements = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Achievements</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore the accomplishments of our players across various games. 
          From cricket to pickleball, each achievement represents dedication, skill, and fun!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={achievement.image}
                alt={achievement.name}
                className="w-20 h-20 object-contain mb-4"
              />
              <p className="text-lg font-semibold text-center">{achievement.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
