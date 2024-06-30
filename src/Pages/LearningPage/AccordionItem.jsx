import React, { useState } from "react";

export default function AccordionItem(props) {

  const [showMore, setShowMore] = useState(false);

  return (
    <div className="learnAccordionItem" key={props.index}>
      <div className="learnAccordionItemHeader">
        <h2>{props.item.sub_name}</h2>
        <h3>Definition:</h3>
        <p>{props.item.definition}</p>
        <div className="learnAccordionItemHeaderExpand">
          <button onClick={() => setShowMore(!showMore)}>{!showMore ? "Show More" : "Show Less"}</button>
        </div>
      </div>

      {showMore && (
        <div>
          <hr></hr>
          {/* Image and audio will eventually be included */}
          <div className="learnAccordionGrid">
            <div className="learnAccordionAnalogy">
              <h4>Analogy:</h4>
              <p>{props.item.analogy}</p>
            </div>
            <div className="learnAccordionMnemonics">
              <h4>Mnemonics:</h4>
              <p>{props.item.mnemonics}</p>
            </div>
            <div className="learnAccordionImage">
              <h4>Image:</h4>
              <img src={`${props.item.image}`} alt="Your Image" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
