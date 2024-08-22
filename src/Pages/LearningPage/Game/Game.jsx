import React, { useState } from "react";
import { GameContextProvider } from "./GameContext";
import StopWatch from "./StopWatch";
import Score from "./Score";
import Answers from "./Answers";
import Question from "./Question";
import GameSummary from "./GameSummary";
import QuestionNumber from "./QuestionNumber";


export default function Game(props) {

//   const [showMore, setShowMore] = useState(false);

  return (
    <div className="game">
        <GameContextProvider>
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