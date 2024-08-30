import React, { useEffect } from "react";
import { Link } from 'react-router-dom'

export default function Message(props) {

//   console.log(props);

  return (
    <div className="message">

        {props.message.message.map((item, index) => (
            <p key={index} className={props.message.messageType == "Good" ? "good" : "bad"}>{item}</p>
        ))}

    </div>
  );
}