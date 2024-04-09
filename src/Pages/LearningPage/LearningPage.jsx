import React from "react";

// import "../../Styles/styles.css"

import LeaderBoard from "./LeaderBoard";

import Accordion from "./Accordion";

export default function LearningPage() {
  return (
    <div className="learningPageContainer">

      <h1>Title</h1>

      <LeaderBoard />

      <div className="summary">
        <h2>Summary</h2>
        <p>SUmmary here</p>
      </div>
      
      <Accordion />

    </div>
  );
}
