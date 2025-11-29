export function BracketMatch({ match }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "border-slate-400 bg-white";
      case "live":
        return "border-green-500 bg-white ring-2 ring-green-300";
      case "pending":
        return "border-amber-300 bg-white";
      default:
        return "border-slate-300 bg-white";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "completed":
        return "bg-slate-600";
      case "live":
        return "bg-green-500 animate-pulse";
      case "pending":
        return "bg-amber-400";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div
      className={`border rounded-lg p-2 sm:p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${getStatusColor(match.status)}`}
    >
      <div className="flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
        <div className={`w-2 h-2 rounded-full ${getStatusDot(match.status)}`}></div>
        <span
          className={`text-xs font-semibold uppercase tracking-tight ${
            match.status === "live"
              ? "text-green-700"
              : match.status === "pending"
                ? "text-amber-700"
                : "text-slate-700"
          }`}
        >
          {match.status === "completed" ? "Complete" : match.status === "live" ? "Live" : "Pending"}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-1.5">
        <div
          className={`p-1 sm:p-1.5 rounded text-xs font-semibold transition-all ${
            match.winner?.id === match.team1?.id && match.status === "completed"
              ? "bg-white text-slate-900 border-2 border-slate-500"
              : "bg-white text-black border border-slate-200"
          }`}
        >
          {match.team1 ? (
            <span className="line-clamp-1">
              <span className="text-sm mr-0.5">{match.team1.flag}</span>
              <span className="hidden sm:inline">{match.team1.name.substring(0, 12)}</span>
              <span className="sm:hidden">{match.team1.name.substring(0, 8)}</span>
            </span>
          ) : (
            <span className="text-slate-400">TBD</span>
          )}
        </div>

        <div className="flex justify-center py-0.5">
          <span className="text-xs text-slate-300 font-bold">vs</span>
        </div>

        <div
          className={`p-1 sm:p-1.5 rounded text-xs font-semibold transition-all ${
            match.winner?.id === match.team2?.id && match.status === "completed"
              ? "bg-white text-slate-900 border-2 border-slate-500"
              : "bg-white text-black border border-slate-200"
          }`}
        >
          {match.team2 ? (
            <span className="line-clamp-1">
              <span className="text-sm mr-0.5">{match.team2.flag}</span>
              <span className="hidden sm:inline">{match.team2.name.substring(0, 12)}</span>
              <span className="sm:hidden">{match.team2.name.substring(0, 8)}</span>
            </span>
          ) : (
            <span className="text-slate-400">TBD</span>
          )}
        </div>
      </div>

      {match.winner && match.status === "completed" && (
        <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-600 font-bold line-clamp-1">
            🏆 {match.winner.name.substring(0, 10)}
          </p>
        </div>
      )}
    </div>
  );
}
