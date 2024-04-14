
import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    async function test(){
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/test", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Add any other custom headers here if needed
        },
      });
    
      console.log('Response:', response.data);

    }

    if (user && isAuthenticated){
      test();
    }

  }, []);

  async function handlePageCreation(e){
    e.preventDefault();
    try {
      const createUserResponse = await axios.post(
          'http://localhost:4000/api/learningPage/create',
          {
              name: "Title", 
              image: "image goes here", 
              summary: "Summary goes here", 
              sub_topics: [], 
              creator: user.sub, 
              
          }
      );

      console.log('User data saved:', createUserResponse.data);
      navigate(`/learningPage/${createUserResponse.data._id}`);
    } catch (error) {
        console.error('Error saving user data:', error);
    }
  }

  

  return (
    <div className="placeholder">
      <h1>Profile Page</h1>
      {isAuthenticated ? <p>{JSON.stringify(user)}</p> : ""}
      {/* {isAuthenticated ? <button onClick={handleAccountSave}>Save Account</button> : ""} */}
      {isAuthenticated ? <button onClick={handlePageCreation}>Make a page</button> : ""}
    </div>
  );
}