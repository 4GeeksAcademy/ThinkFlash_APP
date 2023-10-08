import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleClickLogin = (username, password) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    fetch(`https://automatic-spoon-xjx4xprw5pgf5r7-6969.app.github.dev/login`, options)
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error("Error in loginfetch");
      })
      .then((data) => {
        setToken(data.token);
        sessionStorage.setItem("token", data.token);
      })
      .catch((error) => {
        console.error("Error fetching login", error);
      });
  };

  const store = {
    token,
    username,
    password,
  };

  const actions = {
    handleClickLogin,
    setToken,
    setPassword,
    setUsername,
  };

  return <AppContext.Provider value={{ store, actions }}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
