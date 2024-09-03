import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Cards from "../../SharedComponents/Cards";
import ProfileInfo from "./ProfileInfo";
import CreatePageButton from "./CreatePageButton";
import returnBaseUrl from "../../getUrl";

export default function ProfilePage() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [madePages, setMadePages] = useState([]);
  const [isCreationStepDoneOrPassed, setIsCreationStepDoneOrPassed] = useState(false);

  useEffect(() => {

    async function setRedirectKey() {
      localStorage.setItem('redirect', 'false');
    }

    async function handleUserCreation() {
      try {
        const accessToken = await getAccessTokenSilently();
        const createUserResponse = await axios.post(
          `${returnBaseUrl()}/api/learningPage/create-user`,
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
        // Set this when creation is done
        setIsCreationStepDoneOrPassed(true);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
    // If the user is logged, redirected here and if they don't have a key, set the key so the user does not keep being redirected here
    if (isAuthenticated && localStorage.getItem('redirect') !== 'false') {
      setRedirectKey();
      handleUserCreation();
    } else {
      // Just sets right away if not creating a new user
      setIsCreationStepDoneOrPassed(true);
    }

  }, [isAuthenticated]);

  // Gets pages that user has made
  useEffect(() => {
    async function getPagesForUser() {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${returnBaseUrl()}/api/learningPage/get-pages-by-user/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Add any other custom headers here if needed
        },
      });
      setMadePages(response.data);
    }
    if (user && isAuthenticated) {
      getPagesForUser();
    }
  }, [user, isAuthenticated]); //Dependicies are so that even if the page is refreshed, this effect hook still runs

  return (
    <div className="profilePageContainer">
      {/* For Debugging purposes {isAuthenticated ? <p>{JSON.stringify(user)}</p> : ""} */}

      {user ? <h1>{user.name}</h1> : ""}

      {user && isAuthenticated && isCreationStepDoneOrPassed ?
        <ProfileInfo />
        : ""}

      <Cards cards={madePages} title="Your Created Pages" />

      {isAuthenticated ?
        <CreatePageButton />
        : ""}

    </div>
  );
}