import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function QuestionNumber() {

    const { questionNum } = useContext(GameContext);


    return (
        <div className="gameQuestionNumber">
            <p>questionNumber: {questionNum}</p>
        </div>
    );
}