import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function GameInstructions() {

    const { isRunning, setIsRunning } = useContext(GameContext);

    return (
        !isRunning ?
        <div className="gameInstructions">
            <h2>GAME</h2>
            <button onClick={() => setIsRunning(true)}>Click To Start Game</button>
        </div>
        : ""
    );
}