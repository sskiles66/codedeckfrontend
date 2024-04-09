
import React from "react";


export default function LeaderBoard() {

  

  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.length > 0 && data.map((item: Todo) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.completed ? 'Yes' : 'No'}</td>
                    </tr>
                    ))} */}
          <tr>
            <td>Yeah</td>
            <td>Yeah</td>
            <td>Yeah</td>
          </tr>

          <tr>
            <td>Yeah</td>
            <td>Yeah</td>
            <td>Yeah</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}