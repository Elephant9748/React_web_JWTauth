import React from "react";
import { Routing } from "./app/route";
import { setAccessToken } from "./accessToken";

export const Loadpage = () => {
  const [loading, setLoading] = React.useState(true);
  console.log(process.env);
  React.useEffect(() => {
    
    // refresh token to get accesstoken
    fetch(process.env.REACT_APP_URI_REFRESH_TOKEN, {
      method: "POST",
      credentials: "include"
    }).then(async (y) => {
      const { accessToken } = await y.json();
      
      console.log("LOAD =",accessToken);
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading ... </div>;
  }

  return <Routing />;
};
