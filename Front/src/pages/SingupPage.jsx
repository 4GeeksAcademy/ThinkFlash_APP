// const apiUrl = process.env.API_URL;
import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import '../styles/loginLogout.css'

export default function SignupPage() {
  const { store, actions } = useAppContext();
  const { user, token } = store;
  const { setUser, sendUserInfo } = actions;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const tokenFromSessionStorage = sessionStorage.getItem("token");

    if (tokenFromSessionStorage != undefined && tokenFromSessionStorage != "") {
      navigate(`/${user.username}`);
    }
  }, [token, user.username]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user.username.trim() === '' || user.email.trim() === '' || user.password.trim() === '') {
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (user.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (!isChecked) {
      alert("Por favor, acepta los términos y condiciones.");
      return;
    }
    await sendUserInfo(e);

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
                <button type="submit" className="btn btn-dark mt-3">
                  Sign Up
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}