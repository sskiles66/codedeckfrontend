import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LeaderBoard from "./LeaderBoard";
import Accordion from "./Accordion";
import axios from "axios";
import EditMain from "./EditMain";
import EditSub from "./EditSub";

export default function LearningPage() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [pageData, setPageData] = useState();
  const [role, setRole] = useState();
  const { id } = useParams();
  const [reFetch, setReFetch] = useState(false);
  const [showMainEdit, setShowMainEdit] = useState(false);
  const [showSubEdit, setShowSubEdit] = useState(false);

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

  async function handleEditSubmit(e) {
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
      setPageData({ ...pageData, isLocked: !pageData.isLocked });
    } catch (error) {
      console.error('Error making PATCH request:', error);
    }
  }


  return (
    <div className="learningPageContainer">

      {pageData ? (
        <>
          <p>{pageData.isLocked ? "Locked" : "Not locked"}</p>
          {(role == "creator" || pageData.isLocked == false) && (
            <>
              {role == "creator" && (
                <>
                  <button disabled={pageData.sub_topics.length < 5} onClick={handleEditSubmit}>{pageData.isLocked ? "Click To Unlock" : "Click To Lock"}</button>
                  {pageData.sub_topics.length < 5 ? <p>Need at least 5 sub topics to unlock your page</p> : ""}
                </>
              )}
              <div className="summaryContainer">

                <h1>{pageData.name}</h1>

                {/* COme back to this once game is good to go */}
                {/* <LeaderBoard /> */}

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


// {isLoading ? (
//   // Display loading indicator while data is fetching
//   <div className="loading">Loading...</div>
// ) : pageData ? (
//   <>
//     {/* Your existing content goes here */}
//     <div className="summaryContainer">
//       <h1>{pageData.name}</h1>

//       {/* COme back to this once game is good to go */}
//       {/* <LeaderBoard /> */}

//       <p className="summary">{pageData.summary}</p>

//       {role === "creator" && (
//         <>
//           <button className="summaryEditButton" onClick={() => setShowMainEdit(!showMainEdit)}>Edit Main Info</button>
//           {showMainEdit && <EditMain reFetch={reFetch} onReFetch={setReFetch} />}
//         </>
//       )}
//     </div>

//     <div className="accordionContainer">
//       <Accordion subs={pageData.sub_topics} />

//       {role === "creator" && (
//         <>
//           <button onClick={() => setShowSubEdit(!showSubEdit)}>Add Sub Topic</button>
//           {showSubEdit && <EditSub reFetch={reFetch} onReFetch={setReFetch} />}
//         </>
//       )}
//     </div>
//   </>
// ) : (
//   // Display message when no data is available
//   <div className="no-data">No data found.</div>
// )}