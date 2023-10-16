import React, { createContext, useContext, useEffect, useState } from "react";
import { handleClickLogin } from "../utils/loginFetch";
import { DataBaseURL } from "../constants";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/36243334/36243334-1672676117894-fb369f088856b.jpg")
  const navigate = useNavigate();
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
      updateSessionStorage({ token: data.token, username: data.username });
      setUsername(data.username)
      setAvatar(data.avatar)
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

      if (response.ok) {
        toast("🦄 Usuario creado exitosamente!!");
        toast("✉️Confirme su email en su bandeja de entrada para hacer Login!!");
          navigate(`/login`);
         
      } else {
        if (data.error === "El usuario ya existe") {
          toast("🙅‍♀️El nombre o email ya existen. Por favor, elija otro nombre o email de usuario.");
        } else {
          toast("❌❌Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
        }
      }
    } catch (error) {
      console.error("Error fetching signup", error);
    }
  };

  const updateSessionStorage = ({ token, username }) => {
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
    avatar,
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
