import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LeaderBoard from "./LeaderBoard";
import Accordion from "./Accordion";
import axios from "axios";
import EditMain from "./EditMain";
import EditSub from "./EditSub";

export default function LearningPage() {

  const { user, isAuthenticated } = useAuth0();

  const [pageData, setPageData] = useState();

  const [role, setRole] = useState();

  const { id } = useParams();

  const [reFetch, setReFetch] = useState(false);

  const [showMainEdit, setShowMainEdit] = useState(false);

  const [showSubEdit, setShowSubEdit] = useState(false);

  useEffect(() => {
    async function fetchPageData(){
      const response = await axios.get(`http://localhost:4000/api/learningPage/get-page/${id}`);
      console.log('Response:', response.data);
      setPageData(response.data);
    }

    fetchPageData();

  }, [reFetch]);

  useEffect(() => {
    async function setTheRole(){
     if (pageData.creator == user.sub){
      setRole("creator");
     }else{
      setRole("visitor");
     }
    }

    if (pageData && isAuthenticated ){
      setTheRole();
    }
    
  }, [pageData, isAuthenticated]);


  return (
    <div className="learningPageContainer">
      {pageData ? (
        <>
          <h1>{pageData.name}</h1>

          {/* COme back to this once game is good to go */}
          {/* <LeaderBoard /> */}  

          <div className="summary">
            <h2>Summary</h2>
            <p>{pageData.summary}</p>
          </div>

          {role === "creator" && (
            <>
              <button onClick={() => setShowMainEdit(!showMainEdit)}>Edit Main Info</button>
              {showMainEdit && <EditMain reFetch={reFetch} onReFetch={setReFetch} />}
            </>
          )}

          <Accordion subs={pageData.sub_topics}/>

          {role === "creator" && (
            <>
              <button onClick={() => setShowSubEdit(!showSubEdit)}>Add Sub Topic</button>
              {showSubEdit && <EditSub reFetch={reFetch} onReFetch={setReFetch}/>}
            </>
          )}

        </>
      ) : (
        ""
      )}
    </div>
  );
}
