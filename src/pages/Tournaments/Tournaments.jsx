import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy, Calendar, Users, Search, ArrowLeft, Filter, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TUR0000001_img from '../../assets/Tournment/Winners/Vintage_box_cricket_Uppal.png';
import TUR0000002_img from '../../assets/Tournment/Winners/Super_Cairo_Nagole.png';
import TUR0000005_img from '../../assets/Tournment/Winners/Cricket_Adda_Dilsukhnagar_zone.png';
import TUR0000004_img from '../../assets/Tournment/Winners/C5_SPORTS_ARENA_LB_Nagar_Zone.png';
import defaultTournamentImg from '../../assets/Venues/venue1a.png';
import { toast } from 'react-toastify';

// export default function Tournaments() {
const Tournaments = ({ setIsLoading }) => {  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [allTournaments, setAllTournaments] = useState([]);

  const tournamentImages = {
    TUR0000001: TUR0000001_img,
    TUR0000002: TUR0000002_img,
    TUR0000004: TUR0000004_img,
    TUR0000005: TUR0000005_img,
  };

  // const allTournaments = [
  //   {
  //     id: 1,
  //     name: "Summer Clash 2024",
  //     category: "Football",
  //     date: "Aug 15-22, 2024",
  //     teams: 32,
  //     prize: "$10,000",
  //     level: "Professional",
  //     location: "New York",
  //     spots: 5,
  //     image: "bg-gradient-to-br from-blue-500 to-blue-600",
  //   },
  //   {
  //     id: 2,
  //     name: "Youth Championship",
  //     category: "Football",
  //     date: "Aug 20-25, 2024",
  //     teams: 24,
  //     prize: "$5,000",
  //     level: "Semi-Professional",
  //     location: "Los Angeles",
  //     spots: 12,
  //     image: "bg-gradient-to-br from-green-500 to-green-600",
  //   },
  //   {
  //     id: 3,
  //     name: "Community League",
  //     category: "Basketball",
  //     date: "Aug 18-30, 2024",
  //     teams: 48,
  //     prize: "$3,000",
  //     level: "Amateur",
  //     location: "Chicago",
  //     spots: 8,
  //     image: "bg-gradient-to-br from-orange-500 to-orange-600",
  //   },
  //   {
  //     id: 4,
  //     name: "Winter Elite Cup",
  //     category: "Football",
  //     date: "Sep 5-12, 2024",
  //     teams: 16,
  //     prize: "$25,000",
  //     level: "Elite",
  //     location: "Miami",
  //     spots: 3,
  //     image: "bg-gradient-to-br from-purple-500 to-purple-600",
  //   },
  //   {
  //     id: 5,
  //     name: "Regional Basketball Series",
  //     category: "Basketball",
  //     date: "Sep 1-15, 2024",
  //     teams: 20,
  //     prize: "$8,000",
  //     level: "Professional",
  //     location: "Boston",
  //     spots: 6,
  //     image: "bg-gradient-to-br from-red-500 to-red-600",
  //   },
  //   {
  //     id: 6,
  //     name: "Volleyball Open Championship",
  //     category: "Volleyball",
  //     date: "Aug 25-Sep 2, 2024",
  //     teams: 28,
  //     prize: "$4,500",
  //     level: "Semi-Professional",
  //     location: "San Francisco",
  //     spots: 10,
  //     image: "bg-gradient-to-br from-pink-500 to-pink-600",
  //   },
  //   {
  //     id: 7,
  //     name: "Tennis Grand Slam",
  //     category: "Tennis",
  //     date: "Sep 8-20, 2024",
  //     teams: 64,
  //     prize: "$50,000",
  //     level: "Elite",
  //     location: "New York",
  //     spots: 2,
  //     image: "bg-gradient-to-br from-teal-500 to-teal-600",
  //   },
  //   {
  //     id: 8,
  //     name: "Community Basketball Tournament",
  //     category: "Basketball",
  //     date: "Aug 22-29, 2024",
  //     teams: 32,
  //     prize: "$2,000",
  //     level: "Amateur",
  //     location: "Seattle",
  //     spots: 15,
  //     image: "bg-gradient-to-br from-yellow-500 to-yellow-600",
  //   },
  // ];

  useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "https://playdatesport.com/api/Tournament/tournaments/",
        { status: "" },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("data", response.data)

      const normalizedTournaments = (response.data.data || []).map((v) => ({
        id: v.id,
        name: v.name,
        sport: v.game,
        location: v.ground?.[0]?.address,
        price_pool: v.price_pool,
        status: v.status,
        date: v.start_date
        ? new Date(v.start_date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Upcoming",
        capacity: v.capacity - v.registered_count,
        participants: v.capacity - v.registered_count
          ? `${v.capacity - v.registered_count} Slots Available`
          : "Slots not available",
        price: Number(v.price) || 0,
        color: "bg-orange-500",
      }));
      // console.log("normalizedTournaments", normalizedTournaments)
      setAllTournaments(normalizedTournaments)
      // setActivities(normalizedTournaments);
      setIsLoading(false);
    } catch (err) {
      toast.error("Error fetching tournaments");
    }
  };

  fetchData();
  
  }, [setIsLoading]); // runs only once on mount


  const categories = ["all", "Football", "Basketball", "Volleyball", "Tennis"];
  const levels = ["all", "Amateur", "Semi-Professional", "Professional", "Elite"];

  const filteredTournaments = allTournaments.filter((tournament) => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tournament.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || tournament.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 md:pt-20 lg:pt-24 px-4 sm:px-6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="hidden sm:block text-xl font-bold text-foreground">Browse Tournaments</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tournaments or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 text-base"
            />
          </div>
        </div>

        {/* Filters - Desktop */}
        {/* <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Level</label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedLevel("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div> */}

        {/* Filters - Mobile */}
        {/* <div className="md:hidden mb-8">
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>

          {showFilters && (
            <div className="mt-4 p-4 rounded-lg border border-border bg-card space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === "all" ? "All Levels" : level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div> */}

        {/* Results */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredTournaments.length}</span> of{" "}
            <span className="font-semibold text-foreground">{allTournaments.length}</span> tournaments
          </p>
        </div>

        {/* Tournament Grid */}
        {filteredTournaments.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTournaments.map((tournament) => (
              <div key={tournament.id} className="group">
                <div className="rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 h-full flex flex-col">
                  {/* Tournament Image */}
                  <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-cover bg-center"
                    style={{
                    backgroundImage: `url(${tournamentImages[tournament.id] || defaultTournamentImg })`,
                  }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                        <Trophy className="w-3 h-3" />
                        {tournament.level}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          tournament.spots <= 3
                            ? "bg-red-500/80 text-white"
                            : tournament.spots <= 8
                              ? "bg-amber-500/80 text-white"
                              : "bg-green-500/80 text-white"
                        } backdrop-blur-sm`}
                      >
                        {tournament.spots} spots left
                      </span>
                    </div>
                  </div>

                  {/* Tournament Info */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">
                        {tournament.category}
                      </p>
                      <h3 className="font-bold text-foreground mb-3 line-clamp-2 text-lg">
                        {tournament.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{tournament.location}</p>
                    </div>

                    <div className="space-y-3 my-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>{tournament.participants}</span>  {/* teams registered */}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Prize Pool</div>
                          <div className="font-bold text-primary text-lg">{tournament.price_pool}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Entry Fee</div>
                          <div className="font-bold text-foreground">{tournament.price}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" 
                        className="flex-1" 
                        onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                        Check Info
                      </Button>
                      <Button size="sm" 
                        className={`flex-1 ${tournament.color} hover:opacity-90`} 
                        onClick={() => navigate(`/tournaments/${tournament.id}`)} 
                        disabled={tournament.capacity === 0}
                        >
                        {tournament.capacity === 0 ? "Fully Booked" : "Book Tournament"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No tournaments found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you're looking for
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedLevel("all");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tournaments