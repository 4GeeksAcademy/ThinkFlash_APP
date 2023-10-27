import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import getPreferentColor from "../services/colors/getPreferentColor.js";




export default function LoginPage() {

  const { store, actions } = useAppContext();
  const { token, username, password, email } = store;
  const { handleClickLoginWrapper, setPassword, setEmail } = actions;
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromSessionStorage = sessionStorage.getItem("token");
    if (tokenFromSessionStorage != undefined && tokenFromSessionStorage != "" && username != null && username != "") {
      navigate(`/${username}`);
      toast(`Welcome to ThinkFlash ${username}!! Enjoy learning!`)
    }
  }, [token, username]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      toast("🥺Por favor, complete todos los campos.");
      return;}
    handleClickLoginWrapper(email, password);
  };

  const colorMode = getPreferentColor(localStorage.getItem("opposite_color"))

  return (
    <div className="mt-5 vh-90">
      <h1 className={`text-center text-${colorMode}`}>Login</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className={`form-group text-${colorMode} text-left`}>
                <label htmlFor="emailInput">Email:</label>
                <input
                  id="emailInput"
                  type="email"
                  className="form-control input-lg"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={`form-group text-${colorMode} mt-2 text-left`}>
                <label htmlFor="passwordInput">Password:</label>
                <input
                  id="passwordInput"
                  type="password"
                  className="form-control input-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className={`btn btn-${colorMode} mt-3`}
                >
                  Login
                </button>
              </div>
              <div className={`text-center text-${colorMode} mt-3`}>
                <Link  to= "/recoveryEmail">Forgot your password? Get a new one!</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}