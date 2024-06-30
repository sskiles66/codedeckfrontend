
import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import MostRecent from "./MostRecent";
import MostPop from "./MostPop";
import Languages from "./Languages";
import "../../Styles/LandingPage.css"
import Cards from "../../SharedComponents/Cards";
import axios from "axios";

export default function LandingPage() {

  const [mostRecentCards, setMostRecentCards] = useState([]);

  useEffect(() => {
    async function getPagesMostRecent() {

      const response = await axios.get(`http://localhost:4000/api/learningPage/get-pages-most-recent`);

      // console.log('Response:', response.data);

      setMostRecentCards(response.data);
    }

    getPagesMostRecent();

  }, []);

  return (
    <div className="hero">
      <Hero />
      <Cards cards={mostRecentCards} title="Made Cards" />
      {/* <hr></hr> */}
      {/* <MostRecent /> */}
      {/* <MostPop /> */}
      {/* <Languages /> */}
    </div>
  );
}