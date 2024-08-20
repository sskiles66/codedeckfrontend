import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function StopWatch() {

    const { timer, setTimer, isRunning, setIsRunning } = useContext(GameContext);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isRunning){
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
        <div className="gameTimer">
            {isRunning ? <p>Time: {formatTime(timer)}</p> : <button onClick={() => setIsRunning(true)}>Click To Start</button>}
        </div>
    );
}