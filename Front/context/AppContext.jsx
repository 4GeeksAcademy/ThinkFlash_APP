import React, { createContext, useContext, useEffect, useState } from "react";
import { handleClickLogin } from "../utils/loginFetch";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/36243334/36243334-1672676117894-fb369f088856b.jpg")
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "")
    setUsername(sessionStorage.getItem("username") || "")
  }, [])

  const handleClickLoginWrapper = async (email, password) => {
    try {
      const data = await handleClickLogin(email, password);
      updateSessionStorage({ token: data.token, username: data.username, id: data.user_id });
      setUsername(data.username)
      setAvatar(data.avatar)
    } catch (error) {
      console.error("Error fetching login", error);
    }
  };

  const updateSessionStorage = ({ token, username, id }) => {
    setToken(token);
    sessionStorage.setItem("token", token);
    setUsername(username);
    sessionStorage.setItem("username", username)
    sessionStorage.setItem("user_id", id)
  };


  const store = {
    token,
    username,
    password,
    user,
    avatar,
    email
  };

  const actions = {
    handleClickLoginWrapper,
    setToken,
    setPassword,
    setUsername,
    setUser,
    setEmail
  };

  return <AppContext.Provider value={{ store, actions }}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
