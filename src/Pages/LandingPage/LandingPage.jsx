import React, { useState, useEffect } from "react";
import Hero from "./Hero";
// import MostRecent from "./MostRecent";
// import MostPop from "./MostPop";
// import Languages from "./Languages";
import Cards from "../../SharedComponents/Cards";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import returnBaseUrl from "../../getUrl";

export default function LandingPage() {

  const [mostRecentCards, setMostRecentCards] = useState([]);
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {

    async function getPagesMostRecent() {
      const response = await axios.get(`${returnBaseUrl()}/api/learningPage/get-pages-most-recent`);
      // console.log('Response:', response.data);
      setMostRecentCards(response.data);
    }

    getPagesMostRecent();

  }, []);

  useEffect(() => {

    async function redirectToProfile() {
      navigate(`/profilePage`);
    }

    async function clearRedirectKey() {
      try {
        localStorage.removeItem('redirect'); 
      } catch (error) {
        console.error('Error removing key from localStorage:', error);
      }
    }

    // IF user is logged in and a redirect key has not been set
    if (isAuthenticated && localStorage.getItem('redirect') !== 'false'){
      redirectToProfile();
    }

    // if user is not logged in and they have a redirect key set (we want a key to be set only when they log in for the first time)
    if (!isAuthenticated && localStorage.getItem('redirect') === 'false'){
      clearRedirectKey();
    }

  }, [isAuthenticated]);

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