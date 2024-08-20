import React, { useState, useContext } from "react";
import { GameContext } from "./GameContext";

export default function Answers(props) {

    const { isRunning } = useContext(GameContext);
    console.log(props.subTopics)

    return (


        <div className="gameAnswers">
            {isRunning && <p>Answers:</p>}
            {isRunning && props.subTopics.map((item, index) => (
                <div key={index}>
                    <p>{item.sub_name}</p>
                </div>
            ))}
        </div>
    );
}