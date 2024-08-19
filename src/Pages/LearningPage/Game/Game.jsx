import React, { useState } from "react";
import { GameContextProvider } from "./GameContext";
import StopWatch from "./StopWatch";
import Score from "./Score";


export default function Game() {

//   const [showMore, setShowMore] = useState(false);

  return (
    <div className="game">
        <GameContextProvider>
            <StopWatch />
            <Score />
        </GameContextProvider>
    </div>
  );
}