
import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function ProfilePage() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  // const [auth0ClientState, setAuth0ClientState] = useState();

  useEffect(() => {
    async function test(){
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:4000/test", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Add any other custom headers here if needed
        },
      });
    
      console.log('Response:', response.data);

    }

    if (user && isAuthenticated){
      test();
    }

  }, []);

  

  return (
    <div className="placeholder">
      <h1>Profile Page</h1>
      {isAuthenticated ? <p>{JSON.stringify(user)}</p> : ""}
      {isAuthenticated ? <button>Make a page</button> : ""}
    </div>
  );
}