import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function GameSummary() {

    const { score, timer, isGameOver, setIsGameOver, setQuestionNum, setScore, setTimer  } = useContext(GameContext);

    function restartGame(e){
        e.preventDefault();
        setIsGameOver(false);
        setQuestionNum(1);
        setScore(0);
        setTimer(0);
    }

    return (
          isGameOver ? (
            <div className="gameSummary">
              <h2>Game Results</h2>
              <p>Final Score: {score}</p>
              <p>Final Time: {timer}</p>
              <button onClick={restartGame}>Click To Play Again</button>
            </div>
          ) : (
              ""
          )
      );
}