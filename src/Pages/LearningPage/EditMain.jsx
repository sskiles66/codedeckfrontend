import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from 'react-router-dom';

// import "../../Styles/styles.css"




export default function EditMain(props) {

    const { reFetch, onReFetch, toggle } = props;

    const { getAccessTokenSilently } = useAuth0();

    const [editName, setEditName] = useState("");

    const [editImage, setEditImage] = useState("");

    const [editSummary, setEditSummary] = useState("");

    const { id } = useParams();

    function handleNameChange(e) {
        setEditName(e.target.value)
    }

    function handleImageChange(e) {
        setEditImage(e.target.value)
    }

    function handleSummaryChange(e) {
        setEditSummary(e.target.value)
    }


    async function handleEditSubmit(e) {
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
            onReFetch(!reFetch);
            toggle(false);
        } catch (error) {
            console.error('Error making PATCH request:', error);
        }
    }


    return (
        <div className="lpEditModalContainer">
            <div className="lpEditModal">
                <button id="closeModalButton" onClick={() => toggle(false)}>Close</button>
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
        </div>
    );
}
