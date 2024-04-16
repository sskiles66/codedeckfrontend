
import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from 'react-router-dom'

export default function MadeCards(props) {

  console.log(props);

  return (
    <div className="cardContainer">
      {props.cards.map((item, index) => (
        
            <div className="card" key={index}>
                <Link to={`/learningPage/${item._id}`} key={item._id}>
                    <h1>{item.name}</h1>
                    <hr></hr>
                    <p>{item.summary}</p>
                </Link>
            </div>
        
      ))}
    </div>
  );
}