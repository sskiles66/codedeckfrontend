import React, { useState, useEffect, useContext } from "react";
import { GameContext } from "./GameContext";

export default function Question(props) {

    const { isRunning } = useContext(GameContext);

    const [randomSubTopicProperty, setRandomSubTopicProperty] = useState(null);

    const [validProperties, setValidProperties] = useState([]);

    useEffect(() => {
        async function getRandomSubTopic() {
            if (props.subTopics.length > 0) {
                const randomIndex = Math.floor(Math.random() * props.subTopics.length);
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
                const randomIndex2 = Math.floor(Math.random() * validProperties.length);
                setRandomSubTopicProperty(validProperties[randomIndex2]);            
            }
        }
        getRandomSubTopic();
    }, [isRunning]);


    return (

        <div className="gameQuestion">
            {isRunning && <p>Question</p>}
            {/* {isRunning && props.subTopics.map((item, index) => (
                <div key={index}>
                    <p>{item.sub_name}</p>
                </div>
            ))} */}
            {isRunning && <p>Match this: {randomSubTopicProperty}</p>}
        </div>
    );
}