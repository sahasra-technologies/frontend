import { useEffect, useState } from "react";
import { BracketTree } from "./BracketTree";
import { convertStagesToBracketRounds } from "./TournamentBracket";

export default function BracketTreeIndex() {
  const [bracketRounds, setBracketRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchSchedule = async () => {
      try {
        const response = await fetch(
          "https://playdatesport.com/api/payments/match_schedule/?id=TUR0000006",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("API response:", data);

        // Assuming API returns stages or matches
        // const rounds = convertStagesToBracketRounds(data);
        const rounds = data;
        setBracketRounds(rounds);
      } catch (error) {
        console.error("Failed to fetch match schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchSchedule();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  // console.log("bracketRounds", bracketRounds)

  return (
    <div className="min-h-screen">
      <BracketTree rounds={bracketRounds} />
    </div>
  );
}
