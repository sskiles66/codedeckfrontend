import React, { useState } from "react";
import { GameContextProvider } from "./GameContext";
import StopWatch from "./StopWatch";
import Score from "./Score";
import Answers from "./Answers";
import Question from "./Question";
import GameSummary from "./GameSummary";
import QuestionNumber from "./QuestionNumber";
import GameInstructions from "./GameInstructions";


export default function Game(props) {

//   const [showMore, setShowMore] = useState(false);

  return (
    <div className="game">
        <GameContextProvider>

            <GameInstructions />

            <StopWatch />
            <Score />
            <QuestionNumber />
            <Answers subTopics={props.subTopics}/>
            <Question subTopics={props.subTopics}/>
            <GameSummary />
            
        </GameContextProvider>
    </div>
  );
}