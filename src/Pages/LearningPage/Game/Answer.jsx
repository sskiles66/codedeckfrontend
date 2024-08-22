import React, { useState, useContext } from "react";
import { GameContext } from "./GameContext";

export default function Answer(props) {

    console.log(props.subTopics)

    const { questionNum, setQuestionNum, score, setScore, correctAnswer, isGameOver, setIsGameOver  } = useContext(GameContext);


    function checkAnswer(e){
        e.preventDefault();
        // console.log(correctAnswer);
        // console.log(props.keyAnswer);
        if (!isGameOver){
            if (correctAnswer == props.keyAnswer){
                setScore(score + 1);
            }
            setQuestionNum(questionNum + 1);
        }
    }

    return (
        <div className="gameAnswer">
            <button onClick={checkAnswer}>{props.answer.sub_name}</button>
        </div>
    );
}