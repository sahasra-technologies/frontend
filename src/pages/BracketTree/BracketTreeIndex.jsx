import { BracketTree } from "./BracketTree";
import { convertStagesToBracketRounds } from "./TournamentBracket";

export default function BracketTreeIndex() {
  const bracketRounds = convertStagesToBracketRounds([]);

  return (
    <div className="min-h-screen">
      <BracketTree rounds={bracketRounds} />
    </div>
  );
}
