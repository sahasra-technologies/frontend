import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Clock,
  Users,
  Heart,
  Bookmark,
  Zap,
  Volleyball
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  InteractiveCard,
  AnimatedSection,
  MagneticButton,
} from "./AnimationWrapper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VenueCard = ({
  id,
  name,
  location,
  rating,
  sport,
  price,
  availability,
  features = [],
  color,
  index,
  game,
  image,
  status,
  onInfoClick,   // ✅ callback from parent
  onBookClick,   // ✅ callback from parent
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ y: 80, opacity: 0, rotateX: 45 }}
      animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="group perspective-1000"
    >
      <InteractiveCard
        hoverScale={1.02}
        className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
      >
        <motion.div
          whileHover={{
            rotateY: 5,
            transition: { duration: 0.3 },
          }}
          className="relative"
        >

          {/* Content section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.6 }}
            className="p-6"
          >
            {/* Info row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gray-600 space-x-4">
                <span className="text-sm font-medium">{name}</span>
                <div className="flex items-center">
                  <Volleyball className="w-4 h-4 mr-1 text-green-500" />
                  <span className="text-sm font-medium">{game}</span>
                </div>
                {/* <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-blue-500" />
                  <span className="text-sm font-medium">8 max</span>
                </div> */}
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(features || []).map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.7 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Zap className="w-3 h-3 mr-1 text-sports-blue" />
                    {feature}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Price & actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.8 }}
              className="flex items-center justify-between"
            >
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  ₹{price}
                </span>
                <span className="text-gray-500 ml-1 text-sm">/hour</span>
              </div>
              <div className="flex gap-2">
                <InteractiveCard>
                  <Button
                    size="sm"
                    variant="outline"
                    // className="hover:bg-gray-50 transition-all duration-300"
                    className="bg-sports-blue hover:bg-sports-blue text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => onInfoClick?.(id)}
                  >
                    Info
                  </Button>
                </InteractiveCard>
                {/* {(status == 'Pending' || status == 'Not Scheduled') && (
                  <MagneticButton 
                  onClick={() => onBookClick?.(id)}
                  className="bg-sports-blue hover:bg-sports-blue-dark text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Book Now
                  </MagneticButton>
                )} */}
                
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </InteractiveCard>
    </motion.div>
  );
};

const PlacesSection = ({ setIsLoading }) => {
  const [filterOptions, setFilterOptions] = useState(["All Sports"]);
  const [venues, setVenues] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Sports");
  const navigate = useNavigate();

  const handleInfoClick = (id) => {
    console.log("Info clicked for venue:", id);
    navigate(`/tournaments/${id}`);
    // 👉 You can navigate or open a modal here
  };

  const handleBookClick = (id) => {
    console.log("Book Now clicked for venue:", id);
    navigate(`/tournaments/${id}`);
    // 👉 Trigger booking flow here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(
          "https://playdatesport.com/api/Tournament/tournaments/",
          { game: activeFilter === "All Sports" ? "" : activeFilter },
          { headers: { "Content-Type": "application/json" } }
        );

        const normalizedVenues = (response.data.data || []).map((v) => ({
          ...v,
          features: v.features || [],
        }));

        setFilterOptions(["All Sports", ...(response.data.games || [])]);
        setVenues(normalizedVenues);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
      }
    };

    fetchData();
  }, [activeFilter]); // ✅ re-run whenever activeFilter changes

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Amazing Places to Play! 🏟️
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From cozy local courts to professional facilities - find the perfect
            spot for your game with our curated selection of premium venues!
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {filterOptions.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)} // ✅ updates state
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-sports-blue text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Venues grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {venues.map((venue, index) => (
            <VenueCard key={index} 
              {...venue}
              index={index} 
              onInfoClick={handleInfoClick}
              onBookClick={handleBookClick}
              />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacesSection;
