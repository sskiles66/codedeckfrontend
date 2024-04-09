
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfilePage() {

  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="placeholder">
      <h1>Profile Page</h1>
      {isAuthenticated ? <p>{JSON.stringify(user)}</p> : ""}
    </div>
  );
}