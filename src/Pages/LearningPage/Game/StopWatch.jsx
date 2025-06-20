import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function StopWatch() {

    const { timer, setTimer, isRunning, setIsRunning, isGameOver } = useContext(GameContext);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isRunning && !isGameOver){
                setTimer(timer + 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer, isRunning]);


    const formatTime = (time) => {
        const seconds = time % 60;
        const minutes = Math.floor(time / 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return (
        isRunning ?
        <div className="gameTimer">
            <p>Time: {formatTime(timer)}</p>
        </div>
        : ""
    );
}