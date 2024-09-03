import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Message from "../../SharedComponents/Message";
import returnBaseUrl from "../../getUrl";

export default function EditMain(props) {

    const { reFetch, onReFetch, toggle } = props;
    const { getAccessTokenSilently } = useAuth0();
    const [editName, setEditName] = useState("");
    // const [editImage, setEditImage] = useState("");
    const [editSummary, setEditSummary] = useState("");
    const { id } = useParams();
    const [message, setMessage] = useState();

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

    function handleNameChange(e) {
        setEditName(e.target.value)
    }

    // function handleImageChange(e) {
    //     setEditImage(e.target.value)
    // }

    function handleSummaryChange(e) {
        setEditSummary(e.target.value)
    }

    async function handleEditSubmit(e) {
        e.preventDefault();
        try {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.patch(`${returnBaseUrl()}/api/learningPage/edit-page`, {
                name: editName,
                summary: editSummary,
                page_id: id
            },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        // Add any other custom headers here if needed
                    },
                });

            // console.log('Response:', response.data);
            if (response.status == 200) {
                setMessage({messageType: "Good", message: ["Page has been updated"]})
            }
            onReFetch(!reFetch);
            // Having this toggle active makes it so the message component doesn't get rendered
            // toggle(false);
        } catch (error) {
            // console.error('Error making PATCH request:', error);
            let errorsArray = [];
            // console.log(error.response.data.data.errors)
            for (const key in error.response.data.data.errors) {
                // Access the array of strings for the current key
                const stringValues = error.response.data.data.errors[key];
                errorsArray.push(stringValues[0]);
            }
            setMessage({messageType: "Bad", message: errorsArray})
        }
    }


    return (
        <div className="lpEditModalContainer">
            <div className="lpEditModal">
                <button id="closeModalButton" onClick={() => toggle(false)}>Close</button>
                <form onSubmit={handleEditSubmit}>
                    <label for="name">Name:</label>
                    <input value={editName} onChange={handleNameChange} type="text" id="name" name="name"></input>

                    <label for="summary">Summary:</label>
                    <input value={editSummary} onChange={handleSummaryChange} type="text" id="summary" name="summary"></input>

                    <button type="submit">Submit Edit</button>
                </form>
            </div>
            {message && (
                <Message message={message} />
            )}
        </div>
    );
}
