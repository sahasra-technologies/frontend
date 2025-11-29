import { MatchCard } from "./MatchCard";

export function TournamentStage({
  stage,
  isFirst,
  onMatchClick,
}) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {stage.name}
        </h2>
        <div className="mt-2 h-1 w-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
      </div>

      <div
        className={`grid gap-6 ${
          stage.matches.length === 1
            ? "grid-cols-1 max-w-md"
            : stage.matches.length === 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-full"
        }`}
      >
        {stage.matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onClick={() => onMatchClick(match)}
          />
        ))}
      </div>

      {!isFirst && (
        <div className="mt-8 hidden sm:block">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-l-2 border-t-2 border-purple-400/30 rounded-tl-lg"></div>
          </div>
        </div>
      )}
    </div>
  );
}
