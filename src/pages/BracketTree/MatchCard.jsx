export function MatchCard({ match, onClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "from-green-500/20 to-green-600/10 border-green-500/30";
      case "live":
        return "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 ring-2 ring-yellow-400/20";
      case "pending":
        return "from-slate-700/20 to-slate-800/10 border-slate-600/30";
      default:
        return "from-slate-700/20 to-slate-800/10 border-slate-600/30";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "live":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "pending":
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-400";
      case "live":
        return "bg-yellow-400 animate-pulse";
      case "pending":
        return "bg-slate-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${getStatusColor(match.status)} backdrop-blur-sm border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusBadgeColor(match.status)}`}
        >
          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${getStatusDot(match.status)}`}></span>
          {match.status === "completed"
            ? "Completed"
            : match.status === "live"
              ? "Live"
              : "Pending"}
        </span>
      </div>

      <div className="space-y-2">
        <div
          className={`p-3 rounded-lg transition-all ${
            match.winner?.id === match.team1?.id && match.status === "completed"
              ? "bg-green-500/30 border border-green-400/50"
              : "bg-slate-800/50 border border-slate-700/30"
          }`}
        >
          <p className="text-white font-semibold text-sm">
            {match.team1 ? (
              <>
                <span className="text-lg mr-2">{match.team1.flag}</span>
                {match.team1.name}
              </>
            ) : (
              <span className="text-slate-400">TBD</span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-center py-1">
          <div className="flex-1 h-px bg-slate-600/50"></div>
          <span className="px-2 text-xs font-semibold text-slate-400 uppercase">
            vs
          </span>
          <div className="flex-1 h-px bg-slate-600/50"></div>
        </div>

        <div
          className={`p-3 rounded-lg transition-all ${
            match.winner?.id === match.team2?.id && match.status === "completed"
              ? "bg-green-500/30 border border-green-400/50"
              : "bg-slate-800/50 border border-slate-700/30"
          }`}
        >
          <p className="text-white font-semibold text-sm">
            {match.team2 ? (
              <>
                <span className="text-lg mr-2">{match.team2.flag}</span>
                {match.team2.name}
              </>
            ) : (
              <span className="text-slate-400">TBD</span>
            )}
          </p>
        </div>
      </div>

      {match.winner && match.status === "completed" && (
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <p className="text-xs text-slate-400 mb-1">Winner</p>
          <p className="text-sm font-bold text-green-300">
            {match.winner.flag} {match.winner.name}
          </p>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-slate-700/30">
        <p className="text-xs text-slate-400 truncate">{match.venue || "Venue TBD"}</p>
      </div>

      <div className="mt-2">
        <p className="text-xs text-purple-300/60 font-medium">Click for details</p>
      </div>
    </div>
  );
}
