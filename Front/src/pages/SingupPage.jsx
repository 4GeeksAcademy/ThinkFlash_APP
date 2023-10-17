import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import '../styles/loginLogout.css'
import { sendUserInfo } from "../../utils/sendUserInfo.js";
import { toast } from "react-toastify";

export default function SignupPage() {
  const { store, actions } = useAppContext();
  const { user } = store;
  const { setUser } = actions;
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user.username.trim() === '' || user.email.trim() === '' || user.password.trim() === '') {
      toast("🥺Por favor, complete todos los campos.");
      return;
    }
    if (user.password.length < 8) {
      toast("😒La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (!isChecked) {
      toast("😊Por favor, acepta los términos y condiciones.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await sendUserInfo(user);
      setIsLoading(false);
      if (result === "OK") {
        navigate("/infoSignup");
      } else {
        toast("❌❌Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast("❌❌Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">Sign Up</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="username">
                  Username:
                </label>
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  placeholder="Ingrese su nombre de usuario"
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="emailInput">
                  Email:</label>
                <input
                  id="emailInput"
                  type="email"
                  className="form-control"
                  placeholder="Ingrese su email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <div className="form-group mt-2">
                <label>
                  <input className="check" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                  Acepto los <a href="https://www.recetasgratis.net/receta-de-arepas-venezolanas-52618.html" target="_blank" rel="noopener noreferrer">términos y condiciones</a>
                </label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark mt-3" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Sign Up"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}