import React, {useState} from "react";

// import "../../Styles/styles.css"


export default function Accordion(props) {

  
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="accordion">
        

        {props.subs.map((item, index) => (
        <div className="learnAccordionItem" key={index}>
          <div className="learnAccordionItemHeader">
            <h4>{item.sub_name}</h4>
            <h5>Definition:</h5>
            <p>{item.definition}</p>
            <div className="learnAccordionItemHeaderExpand">
              <button onClick={() => setShowMore(!showMore)}>{!showMore ? "Show More" : "Show Less"}</button>
            </div>
          </div>

            {showMore && (
              <div>
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
            )}
        </div>
      ))}

    </div>
  );
}
