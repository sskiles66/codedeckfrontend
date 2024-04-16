
import React from "react";

// import "../../Styles/styles.css"

export default function Hero() {

  

  return (
    <div className="hero-container">
        <div className="hero-img">
            <img src="hero2.jpg"/>

            <div className="heroSearchContainer">
                <input
                    type="text"
                    className="heroSearch"
                    placeholder="Search data..."
                    // value={value}
                    // onChange={(e) => {
                    //   setValue(e.target.value); // Update the search input value
                    // }}
                />
            </div>

        </div>
    </div>
  );
}