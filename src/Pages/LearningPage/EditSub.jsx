import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from 'react-router-dom';

// import "../../Styles/styles.css"


export default function EditSub(props) {

    const { reFetch, onReFetch } = props;

    const { getAccessTokenSilently } = useAuth0();

    const [editSubName, setEditSubName] = useState("");

    const [editDefinition, setEditDefinition] = useState("");
  
    const [editAnalogy, setEditAnalogy] = useState("");
  
    const [editMnemonics, setEditMnemonics] = useState("");
  
    const [editImage2, setEditImage2] = useState("");
  
    const [editAudio, setEditAudio] = useState("");

    const { id } = useParams();

    function handleSubNameChange(e) {
        setEditSubName(e.target.value)
    }

    function handleDefinitionChange(e) {
        setEditDefinition(e.target.value)
    }

    function handleAnalogyChange(e) {
        setEditAnalogy(e.target.value)
    }

    function handleMnemonicsChange(e) {
        setEditMnemonics(e.target.value)
    }

    function handleImage2Change(e) {
        setEditImage2(e.target.value)
    }

    function handleAudioChange(e) {
        setEditAudio(e.target.value)
    }

    async function handleSubSubmit(e) {
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
            onReFetch(!reFetch);
        } catch (error) {
            console.error('Error making PATCH request:', error);
        }
    }
    

    return (
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
    );
}
