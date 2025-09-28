import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ActionCard = ({
  id,
  title,
  sport,
  location,
  time,
  participants,
  price,
  color,
  index,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const navigate = useNavigate();
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <Badge variant="secondary" className={`bg-sports-purple text-white mb-2`}>
            {sport}
          </Badge>
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">₹{price}</div>
          <div className="text-sm text-gray-500">per person</div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {/* <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">{location}</span>
        </div> */}
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <div className="flex-1 min-w-0">     {/* <-- key container */}
            <span
              className="block w-full truncate text-sm"
              title={location}                 // full text on hover
            >
              {location}
            </span>
          </div>
        </div>


        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">{time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">{participants}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="outline" 
        className="flex-1" onClick={() => navigate(`/tournaments/${id}`)}>
          Check Info
        </Button>
        <Button size="sm" 
        className={`flex-1 ${color} hover:opacity-90`} onClick={() => navigate(`/tournaments/${id}`)}>
          Join Now
        </Button>
      </div>
    </motion.div>
  );
};

const ActionSection = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(
          "https://playdatesport.com/api/Tournament/tournaments/",
          { status: "Pending" },
          { headers: { "Content-Type": "application/json" } }
        );

        const normalizedActivities = (response.data.data || []).map((v) => ({
          id: v.id,
          title: v.name,
          sport: v.game,
          location: v.ground?.[0]?.address,
          time: v.start_date
          ? new Date(v.start_date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Upcoming",
        participants: v.ground?.[0]?.capacity
          ? `${v.ground[0].capacity} people allowed`
          : "Capacity not available",
        price: Number(v.price) || 0,
        color: "bg-orange-500",
        }));

        setActivities(normalizedActivities);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
      }
    };

    fetchData();
  }, []); // runs only once on mount

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
            Jump Into the Action! <span className="text-3xl">🏃</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exciting games happening right now or start your own and make
            friends!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <ActionCard key={index} {...activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionSection;
