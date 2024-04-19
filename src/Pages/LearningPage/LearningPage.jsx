import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LeaderBoard from "./LeaderBoard";
import Accordion from "./Accordion";
import axios from "axios";

export default function LearningPage() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [pageData, setPageData] = useState();

  const [role, setRole] = useState();

  const { id } = useParams();

  const [reFetch, setReFetch] = useState(false);


  const [editName, setEditName] = useState("");

  const [editImage, setEditImage] = useState("");

  const [editSummary, setEditSummary] = useState("");


  const [editSubName, setEditSubName] = useState("");

  const [editDefinition, setEditDefinition] = useState("");

  const [editAnalogy, setEditAnalogy] = useState("");

  const [editMnemonics, setEditMnemonics] = useState("");

  const [editImage2, setEditImage2] = useState("");

  const [editAudio, setEditAudio] = useState("");

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


  function handleNameChange(e){
    setEditName(e.target.value)
  }

  function handleImageChange(e){
    setEditImage(e.target.value)
  }

  function handleSummaryChange(e){
    setEditSummary(e.target.value)
  }

  async function handleEditSubmit(e){
    e.preventDefault();
    

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.patch("http://localhost:4000/api/learningPage/edit-page", {
          name: editName, 
          image: editImage,
          summary: editSummary,
          page_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Add any other custom headers here if needed
        },
      });

        console.log('Response:', response.data);
        setReFetch(!reFetch);
    } catch (error) {
        console.error('Error making PATCH request:', error);
    }
  }

  function handleSubNameChange(e){
    setEditSubName(e.target.value)
  }

  function handleDefinitionChange(e){
    setEditDefinition(e.target.value)
  }

  function handleAnalogyChange(e){
    setEditAnalogy(e.target.value)
  }

  function handleMnemonicsChange(e){
    setEditMnemonics(e.target.value)
  }

  function handleImage2Change(e){
    setEditImage2(e.target.value)
  }

  function handleAudioChange(e){
    setEditAudio(e.target.value)
  }

  async function handleSubSubmit(e){
    e.preventDefault();

    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.patch("http://localhost:4000/api/learningPage/new-subtopic", {
          sub_name: editSubName, 
          definition: editDefinition,
          analogy: editAnalogy,
          mnemonics: editMnemonics, 
          image: editImage2,
          audio: editAudio,
          page_id: id
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Add any other custom headers here if needed
        },
      });

        console.log('Response:', response.data);
        setReFetch(!reFetch);
    } catch (error) {
        console.error('Error making PATCH request:', error);
    }
  }


  return (
    <div className="learningPageContainer">
      {pageData ? (
        <>
          <h1>{pageData.name}</h1>

          {/* <input value={editState} onChange={handleChange}></input> */}

          {role == "creator" ? 
            <div className="lpEditForm">
              <form onSubmit={handleEditSubmit}>
                <label for="name">Name:</label>
                <input value={editName} onChange={handleNameChange} type="text" id="name" name="name"></input>

                <label for="image">Image:</label>
                <input value={editImage} onChange={handleImageChange} type="text" id="image" name="image"></input>

                <label for="summary">Summary:</label>
                <input value={editSummary} onChange={handleSummaryChange} type="text" id="summary" name="summary"></input>

                <button type="submit">Submit Edit</button>
              </form>
            </div>
           : ""}

          {/* COme back to this once game is good to go */}
          {/* <LeaderBoard /> */}  

          <div className="summary">
            <h2>Summary</h2>
            <p>{pageData.summary}</p>
          </div>

          {role == "creator" ? 
            <div className="lpEditForm">
              <form onSubmit={handleSubSubmit}>
                <label for="sub_name">Name:</label>
                <input value={editSubName} onChange={handleSubNameChange} type="text" id="sub_name" name="sub_name"></input>

                <label for="definition">Definition:</label>
                <input value={editDefinition} onChange={handleDefinitionChange} type="text" id="definition" name="definition"></input>

                <label for="analogy">Analogy:</label>
                <input value={editAnalogy} onChange={handleAnalogyChange} type="text" id="analogy" name="analogy"></input>

                <label for="mnemonics">Mnemonics:</label>
                <input value={editMnemonics} onChange={handleMnemonicsChange} type="text" id="mnemonics" name="mnemonics"></input>

                <label for="image">Image:</label>
                <input value={editImage2} onChange={handleImage2Change} type="text" id="image" name="image"></input>

                <label for="audio">Audio:</label>
                <input value={editAudio} onChange={handleAudioChange} type="text" id="audio" name="audio"></input>

                <button type="submit">Add Sub Topic</button>
              </form>
            </div>
           : ""}

          <Accordion subs={pageData.sub_topics}/>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
