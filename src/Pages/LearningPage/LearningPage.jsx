import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LeaderBoard from "./LeaderBoard";
import Accordion from "./Accordion";
import axios from "axios";
import EditMain from "./EditMain";
import EditSub from "./EditSub";
import Game from "./Game/Game";
import Message from "../../SharedComponents/Message";

export default function LearningPage() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [pageData, setPageData] = useState();
  const [role, setRole] = useState();
  const { id } = useParams();
  const [reFetch, setReFetch] = useState(false);
  const [showMainEdit, setShowMainEdit] = useState(false);
  const [showSubEdit, setShowSubEdit] = useState(false);
  const [message, setMessage] = useState();

  // Get all page data
  useEffect(() => {
    async function fetchPageData() {
      const response = await axios.get(`http://localhost:4000/api/learningPage/get-page/${id}`);
      console.log('Response:', response.data);
      setPageData(response.data);
    }

    fetchPageData();

  }, [reFetch]); // Refetch is for when editing, changes kinda happen in real time.

  // Figures out if user is the creator or not
  useEffect(() => {
    async function setTheRole() {
      if (pageData.creator == user.sub) {
        setRole("creator");
      } else {
        setRole("visitor");
      }
    }

    if (pageData && isAuthenticated) {
      setTheRole();
    }

  }, [pageData, isAuthenticated]);

  // Timer for lifecycle for message component
  useEffect(() => {

    async function setTimerOnMessageComponent() {
      const timerId = setTimeout(() => {
        setMessage();
      }, 3000); 

      // Clear the timer if the state changes before it expires
      return () => clearTimeout(timerId);
    }

    if (message) {
      setTimerOnMessageComponent();
    }

  }, [message]);

  async function handleChangeLockedState(e) {
    e.preventDefault();
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.patch("http://localhost:4000/api/learningPage/edit-lock", {
        isLocked: pageData.isLocked,
        page_id: id,
      },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Add any other custom headers here if needed
          },
        });

      // console.log('Response:', response.data);
      // onReFetch(!reFetch);
      // toggle(false);
      console.log(pageData);
      // console.log(response.status);
      if (response.status == 200) {
        setMessage({messageType: "Good", message: ["Your request worked"]})
      }
      setPageData({ ...pageData, isLocked: !pageData.isLocked });
    } catch (error) {
      console.error('Error making PATCH request:', error);
    }
  }

  return (
    <div className="learningPageContainer">

      {pageData ? (
        <>
          {/* FOr debugging purposes <p>{pageData.isLocked ? "Locked" : "Not locked"}</p> */}
          {(role == "creator" || pageData.isLocked == false) && (
            <>
              {role == "creator" && (
                <>
                  <button className="lockButton" disabled={pageData.sub_topics.length < 5} onClick={handleChangeLockedState}>{pageData.isLocked ? "Click To Unlock Your Page" : "Click To Lock Your Page"}</button>
                  {pageData.sub_topics.length < 5 ? <p>Need at least 5 sub topics to unlock your page</p> : ""}
                </>
              )}
              <div className="summaryContainer">

                <h1>{pageData.name}</h1>

                <p className="summary">{pageData.summary}</p>

                {/* Editor privledges */}
                {role === "creator" && (
                  <>
                    {/* Button */}
                    <button className="summaryEditButton" onClick={() => setShowMainEdit(!showMainEdit)}>Edit Main Info</button>
                    {/* Modal */}
                    {showMainEdit && <EditMain reFetch={reFetch} onReFetch={setReFetch} toggle={setShowMainEdit} />}
                  </>
                )}
              </div>

              <LeaderBoard />

              <div className="accordionContainer">
                <Accordion subs={pageData.sub_topics} />

                {/* Editor privledges */}
                {role === "creator" && (
                  <>
                    {/* Button */}
                    <button onClick={() => setShowSubEdit(!showSubEdit)}>Add Sub Topic</button>
                    {/* Modal */}
                    {showSubEdit && <EditSub reFetch={reFetch} onReFetch={setReFetch} toggle={setShowSubEdit} />}
                  </>
                )}
              </div>

              <p>This is where the game will be</p>
              <Game subTopics={pageData.sub_topics}/>
              {message && (
                <Message message={message}/>
              )}
            </>
          )}
          {(pageData.isLocked && role != "creator") && (
            <p>This page is locked</p>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}



// Use this for the props for the Game:
// <Accordion subs={pageData.sub_topics} />
