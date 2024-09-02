import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function CreatePageButton() {

    const { user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    // Posts new page and navigates to it
    async function handlePageCreation(e) {
        e.preventDefault();
        try {
            const accessToken = await getAccessTokenSilently();
            const createUserResponse = await axios.post(
                'http://localhost:4000/api/learningPage/create',
                {
                    name: "Title",
                    summary: "Summary goes here",
                    sub_topics: [],
                    creator: user.sub,
                    isLocked: true

                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        // Add any other custom headers here if needed
                    },
                }
            );
            navigate(`/learningPage/${createUserResponse.data._id}`);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }

    return (
        <div className="profileMakePageButtonContainer">
            <button className="profileMakePageButton" onClick={handlePageCreation}>Make A Page</button>
        </div>
    );
}