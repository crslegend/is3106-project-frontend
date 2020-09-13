import React, { useState } from "react";
import axios from "axios";

import Routes from "./constants/Routes";
import { BACKEND_URL } from "./config";
import "./styles/App.css";

const App = () => {
  const [jwt, setJwt] = useState(null);

  const getAxiosInstance = async () => {
    // if jwt is null
    if (!jwt) return axios;

    // create axios instance
    let client = axios.create({
      baseURL: BACKEND_URL,
      timeout: 1000,
      headers: {
        Authorization: `Bearer ${jwt.access}`,
      },
    });

    let refetch = false;

    // check session
    await client
      .post("/auth/check_session")
      .then((res) => {})
      .catch((err) => {
        refetch = true;
      });

    // return axios instance if no need to refetch
    if (!refetch) {
      return client;
    } else {
      // refetch JWT
      console.log("JWT expired, refetching...");
      client
        .post("/api/token/refresh/", {
          refresh: jwt.refresh,
        })
        .then((res) => {
          setJwt({
            refresh: jwt.refresh,
            access: res.data.access,
          });
        })
        .catch((err) => console.log(err.toJSON()));
    }
  };

  return (
    <div className="App">
      <Routes setJwt={setJwt} getAxiosInstance={getAxiosInstance} />
    </div>
  );
};

export default App;
