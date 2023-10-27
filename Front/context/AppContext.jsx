import React, { createContext, useContext, useEffect, useState } from "react";
import { handleClickLogin } from "../utils/loginFetch";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [id, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("")
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "")
    setUsername(sessionStorage.getItem("username") || "")
    setUserID(sessionStorage.getItem("user_id") || "")
    setEmail(sessionStorage.getItem("email") || "")
  }, [])

  const handleClickLoginWrapper = async (email, password) => {
    try {
      const data = await handleClickLogin(email, password);
      updateSessionStorage({ token: data.token, username: data.username, id: data.user_id, email: data.email, avatar: data.avatar });
      !localStorage.getItem("opposite_color") && localStorage.setItem("opposite_color", false)
      localStorage.getItem("opposite_color") == true && localStorage.setItem("opposite_color", true) 
      setUsername(data.username)
      setAvatar(data.avatar)
      setUserID(data.user_id)
      setEmail(data.email)
    } catch (error) {
      console.error("Error fetching login", error);
    }
  };

  const updateSessionStorage = ({ token, username, id, email, avatar }) => {
    setToken(token);
    sessionStorage.setItem("token", token);
    setUsername(username);
    sessionStorage.setItem("username", username)
    setUserID(id)
    sessionStorage.setItem("user_id", id)
    setUserID(email)
    sessionStorage.setItem("email", email)
    setAvatar(avatar)
    sessionStorage.setItem("avatar", avatar)
  };


  const store = {
    token,
    username,
    password,
    user,
    avatar,
    email,
    id
  };

  const actions = {
    handleClickLoginWrapper,
    setToken,
    setPassword,
    setUsername,
    setUser,
    setEmail,
    setAvatar
  };

  return <AppContext.Provider value={{ store, actions }}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
