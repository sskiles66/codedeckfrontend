
import React, {useState, useEffect} from "react";

import axios from "axios";

import { Link } from 'react-router-dom'

// import "../../Styles/styles.css"

export default function MostRecent() {

    const [mostRecentCards, setMostRecentCards] = useState([]);

    useEffect(() => {
        async function getPagesMostRecent(){
          
          const response = await axios.get(`http://localhost:4000/api/learningPage/get-pages-most-recent`);
        
          console.log('Response:', response.data);
    
          setMostRecentCards(response.data);
    
        }
    
        
        getPagesMostRecent();
        
    
      }, []); 
    

  return (
    <div className="mrmpContainer">
        <h1>Most Recent Plaeholder for now</h1>
        <div className="cardContainer">
              {mostRecentCards && (
                  mostRecentCards.map((item, index) => (
                      <Link to={`/learningPage/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
                          <div className="card" key={index}>
                              <h1>{item.name}</h1>
                              <hr />
                              <p>{item.summary}</p>
                          </div>
                      </Link>
                  ))
              )}
        
        </div>
    </div>
  );
}