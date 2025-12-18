import { useState } from "react";
import { BracketMatch } from "./BracketMatch";

function getLevelLabel(roundName, index) {
  const lowerName = roundName.toLowerCase();

  if (lowerName.includes("semi")) return "Semi-Final";
  if (lowerName.includes("final")) return "Final";
  if (lowerName.includes("quarter")) return "Quarter-Final";
  if (lowerName.includes("16")) return "Round of 16";
  if (lowerName.includes("8")) return "Round of 8";
  if (lowerName.includes("group")) return "Group Stage";

  return `Level ${index + 1}`;
}

export function BracketTree({ rounds }) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 sm:py-12 md:pt-20 lg:pt-24 px-4 sm:px-6">
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
      <div className="mb-8 sm:mb-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-2">
            Cricket Tournament
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600">World Cup 2024 - Tournament Bracket</p>
          <div className="mt-4 sm:mt-6 flex justify-center gap-4 sm:gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-600"></div>
              <span className="text-slate-700 text-xs sm:text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-700 text-xs sm:text-sm">Live</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400"></div>
              <span className="text-amber-700 text-xs sm:text-sm">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        {rounds.map((round, roundIndex) => (
          <div key={round.name} className="w-full">
            <div className="mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 uppercase tracking-wide">
                {getLevelLabel(round.name, roundIndex)}
              </h2>
              <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1 sm:mt-2"></div>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {round.matches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match)}
                    className="transition-transform duration-200 hover:scale-105 cursor-pointer"
                  >
                    <BracketMatch match={match} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMatch && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Match Details</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-slate-600 text-xs sm:text-sm mb-2">Team 1</p>
                <p className="text-black font-semibold text-base sm:text-lg">
                  {selectedMatch.team1?.name || "TBD"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="text-slate-600 px-2 text-xs sm:text-sm">VS</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-slate-600 text-xs sm:text-sm mb-2">Team 2</p>
                <p className="text-black font-semibold text-base sm:text-lg">
                  {selectedMatch.team2?.name || "TBD"}
                </p>
              </div>

              {selectedMatch.winner && (
                <div className="bg-slate-100 border border-slate-400 rounded-lg p-4 mt-4">
                  <p className="text-slate-700 text-xs sm:text-sm mb-1">Winner</p>
                  <p className="text-slate-900 font-semibold text-base sm:text-lg">
                    {selectedMatch.winner.name}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-1">Venue</p>
                  <p className="text-black text-xs sm:text-sm line-clamp-2">{selectedMatch.venue || "TBD"}</p>
                </div>
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm mb-1">Date</p>
                  <p className="text-black text-xs sm:text-sm">{selectedMatch.date || "TBD"}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedMatch.status === "completed"
                      ? "bg-slate-100 text-slate-700"
                      : selectedMatch.status === "live"
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {selectedMatch.status.charAt(0).toUpperCase() +
                    selectedMatch.status.slice(1)}
                </span>
                <span className="flex justify-end">
                  <button
                    onClick={() => setSelectedMatch(null)}
                    className="px-6 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
                  >
                    Close
                  </button>

                </span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
