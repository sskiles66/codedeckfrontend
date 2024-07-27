import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cards from "../../SharedComponents/Cards";

export default function ProfilePage() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [madePages, setMadePages] = useState([]);
  const [isCreationStepDoneOrPassed, setIsCreationStepDoneOrPassed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    async function setRedirectKey() {
      localStorage.setItem('redirect', 'false');
    }

    async function handleUserCreation() {
      try {
        const accessToken = await getAccessTokenSilently();

        const createUserResponse = await axios.post(
          'http://localhost:4000/api/learningPage/create-user',
          {
            name: user.name,
            sub_id: user.sub,
            games_played: 0,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // Add any other custom headers here if needed
            },
          }
        );
  
        console.log('User data saved:', createUserResponse.data);

        // Set this when creation is done
        setIsCreationStepDoneOrPassed(true);

      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }

    // If the user is logged, redirected here and if they don't have a key, set the key so the user does not keep being redirected here
    if (isAuthenticated && localStorage.getItem('redirect') !== 'false'){
      setRedirectKey();
      handleUserCreation();
    }else{
      // Just sets right away if not creating a new user
      setIsCreationStepDoneOrPassed(true);
    }

  }, [isAuthenticated]);

  // Gets user data, can forsee issues with asynchrnousity
  useEffect(() => {

    if (isCreationStepDoneOrPassed){
      console.log("display data now");
    }

  }, [isCreationStepDoneOrPassed]);

  // Gets pages that user has made
  useEffect(() => {
    async function getPagesForUser() {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`http://localhost:4000/api/learningPage/get-pages-by-user/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Add any other custom headers here if needed
        },
      });
      // console.log('Response:', response.data);
      setMadePages(response.data);
    }

    if (user && isAuthenticated) {
      getPagesForUser();
    }

  }, [user, isAuthenticated]); //Dependicies are so that even if the page is refreshed, this effect hook still runs

  // Posts new page and navigates to it
  async function handlePageCreation(e) {
    e.preventDefault();
    try {
      const accessToken = await getAccessTokenSilently();
      const createUserResponse = await axios.post(
        'http://localhost:4000/api/learningPage/create',
        {
          name: "Title",
          summary: "Summary goes here",
          sub_topics: [],
          creator: user.sub,
          isLocked: true

        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Add any other custom headers here if needed
          },
        }
      );

      // console.log('User data saved:', createUserResponse.data);
      navigate(`/learningPage/${createUserResponse.data._id}`);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  return (
    <div className="profilePageContainer">
      {isAuthenticated ? <p>{JSON.stringify(user)}</p> : ""}

      {user ? <h1>{user.name}</h1> : ""}

      {user && isAuthenticated ?
        <div className="profileDataContainer">
          <div className="profileDataImageContainer">
            <img src={user?.picture} alt="Image of user" />
          </div>
          <div className="profileDataDataContainer">
            <p>Data: hjkfhdjsfkhdk</p>
            <p>Data: hjkfhdjsfkhdk</p>
            <p>Data: hjkfhdjsfkhdk</p>
            <p>Data: hjkfhdjsfkhdk</p>
            <p>Data: hjkfhdjsfkhdk</p>
          </div>
        </div>
        : ""}

      <Cards cards={madePages} title="Your Created Pages" />

      {isAuthenticated ?
        <div className="profileMakePageButtonContainer">
          <button className="profileMakePageButton" onClick={handlePageCreation}>Make a page</button>
        </div>
        : ""}

    </div>
  );
}