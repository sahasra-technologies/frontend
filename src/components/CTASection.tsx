import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Calendar, Trophy, Heart } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  const features = [
    {
      icon: Users,
      title: "Sports Enthusiasts",
      description: "Connect with like-minded athletes",
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book courts and organize games",
    },
    {
      icon: Trophy,
      title: "Competitions",
      description: "Join tournaments and leagues",
    },
    {
      icon: Heart,
      title: "Stay Healthy",
      description: "Track your fitness journey",
    },
  ];

  return (
    <>
      {/* Daily Challenge Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              🏆 Daily Challenge: Play 3 different sports today! 🏆
            </h3>
            <p className="text-white/90">
              We make finding sports friends and awesome venues super easy and
              fun!
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sports-blue via-blue-600 to-blue-800 relative overflow-hidden">
        {/* Background decoration */}
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-20'
          }
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Have Some Fun?{" "}
              <span className="text-yellow-300">⚡</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Join thousands of sports enthusiasts who are already making
              friends, staying active, and having amazing times right here on
              PlayDate!
            </p>

            {/* Email signup */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Input
                  placeholder="Enter your email"
                  className="bg-white text-gray-900 border-0 flex-1"
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
                  Get Started
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center text-white"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/20 transition-all duration-300">
                    <IconComponent className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-blue-100">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
