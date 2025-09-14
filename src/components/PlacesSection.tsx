import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface VenueCardProps {
  name: string;
  location: string;
  rating: number;
  sport: string;
  price: number;
  availability: string;
  features: string[];
  color: string;
  index: number;
}

const VenueCard = ({
  name,
  location,
  rating,
  sport,
  price,
  availability,
  features,
  color,
  index,
}: VenueCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className={`h-48 ${color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {sport}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
          <div className="flex items-center text-white/90">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{availability}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">8 people max</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">₹{price}</span>
            <span className="text-gray-500 ml-1">per hour</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Check Info
            </Button>
            <Button
              size="sm"
              className="bg-sports-blue hover:bg-sports-blue-dark"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PlacesSection = ({setIsLoading}) => {
  const venues = [
    {
      name: "Nisha Match Swimming Pool",
      location: "8 km away",
      rating: 4.9,
      sport: "Swimming",
      price: 500,
      availability: "Today",
      features: ["Changing Rooms", "Parking"],
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      name: "Kickit - The Social Club",
      location: "12 km away",
      rating: 4.8,
      sport: "Football",
      price: 800,
      availability: "Tomorrow",
      features: ["Professional Equipment", "Coaching"],
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      name: "Sports Zone Tennis Courts",
      location: "5 km away",
      rating: 4.9,
      sport: "Tennis",
      price: 600,
      availability: "Today",
      features: ["Night Play", "Equipment Available"],
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      name: "Kicks Football Arena",
      location: "15 km away",
      rating: 4.7,
      sport: "Football",
      price: 1200,
      availability: "This Week",
      features: ["Premium Ground", "Advanced Booking"],
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
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
            Amazing Places to Play! <span className="text-2xl">🏟️</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From cozy local courts to professional facilities - find the perfect
            spot for your game!
          </p>
          <div className="flex justify-center mt-6">
            <Button
              variant="link"
              className="text-sports-blue hover:text-sports-blue-dark"
            >
              See All Venues <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue, index) => (
            <VenueCard key={index} {...venue} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === 1 ? "bg-sports-blue" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlacesSection;
