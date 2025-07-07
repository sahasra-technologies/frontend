import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-sm border-b sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sports-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                PlayDate
              </span>
            </div>
          </div>

          {/* Location indicator */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Bangalore</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-sports-blue transition-colors"
            >
              Discover
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-sports-blue transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-sports-blue transition-colors"
            >
              Coaching
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-sports-blue transition-colors"
            >
              Community
            </a>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700">
              Login
            </Button>
            <Button className="bg-sports-blue hover:bg-sports-blue-dark text-white">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-sports-blue">
                Discover
              </a>
              <a href="#" className="text-gray-700 hover:text-sports-blue">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-sports-blue">
                Coaching
              </a>
              <a href="#" className="text-gray-700 hover:text-sports-blue">
                Community
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" className="justify-start">
                  Login
                </Button>
                <Button className="bg-sports-blue hover:bg-sports-blue-dark text-white">
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
