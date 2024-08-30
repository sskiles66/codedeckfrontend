import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Message from "../../SharedComponents/Message";

export default function EditSub(props) {

    const { reFetch, onReFetch, toggle } = props;
    const { getAccessTokenSilently } = useAuth0();
    const [editSubName, setEditSubName] = useState("");
    const [editDefinition, setEditDefinition] = useState("");
    const [editAnalogy, setEditAnalogy] = useState("");
    const [editMnemonics, setEditMnemonics] = useState("");
    const [editImage2, setEditImage2] = useState();
    // const [editAudio, setEditAudio] = useState("");
    const [message, setMessage] = useState();
    const { id } = useParams();

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

    const handleImage2Change = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const base64Image = e.target.result;
                setEditImage2(base64Image); // Update state with base64 data (optional)
                // handlePostToDb(base64Image);
            };
        } else {
            // Handle case where no file is selected (optional)
            setEditImage2("");
        }
    };

    // console.log(editImage2)

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
                setMessage({messageType: "Good", message: ["Sub topic has been added"]})
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
                <form onSubmit={handleSubSubmit}>
                    <label for="sub_name">Name:</label>
                    <input value={editSubName} onChange={handleSubNameChange} type="text" id="sub_name" name="sub_name"></input>

                    <label for="definition">Definition:</label>
                    <input value={editDefinition} onChange={handleDefinitionChange} type="text" id="definition" name="definition"></input>

                    <label for="analogy">Analogy:</label>
                    <input value={editAnalogy} onChange={handleAnalogyChange} type="text" id="analogy" name="analogy"></input>

                    <label for="mnemonics">Mnemonics:</label>
                    <input value={editMnemonics} onChange={handleMnemonicsChange} type="text" id="mnemonics" name="mnemonics"></input>

                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImage2Change}
                        accept="image/*"
                    />

                    <button type="submit">Add Sub Topic</button>
                </form>
            </div>
            {message && (
                <Message message={message} />
            )}
        </div>
    );
}
