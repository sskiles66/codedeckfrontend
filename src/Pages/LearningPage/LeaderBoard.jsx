import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


export default function LeaderBoard() {

  const [leaderBoardData, setLeaderBoardData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchLeaderBoardData() {
      const response = await axios.get(`http://localhost:4000/api/learningPage/get-games/${id}`);
      setLeaderBoardData(response.data);
    }

    fetchLeaderBoardData();
    
  }, []);

  return (
    <div className="leaderboard">
      <table>
        <thead>

          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
          </tr>

        </thead>
        <tbody>

          {leaderBoardData.map((item, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.user_first_name}</td>
              <td>{item.score}</td>
              <td>{item.time}</td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
}