import { createContext, useState, useEffect } from "react";
// import axios from "axios";

export const GameContext = createContext({});

export function GameContextProvider({ children }) {

    //   A timer  
    // A score
    // An asnwers container  
    // A single answer   
    // A question

    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [score, setScore] = useState(0);
    const [questionNum, setQuestionNum] = useState(1);
    const [correctAnswer, setCorrectAnswer] = useState();



    return (
        <GameContext.Provider
            value={{
                timer,
                setTimer,
                isRunning,
                setIsRunning,
                score,
                setScore,
                questionNum,
                setQuestionNum,
                correctAnswer,
                setCorrectAnswer
            }}
        >
            {children}
        </GameContext.Provider>
    );
}