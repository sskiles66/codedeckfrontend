import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function Question(props) {

    const { isRunning, setCorrectAnswer, questionNum, setIsGameOver } = useContext(GameContext);

    const [randomSubTopicProperty, setRandomSubTopicProperty] = useState({});

    const [validProperties, setValidProperties] = useState([]);

    const [randomIndex, setRandomIndex] = useState()

    const [count, setCount] = useState(0);

    useEffect(() => {
        function getRandomSubTopic() {
            if (questionNum == 11) {
                setIsGameOver(true);
            }
            if (props.subTopics.length > 0) {
                const randomIndex = Math.floor(Math.random() * props.subTopics.length);
                setRandomIndex(randomIndex);
                const randomTopic = props.subTopics[randomIndex];

                const validProps = [];

                if (randomTopic.analogy) {
                    validProps.push(randomTopic.analogy)
                }
                if (randomTopic.definition) {
                    validProps.push(randomTopic.definition)
                }
                if (randomTopic.mnenomics) {
                    validProps.push(randomTopic.mnenomics)
                }
                // if (randomTopic.image) {
                //     validProps.push(randomTopic.image)
                // }

                setValidProperties(validProps);
            }
        }
        if (isRunning == true && count == 0) {
            getRandomSubTopic();
            setCount(1);
        }
    }, [isRunning, questionNum]);


    useEffect(() => {
        function setQuestion() {
            const randomIndex2 = Math.floor(Math.random() * validProperties.length);
            setRandomSubTopicProperty({ ["propName"]: validProperties[randomIndex2], ["propIndex"]: randomIndex });
            setCorrectAnswer(randomIndex);
        }
        if (count == 1) {
            setQuestion();
            setCount(0);
        }
    }, [count])


    return (

        isRunning ? (
            <div className="gameQuestion">
                <p>Question</p>
                <p>Match this: {randomSubTopicProperty.propName}</p>
                <p>Indx: {randomSubTopicProperty.propIndex}</p>
            </div>
        ) : ""

    );
}