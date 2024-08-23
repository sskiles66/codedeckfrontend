import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function Score() {

    const { score, isRunning } = useContext(GameContext);


    return (
        isRunning ?
        <div className="gameScore">
            <p>Score: {score}</p>
        </div>
        : ""
    );
}