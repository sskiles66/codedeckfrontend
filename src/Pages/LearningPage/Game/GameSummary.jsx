import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { GameContext } from "./GameContext";

export default function GameSummary() {

  const { score, timer, isGameOver, setIsGameOver, setQuestionNum, setScore, setTimer } = useContext(GameContext);

  const { id } = useParams();

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [name, setName] = useState();

  const [userId, setUserId] = useState();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    function setGameValues() {
      if (isAuthenticated) {
        setName(user.given_name);
        setUserId(user.sub);
      } else {
        setName("Guest");
        setUserId("");
      }
    }
    setGameValues();
  }, [isAuthenticated]);

  function restartGame(e) {
    e.preventDefault();
    setIsGameOver(false);
    setQuestionNum(1);
    setScore(0);
    setTimer(0);
    setIsButtonDisabled(false);
  }

  async function handleGameCreation(e) {
    e.preventDefault();
    setIsButtonDisabled(true);
    try {
      const createGameResponse = await axios.post(
        'http://localhost:4000/api/learningPage/create-game',
        {
          learning_page_id: id,
          user_id: userId,
          user_first_name: name,
          score: score,
          time: timer,
        },
      );

      // console.log('User data saved:', createUserResponse.data);
      //   navigate(`/learningPage/${createUserResponse.data._id}`);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.patch(`http://localhost:4000/api/learningPage/increment-user-games-played/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Add any other custom headers here if needed
          },
        });
    } catch (error) {
      console.error('Error making PATCH request:', error);
    }
  }



  return (
    isGameOver ? (
      <div className="gameSummary">
        <h2>Game Results</h2>
        <p>Final Score: {score}</p>
        <p>Final Time: {timer}</p>
        <button disabled={isButtonDisabled} onClick={handleGameCreation}>Save Score</button>
        <button onClick={restartGame}>Click To Play Again</button>
      </div>
    ) : (
      ""
    )
  );
}