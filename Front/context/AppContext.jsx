import React, { createContext, useContext, useEffect, useState } from "react";
import { handleClickLogin } from "../utils/loginFetch";
import { DataBaseURL } from "../constants";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "")
    setUsername(sessionStorage.getItem("username") || "")
  },[])

  

  const handleClickLoginWrapper = async (email, password) => {
    try {
      const data = await handleClickLogin(email, password);
      updateSessionStorage({token:data.token, username:data.username});
      setUsername(data.username)
    } catch (error) {
      console.error("Error fetching login", error);
    }
  };
  
  const sendUserInfo = async (e) => {
    e.preventDefault();
    const response = await fetch(`${DataBaseURL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    
    try {
      const data = await response.json();
      updateSessionStorage({token: data.token, username: data.username});
      
      if (response.ok) {
        alert("Usuario creado exitosamente");
      } else {
        if (data.error === "El usuario ya existe") {
          alert("El usuario ya existe. Por favor, elija otro nombre de usuario.");
        } else {
          alert("Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
        }
      }
    } catch (error) {
      console.error("Error fetching signup", error);
    }
  };
  
  const updateSessionStorage = ({token, username}) => {
    setToken(token);
    sessionStorage.setItem("token", token);
    setUsername(username);
    sessionStorage.setItem("username", username)
  };
  

  const store = {
    token,
    username,
    password,
    user,
    email
  };

  const actions = {
    handleClickLoginWrapper,
    setToken,
    setPassword,
    setUsername,
    setUser,
    sendUserInfo,
    setEmail
  };

  return <AppContext.Provider value={{ store, actions }}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
