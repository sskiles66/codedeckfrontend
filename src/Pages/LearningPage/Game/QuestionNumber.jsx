import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function QuestionNumber() {

    const { questionNum, isRunning } = useContext(GameContext);


    return (
        isRunning ?
        <div className="gameQuestionNumber">
            <p>Question #{questionNum}</p>
        </div>
        : ""
    );
}