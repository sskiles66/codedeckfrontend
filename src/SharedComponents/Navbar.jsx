import React, {useState} from "react";
import "../Styles/global.css"
import { CgProfile } from "react-icons/cg";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [profileToggle, setProfileToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  async function handleLogin(){
    await loginWithRedirect();
  }  

  function handleSubmit(e){
    e.preventDefault();
    navigate(`/queryPage/${searchTerm}`); // Redirect with search term in query string
  }

  return (
    <div className="navContainer">
      <div className="navItems">
        {/* Logo */}
        <div className="logoContainer">
          <Link to="/" id="logo" type="button"><h2>CodeDeck</h2></Link>
        </div>
        {/* Searchbar */}
        <form className="searchbarContainer" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search data..."
            className="searchbar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {/* <p className="stats">Stats</p> */}
        {/* Profile */}
        <div className="profile">
          <button className="profileButton" onClick={() => setProfileToggle(!profileToggle)}>
            <CgProfile className="profileIcon" />
          </button>
          {/* Dropdown */}
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
    </div>
  );
}