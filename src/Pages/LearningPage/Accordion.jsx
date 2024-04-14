import React from "react";

// import "../../Styles/styles.css"


export default function Accordion(props) {
  return (
    <div className="accordion">
        

        {props.subs.map((item, index) => (
        <div key={index}>
          <h4>{item.sub_name}</h4>
          <hr></hr>
          <h5>mnemonics:</h5>
          <p>{item.mnemonics}</p>
          <h5>Definition:</h5>
          <p>{item.definition}</p>
        </div>
      ))}

    </div>
  );
}
