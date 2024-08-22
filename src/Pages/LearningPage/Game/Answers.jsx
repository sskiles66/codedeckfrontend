import React, { useState, useContext } from "react";
import { GameContext } from "./GameContext";
import Answer from "./Answer";

export default function Answers(props) {

    const { isRunning } = useContext(GameContext);
    console.log(props.subTopics)

    return (
        isRunning ? (
            <div className="gameAnswers">
                {props.subTopics.map((item, index) => (
                    <Answer answer={item} key={index} keyAnswer={index} />
                ))}
            </div>
        ) : (
            ""
        )
    );
}