import React from "react";

// import "../../Styles/styles.css"


export default function Accordion(props) {

  console.log(props);
  return (
    <div className="accordion">
        

        {props.subs.map((item, index) => (
        <div className="learnAccordionItem" key={index}>
          <h4>{item.sub_name}</h4>
          <h5>Definition:</h5>
          <p>{item.definition}</p>
          <hr></hr>
          {/* Image and audio will eventually be included */}
          <div className="learnAccordionGrid">
            <div>
              <h5>Analogy:</h5>
              <p>{item.analogy}</p>
            </div>
            <div>
              <h5>Mnemonics:</h5>
              <p>{item.mnemonics}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
