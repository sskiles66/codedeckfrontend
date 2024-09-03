import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import returnBaseUrl from "../../getUrl";

export default function ProfileInfo() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userData, setUserData] = useState();

    // Gets user data, can forsee issues with asynchrnousity
    useEffect(() => {
        async function fetchUserData() {
            const accessToken = await getAccessTokenSilently();
            const response = await axios.get(`${returnBaseUrl()}/api/learningPage/get-user-data/${user.sub}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    // Add any other custom headers here if needed
                },
            });
            console.log('Response:', response.data);
            setUserData(response.data[0]);
        }
        if (user && isAuthenticated) {
            fetchUserData();
        }
    }, [user, isAuthenticated]);

    return (
        <div className="profileDataContainer">
            <div className="profileDataImageContainer">
                <img src={user?.picture} alt="Image of user" />
            </div>
            <div className="profileDataDataContainer">
                {userData ? (
                    <>
                        <p>Name: {userData.name}</p>
                        <p>Games Played: {userData.games_played}</p>
                    </>
                ) : (
                    <p>User data is not available.</p>
                )}
            </div>
        </div>
    );
}