
import React from "react";
import Hero from "./Hero";
import MostRecent from "./MostRecent";
import MostPop from "./MostPop";
import Languages from "./Languages";
import "../../Styles/LandingPage.css"

export default function LandingPage() {

  

  return (
    <div className="hero">
      <p>LandingPage</p>
        <Hero />
        <MostRecent />
        <MostPop />
        <Languages />
    </div>
  );
}