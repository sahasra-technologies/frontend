import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  Trophy,
  Calendar,
  ChevronLeft,
  AlertCircle,
  CreditCard,
  X,
  MapPinIcon,
  Share2,
  Heart,
  Star,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";

const tournaments = {
  "TUR0000006": {
    id: 1,
    name: "Cricket Grand Championship 2025",
    date: "29th November 2025",
    time: "8:00 AM Onwards",
    location: "Mumbai Cricket Association Ground",
    venue: "Wankhede Stadium, Mumbai",
    latitude: 19.0176,
    longitude: 72.8194,
    price: 5000,
    priceLabel: "₹5,000",
    image:
      "https://images.unsplash.com/photo-1531415074968-36a91cea50eb?w=1200&h=600&fit=crop",
    description:
      "Get ready for the Cricket Grand Championship 2025, a thrilling competition bringing together passionate cricketers from across the region. Featuring multiple categories for different skill levels, this event promises high-energy matches, intense competition, and an exciting display of talent. Whether you're playing to win or cheering from the sidelines, experience the spirit of sportsmanship and the joy of cricket at its finest!",
    categories: [
      "Men's Singles",
      "Women's Singles",
      "Men's Doubles",
      "Women's Doubles",
      "Mixed Doubles",
    ],
    overview:
      "Experience an unforgettable cricket tournament with world-class facilities and professional organization.",
    rules: [
      "Teams must have a minimum of 15 players and a maximum of 20 players",
      "Players must be registered at least 7 days before the match",
      "Match duration: 50 overs per side as per standard ODI rules",
      "Toss will be done 30 minutes before the scheduled match time",
      "Rain rule: Duckworth-Lewis method will be applied",
      "All players must wear official tournament kit",
      "No aggressive behavior or unsporting conduct allowed",
    ],
    registrationOptions: [
      { name: "Men's Singles", price: 5000 },
      { name: "Women's Singles", price: 5000 },
      { name: "Men's Doubles", price: 8000 },
      { name: "Women's Doubles", price: 8000 },
      { name: "Mixed Doubles", price: 7000 },
    ],
    rating: 4.8,
    reviewCount: 347,
    participantCount: 2500,
    registeredCount: 1840,
    capacity: 2500,
    hoursLeft: 48,
    verified: true,
    testimonials: [
      {
        name: "Rajesh Kumar",
        role: "Professional Cricketer",
        text: "Outstanding tournament! The organization was impeccable and the competition level was world-class.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        role: "Team Captain",
        text: "Best cricket tournament I've participated in. Highly recommended for all skill levels!",
        rating: 5,
      },
      {
        name: "Amit Patel",
        role: "Cricket Enthusiast",
        text: "Amazing experience with great facilities and supportive crowd. Can't wait for the next one!",
        rating: 4,
      },
    ],
  },
  "TUR0000005": {
    id: 2,
    name: "Football World Cup Series 2025",
    date: "1st December 2025",
    time: "9:00 AM Onwards",
    location: "Delhi Sports Complex",
    venue: "Arun Jaitley Stadium, Delhi",
    latitude: 28.5921,
    longitude: 77.2508,
    price: 7500,
    priceLabel: "₹7,500",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9e55?w=1200&h=600&fit=crop",
    description:
      "Join the Football World Cup Series 2025, an international-level football tournament featuring top teams from across the country. Experience professional-grade facilities and world-class organization.",
    categories: ["Men's Team", "Women's Team", "Youth Category"],
    overview:
      "Compete at the highest level with teams from across the region in this prestigious football tournament.",
    rules: [
      "Squads of 18 players maximum per match",
      "Player registration deadline 5 days before tournament start",
      "Match duration: 90 minutes as per FIFA rules",
      "Substitutions allowed up to 3 per side",
      "Yellow and red card system applies",
    ],
    registrationOptions: [
      { name: "Men's Team", price: 15000 },
      { name: "Women's Team", price: 12000 },
      { name: "Youth Category", price: 7500 },
    ],
    rating: 4.7,
    reviewCount: 289,
    participantCount: 1800,
    registeredCount: 1450,
    capacity: 1800,
    hoursLeft: 72,
    verified: true,
    testimonials: [
      {
        name: "Akshay Singh",
        role: "Football Coach",
        text: "Professional management and excellent ground conditions. Perfect for competitive football!",
        rating: 5,
      },
      {
        name: "Neha Gupta",
        role: "Player",
        text: "Great tournament with fair refereeing and supportive staff throughout.",
        rating: 4,
      },
      {
        name: "Vikram Reddy",
        role: "Team Manager",
        text: "Exceptional experience. The logistics were seamless and the atmosphere was electric!",
        rating: 5,
      },
    ],
  },
};

export default function TournamentOverview({ setIsLoading }) {
  const { id } = useParams();
  const otournament = tournaments[id || "1"];
  const [tournament, setTournment] = useState({})
  // const [rules, setRules] = useState([])
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(
    otournament?.registrationOptions[0]?.name || ""
  );
  const [liked, setLiked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
  
        const response = await fetch(`https://playdatesport.com/api/Tournament/tournaments/?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        // console.log(response.json())
  
        const data = await response.json();
        console.log("data", data)
        setTournment(data)
        // const allRules = data
        //   .flatMap(tournament => tournament.rules || [])
        //   .filter(rule => rule);
        // setRules(allRules)
        // setFirstRules(allRules);
        // setFirstRules(data.rules)
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [setIsLoading]);

  if (!otournament) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tournament not found
          </h1>
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d+\-\s()]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, "");
    return /^\d{13,19}$/.test(cleaned) && cleaned.length >= 13;
  };

  const validateExpiry = (expiry) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) return false;
    const [month, year] = expiry.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expiryYear = parseInt(year);
    if (expiryYear < currentYear) return false;
    if (expiryYear === currentYear && parseInt(month) < currentMonth) return false;
    return true;
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (paymentMethod === "card") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!validateCardNumber(formData.cardNumber)) {
        newErrors.cardNumber = "Please enter a valid card number (13-19 digits)";
      }
      if (!formData.expiry.trim()) {
        newErrors.expiry = "Expiry date is required";
      } else if (!validateExpiry(formData.expiry)) {
        newErrors.expiry = "Please enter a valid date (MM/YY)";
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!validateCVV(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV (3-4 digits)";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.slice(0, 19);
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) {
      return cleaned;
    }
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      return cleaned;
    }
    return cleaned.slice(0, 10);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiry") {
      formattedValue = formatExpiry(value);
    } else if (name === "phone") {
      formattedValue = formatPhone(value);
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });

    if (touched[name]) {
      validateField(name, formattedValue);
    }
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    let isValid = true;

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Full name is required";
          isValid = false;
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
          isValid = false;
        } else if (!validateEmail(value)) {
          newErrors.email = "Please enter a valid email";
          isValid = false;
        } else {
          delete newErrors.email;
        }
        break;
      case "phone":
        if (!value.trim()) {
          newErrors.phone = "Phone number is required";
          isValid = false;
        } else if (!validatePhone(value)) {
          newErrors.phone = "Please enter a valid phone number";
          isValid = false;
        } else {
          delete newErrors.phone;
        }
        break;
      case "cardNumber":
        if (!value.trim()) {
          newErrors.cardNumber = "Card number is required";
          isValid = false;
        } else if (!validateCardNumber(value)) {
          newErrors.cardNumber = "Please enter a valid card number";
          isValid = false;
        } else {
          delete newErrors.cardNumber;
        }
        break;
      case "expiry":
        if (!value.trim()) {
          newErrors.expiry = "Expiry date is required";
          isValid = false;
        } else if (!validateExpiry(value)) {
          newErrors.expiry = "Please enter a valid date (MM/YY)";
          isValid = false;
        } else {
          delete newErrors.expiry;
        }
        break;
      case "cvv":
        if (!value.trim()) {
          newErrors.cvv = "CVV is required";
          isValid = false;
        } else if (!validateCVV(value)) {
          newErrors.cvv = "Please enter a valid CVV";
          isValid = false;
        } else {
          delete newErrors.cvv;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateField(name, value);
  };

  const handlePaymentSubmit = () => {
    if (paymentStep === 1) {
      if (validateStep1()) {
        setPaymentStep(2);
        setTouched({});
      }
    } else {
      if (validateStep2()) {
        setRegistrationSuccess(true);
        setTimeout(() => {
          setIsPaymentModalOpen(false);
          setPaymentStep(1);
          setRegistrationSuccess(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            cardNumber: "",
            expiry: "",
            cvv: "",
          });
          setErrors({});
          setTouched({});
          setPaymentMethod("card");
        }, 2000);
      }
    }
  };

  const selectedOption = otournament.registrationOptions.find(
    (opt) => opt.name === selectedCategory
  );
  const registrationPrice = selectedOption?.price || otournament.price;
  const spotsLeft = otournament.capacity - otournament.registeredCount;
  const percentageFilled =
    (otournament.registeredCount / otournament.capacity) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white md:pb-0 pb-24">
      {/* Header */}
      {/* <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TourneyHub</span>
            </Link>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-lg transition ${
                  liked
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <Share2 className="w-5 h-5" />
              </button>
              <Link to="/">
                <Button variant="outline" className="hidden sm:flex">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 mb-6 md:hidden">
          <img
            src="/Play_primary.svg"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-sports-blue bg-clip-text text-transparent">
            PlayDate
          </span>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="animate-fade-in">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-2 flex items-center gap-1">
                    {otournament.verified && (
                      <>
                        <Shield className="w-4 h-4" />
                        Verified Tournament
                      </>
                    )}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {tournament.name}
                  </h1>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold text-gray-900">
                    {otournament.rating}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({otournament.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 text-sm text-gray-700">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>{otournament.participantCount.toLocaleString()} participants</span>
                </div>
              </div>

              {/* Hero Image with Overlay */}
              <div className="relative rounded-xl overflow-hidden shadow-xl group">
                <img
                  src={tournament.images?.main_image}
                  alt={tournament.name}
                  className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold text-blue-600 flex items-center gap-2 shadow-lg">
                  <Zap className="w-5 h-5" />
                  {otournament.hoursLeft}h left!
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tournament Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {tournament.about}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Registration Status</p>
                <p className="text-2xl font-bold text-blue-600">
                  {percentageFilled.toFixed(0)}%
                </p>
                <div className="w-full bg-gray-300 rounded-full h-2 mt-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentageFilled}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {spotsLeft} spots left
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Registered</p>
                <p className="text-2xl font-bold text-green-600">
                  {otournament.registeredCount}
                </p>
                <p className="text-xs text-gray-600 mt-3">of {otournament.capacity}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Prize Pool</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹50L+
                </p>
                <p className="text-xs text-gray-600 mt-3">Total</p>
              </div>
            </div>

            {/* Date & Time Section */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Date & Time
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">otournament Date</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {tournament.start_date}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">Start Time</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {otournament.time}
                  </p>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                Categories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otournament.categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-900 font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location
              </h3>
              <p className="text-gray-700 mb-6 text-lg font-medium">
                {otournament.location}
              </p>

              {/* Map */}
              <div className="relative w-full h-80 rounded-lg overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center hover:shadow-lg transition">
                <div className="text-center">
                  <MapPinIcon className="w-16 h-16 text-blue-600 mx-auto mb-3 opacity-80" />
                  <p className="text-gray-600 font-medium text-lg">
                    {otournament.location}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Interactive map opens after registration
                  </p>
                </div>
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Rules & Format
              </h3>
              <ul className="space-y-3">
                {tournament.rules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition"
                  >
                    <span className="text-blue-600 font-bold flex-shrink-0 text-lg">
                      ✓
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 md:p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                Participant Reviews
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {otournament.testimonials.map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-4 border border-blue-200 hover:shadow-lg transition"
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-3 italic">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-bold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Registration Card */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {/* Main Registration Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 md:p-8 text-white shadow-xl">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-blue-100 text-sm mb-2">Starting Price</p>
                  <p className="text-5xl font-bold mb-1">{otournament.priceLabel}</p>
                  <p className="text-blue-100 text-xs">(per person)</p>
                </div>

                {/* Urgency Badge */}
                <div className="bg-red-500/20 border border-red-300/50 rounded-lg p-3 mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    Only {spotsLeft} spots remaining!
                  </span>
                </div>

                {/* Register Button with Animation */}
                <Button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 text-lg py-3 rounded-lg font-bold mb-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  Register Now! 🎯
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-100">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>

              {/* Registration Progress */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <p className="text-xs font-semibold text-gray-600 mb-3">
                  REGISTRATION PROGRESS
                </p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Spots Filled
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {percentageFilled.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full transition-all duration-300"
                        style={{ width: `${percentageFilled}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
                    <span>{otournament.registeredCount} registered</span>
                    <span>{spotsLeft} spots left</span>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="space-y-3">
                {/* Category Selector Card */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition">
                  <p className="text-xs font-semibold text-gray-600 mb-3">
                    SELECT CATEGORY
                  </p>
                  <div className="space-y-2">
                    {otournament.registrationOptions.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedCategory(option.name)}
                        className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition transform hover:scale-102 ${
                          selectedCategory === option.name
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{option.name}</span>
                          <span className="font-bold">₹{option.price.toLocaleString()}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time Info */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <p className="text-xs font-semibold text-gray-600 mb-3">
                    DATE & TIME
                  </p>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    {otournament.date}
                  </p>
                  <p className="text-sm text-gray-600">{otournament.time}</p>
                </div>

                {/* Location Info */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <p className="text-xs font-semibold text-gray-600 mb-3">
                    LOCATION
                  </p>
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {otournament.location}
                  </p>
                  <button className="text-blue-600 text-xs font-bold hover:text-blue-700 transition">
                    View larger map →
                  </button>
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 text-gray-900 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{registrationPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-xs text-green-900">
                <div className="flex gap-2">
                  <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Your payment is 100% secure with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Register Button */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-center">
            <Button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg py-4 rounded-lg font-bold shadow-lg transform hover:scale-102 transition-all duration-200 mb-8 md:mb-0"
              size="lg"
            >
              Register Now! 🎯
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-600">
            <Shield className="w-3 h-3" />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-10">
              <div>
                <p className="text-xs font-medium text-blue-100">
                  Step {paymentStep} of 2
                </p>
                <h2 className="text-xl font-bold">
                  {paymentStep === 1
                    ? "Participant Details"
                    : "Payment Information"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setPaymentStep(1);
                  setErrors({});
                  setTouched({});
                }}
                className="text-white hover:bg-blue-700 rounded-lg p-1 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300"
                style={{ width: `${paymentStep === 1 ? 50 : 100}%` }}
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {!registrationSuccess ? (
                paymentStep === 1 ? (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                      <p className="font-medium">📝 Complete your registration in 2 simple steps</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleFormInputChange}
                        onBlur={handleFieldBlur}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                          errors.name && touched.name
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.name && touched.name && (
                        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleFormInputChange}
                        onBlur={handleFieldBlur}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                          errors.email && touched.email
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.email && touched.email && (
                        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                      {!errors.email && touched.email && (
                        <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                          ✓ Email looks good
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={handleFormInputChange}
                        onBlur={handleFieldBlur}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                          errors.phone && touched.phone
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.phone && touched.phone && (
                        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                      {!errors.phone && touched.phone && formData.phone && (
                        <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                          ✓ Phone looks good
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                      >
                        {otournament.registrationOptions.map((opt) => (
                          <option key={opt.name} value={opt.name}>
                            {opt.name} - ₹{opt.price.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-300 mt-6">
                      <p className="text-xs text-gray-600 mb-1 font-medium uppercase tracking-wide">
                        Registration Fee
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        ₹{registrationPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 mt-2">One-time payment</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200 mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-600 mb-1 font-medium">Registration for</p>
                          <p className="text-sm font-bold text-gray-900">
                            {selectedCategory}
                          </p>
                        </div>
                        <button
                          onClick={() => setPaymentStep(1)}
                          className="text-blue-600 text-xs font-semibold hover:text-blue-700 transition"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="border-t border-blue-200 pt-2 mt-2">
                        <p className="text-sm font-bold text-blue-600">
                          ₹{registrationPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-gray-900">Payment Method</p>
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition hover:bg-blue-50" style={{ borderColor: paymentMethod === "card" ? "#2563eb" : "#d1d5db" }}>
                          <input
                            type="radio"
                            name="payment-method"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Debit / Credit Card</p>
                            <p className="text-xs text-gray-600">Visa, Mastercard, RuPay</p>
                          </div>
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </label>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleFormInputChange}
                            onBlur={handleFieldBlur}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition font-mono tracking-wider ${
                              errors.cardNumber && touched.cardNumber
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.cardNumber && touched.cardNumber && (
                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.cardNumber}
                            </p>
                          )}
                          {!errors.cardNumber && touched.cardNumber && formData.cardNumber && (
                            <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                              ✓ Card number valid
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              Expiry <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="expiry"
                              placeholder="MM/YY"
                              value={formData.expiry}
                              onChange={handleFormInputChange}
                              onBlur={handleFieldBlur}
                              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-center font-mono tracking-widest ${
                                errors.expiry && touched.expiry
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300"
                              }`}
                            />
                            {errors.expiry && touched.expiry && (
                              <p className="text-red-600 text-xs mt-1">
                                {errors.expiry}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              CVV <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="password"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleFormInputChange}
                              onBlur={handleFieldBlur}
                              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-center font-mono tracking-widest ${
                                errors.cvv && touched.cvv
                                  ? "border-red-500 bg-red-50"
                                  : "border-gray-300"
                              }`}
                            />
                            {errors.cvv && touched.cvv && (
                              <p className="text-red-600 text-xs mt-1">
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start gap-2 mt-4 p-3 bg-gray-50 rounded-lg">
                          <input
                            type="checkbox"
                            id="terms"
                            className="w-4 h-4 mt-0.5 cursor-pointer"
                            defaultChecked
                          />
                          <label
                            htmlFor="terms"
                            className="text-xs text-gray-600 cursor-pointer"
                          >
                            I agree to the tournament <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
                          </label>
                        </div>
                      </>
                    )}
                  </>
                )
              ) : (
                <div className="py-8 text-center animate-bounce">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Confirmation email has been sent to <br />
                    <span className="font-semibold">{formData.email}</span>
                  </p>
                  <p className="text-xs text-gray-500">Tournament starts on {otournament.date}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!registrationSuccess && (
              <div className="border-t border-gray-200 p-6 flex gap-3 sticky bottom-0 bg-white">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (paymentStep === 2) {
                      setPaymentStep(1);
                      setErrors({});
                      setTouched({});
                    } else {
                      setIsPaymentModalOpen(false);
                      setPaymentStep(1);
                      setErrors({});
                      setTouched({});
                    }
                  }}
                  className="flex-1"
                >
                  {paymentStep === 1 ? "Cancel" : "Back"}
                </Button>
                <Button
                  onClick={handlePaymentSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition transform hover:scale-105"
                >
                  {paymentStep === 1 ? "Continue to Payment" : "Complete Registration"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="font-bold">TourneyHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                The ultimate platform for sports tournaments
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Tournaments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400 text-sm">
              © 2024 TourneyHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}
