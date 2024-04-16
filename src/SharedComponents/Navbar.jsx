
import React, {useState, useEffect} from "react";

import "../Styles/global.css"

import { CgProfile } from "react-icons/cg";

import { useAuth0 } from "@auth0/auth0-react";

import { Link } from "react-router-dom";

import axios from "axios";



export default function Navbar() {


  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const [profileToggle, setProfileToggle] = useState(false);


  async function handleLogin(){
    await loginWithRedirect();
    
  }  

  return (
    <div className="nav-container">
      <Link to="/" type="button"><img className="logo" src="/logo2.jpg" /></Link>
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
        <button className="profileButton" onClick={() => setProfileToggle(!profileToggle)}>
          <CgProfile className="profileIcon"/>
        </button>
        {profileToggle ? (
          <div className="navDropDown">
            {isAuthenticated ? (
              <>
                <button><Link to="/profilePage" type="button">See Profile</Link></button>
                <button onClick={() => logout()}>Logout</button>
              </> 
            ) : (
              <button onClick={() => handleLogin()}>Log in</button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}