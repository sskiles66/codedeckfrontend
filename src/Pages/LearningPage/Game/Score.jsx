import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function Score() {

    const { score, setScore, isRunning, setIsRunning, questionNum } = useContext(GameContext);


    return (
        <div className="gameScore">
            <p>Score: {score}</p>
            <p>questionNumber: {questionNum}</p>
        </div>
    );
}