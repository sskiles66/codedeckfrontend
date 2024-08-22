import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function GameSummary() {

    const { score, timer, isGameOver } = useContext(GameContext);

    return (
          isGameOver ? (
            <div className="gameSummary">
              <h2>Game Results</h2>
              <p>Final Score: {score}</p>
              <p>Final Time: {timer}</p>
            </div>
          ) : (
              ""
          )
      );
}