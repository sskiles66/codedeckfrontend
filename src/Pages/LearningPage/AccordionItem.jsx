import React, {useState} from "react";

// import "../../Styles/styles.css"


export default function AccordionItem(props) {

  
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="learnAccordionItem" key={props.index}>
          <div className="learnAccordionItemHeader">
            <h4>{props.item.sub_name}</h4>
            <h5>Definition:</h5>
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
                    <h5>Analogy:</h5>
                    <p>{props.item.analogy}</p>
                  </div>
                  <div className="learnAccordionMnemonics">
                    <h5>Mnemonics:</h5>
                    <p>{props.item.mnemonics}</p>
                  </div>
                  <div className="learnAccordionImage">
                    <h5>Image:</h5>
                    <img src={`${props.item.image}`} alt="Your Image" />
                  </div>
                </div>
              </div>
            )}
        </div>
  );
}
