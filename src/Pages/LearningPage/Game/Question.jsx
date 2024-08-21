import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function Question(props) {

    const { isRunning, setCorrectAnswer } = useContext(GameContext);

    const [randomSubTopicProperty, setRandomSubTopicProperty] = useState({});

    const [validProperties, setValidProperties] = useState([]);

    const [randomIndex, setRandomIndex] = useState()

    const [count, setCount] = useState(0);

    useEffect(() => {
        function getRandomSubTopic() {
            if (props.subTopics.length > 0) {
                const randomIndex = Math.floor(Math.random() * props.subTopics.length);
                setRandomIndex(randomIndex);
                const randomTopic = props.subTopics[randomIndex];

                const validProps = [];

                if (randomTopic.analogy){
                    validProps.push(randomTopic.analogy)
                }
                if (randomTopic.definition){
                    validProps.push(randomTopic.definition)
                }
                if (randomTopic.mnenomics){
                    validProps.push(randomTopic.mnenomics)
                }
                if (randomTopic.image){
                    validProps.push(randomTopic.image)
                }
                
                setValidProperties(validProps);          
            }
        }
        if (isRunning == true && count == 0){
            getRandomSubTopic();
            setCount(1);
        }
    }, [isRunning]);


    useEffect(() => {
        function getStuff() {
            const randomIndex2 = Math.floor(Math.random() * validProperties.length);
            setRandomSubTopicProperty({ ["propName"] : validProperties[randomIndex2], ["propIndex"] : randomIndex });
            setCorrectAnswer(randomIndex);
        }
        if (count == 1){
            getStuff();
            setCount(0);
        }
    }, [count])


    return (

        <div className="gameQuestion">
            {isRunning && <p>Question</p>}
            {/* {isRunning && props.subTopics.map((item, index) => (
                <div key={index}>
                    <p>{item.sub_name}</p>
                </div>
            ))} */}
            {isRunning && <p>Match this: {randomSubTopicProperty.propName}</p>}
            {isRunning && <p>Indx: {randomSubTopicProperty.propIndex}</p>}
            {/* {isRunning && <p>: {props.subTopics[propIndex].sub_name}</p>} */}
        </div>
    );
}