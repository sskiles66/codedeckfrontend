
import React, {useState} from "react";

import "../Styles/global.css"

import { CgProfile } from "react-icons/cg";

import { useAuth0 } from "@auth0/auth0-react";

import { Link } from "react-router-dom";



export default function Navbar() {


  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const [profileToggle, setProfileToggle] = useState(false);


  

  return (
    <div className="nav-container">
      <img className="logo" src="plogo.png" />
      <input
        type="text"
        className="searchbar"
        placeholder="Search data..."
        // value={value}
        // onChange={(e) => {
        //   setValue(e.target.value); // Update the search input value
        // }}
      />
      <p className="stats">Stats</p>
      <div className="profile">
        <button onClick={() => setProfileToggle(!profileToggle)}>
          <CgProfile />
        </button>
        {profileToggle ? (
          <div>
            {isAuthenticated ? (
              <>
                <Link to="/profilePage" type="button">See Profile</Link>
                <button onClick={() => logout()}>Logout</button>
              </> 
            ) : (
              <button onClick={() => loginWithRedirect()}>Log in</button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}