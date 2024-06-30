import React from "react";
import AccordionItem from "./AccordionItem";

export default function Accordion(props) {

  return (
    <div className="accordion">
      {props.subs.map((item, index) => (
        <AccordionItem item={item} index={index} />
      ))}

    </div>
  );
  
}
