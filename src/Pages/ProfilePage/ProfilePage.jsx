
import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import MadeCards from "./MadeCards";

export default function ProfilePage() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [madePages, setMadePages] = useState([]);

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

  useEffect(() => {
    async function getPagesForUser(){
      // const accessToken = await getAccessTokenSilently();
      // const response = await axios.get("http://localhost:4000/test", {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //     // Add any other custom headers here if needed
      //   },
      // });

      const response = await axios.get(`http://localhost:4000/api/learningPage/get-pages-by-user/${user.sub}`);
    
      console.log('Response:', response.data);

      setMadePages(response.data);

    }

    if (user && isAuthenticated){
      getPagesForUser();
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

      <MadeCards cards={madePages}/>

      {isAuthenticated ? <button onClick={handlePageCreation}>Make a page</button> : ""}
    </div>
  );
}