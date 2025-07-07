import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Bell, User } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { MagneticButton } from "./AnimationWrapper";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const headerVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    },
  };

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.5 },
    },
  };

  const navItemVariants = {
    initial: { y: 0 },
    hover: {
      y: -2,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  const menuItems = [
    { label: "Discover", href: "#", color: "text-sports-blue" },
    { label: "Services", href: "#", color: "text-sports-green" },
    { label: "Coaching", href: "#", color: "text-sports-orange" },
    { label: "Community", href: "#", color: "text-sports-purple" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        ...headerVariants[isScrolled ? "scrolled" : "top"],
      }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with enhanced animation */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
            className="flex items-center cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                whileHover={{
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                  scale: 1.1,
                }}
              >
                <img src="/Play_primary.svg" alt="logo" className="h-8 w-auto" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-sports-blue bg-clip-text text-transparent">
                PlayDate
              </span>
            </div>
          </motion.div>

          {/* Location with pulse animation */}
          <motion.div
            className="hidden md:flex items-center space-x-2 text-gray-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-4 h-4 text-sports-green" />
            </motion.div>
            <span className="text-sm font-medium">Bangalore</span>
            <motion.div
              className="w-2 h-2 bg-sports-green rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={navItemVariants}
                initial="initial"
                whileHover="hover"
                className={`font-medium hover:${item.color} transition-colors relative`}
                style={{ "--delay": `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent rounded-lg -z-10"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Enhanced Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" className="text-gray-700 relative">
                <Bell className="w-4 h-4 mr-2" />
                Login
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-sports-red rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </Button>
            </motion.div>

            <MagneticButton className="bg-sports-blue hover:bg-sports-blue-dark text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <User className="w-4 h-4 mr-2" />
              Sign Up
            </MagneticButton>
          </div>

          {/* Enhanced Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 relative overflow-hidden"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Enhanced Mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-lg rounded-2xl mx-4 mb-4"
        >
          <div className="p-6 space-y-6">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={
                  isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }
                }
                transition={{ delay: index * 0.1 }}
                className={`block text-lg font-medium hover:${item.color} transition-colors`}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={
                isMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
              }
              transition={{ delay: 0.4 }}
              className="flex flex-col space-y-3 pt-4 border-t border-gray-200"
            >
              <Button variant="ghost" className="justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button className="bg-sports-blue text-white">
                <User className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
