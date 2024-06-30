
import React, { useEffect } from "react";

import { Link } from 'react-router-dom'

export default function Cards(props) {

  // console.log(props);

  return (
    <div className="cardSectionContainer">
      <h2>{props.title}</h2>
      <div className="cardContainer">
        {props.cards.map((item, index) => (
          <Link to={`/learningPage/${item._id}`} key={item._id} style={{ textDecoration: 'none' }}>
            <div className="card" key={index}>
              <h1>{item.name}</h1>
              {/* <hr></hr> */}
              <p>{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}