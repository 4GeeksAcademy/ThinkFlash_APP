import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import '../styles/loginLogout.css'
import { sendUserInfo } from "../../utils/sendUserInfo.js";
import { toast } from "react-toastify";
import getPreferentColor from "../services/colors/getPreferentColor.js";

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
      toast("🥺Please, don't leave empty inputs...")
      return;
    }
    if (user.password.length < 8) {
      toast("😒Password must have at least 8 characters...");
      return;
    }
    if (!isChecked) {
      toast("😊Please accept terms and conditions!!");
      return;
    }
    setIsLoading(true);
    try {
      const result = await sendUserInfo(user);
      setIsLoading(false);
      if (result === "OK") {
        navigate("/infoSignup");
      } else {
        toast("❌❌Error creating the user. Please try again later.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast("❌❌Error creating the user. Please try again later.");
    }
  };

  const colorMode = getPreferentColor(localStorage.getItem("opposite_color"))

  return (
    <div className="mt-5 vh-90">
      <h1 className={`text-center text-${colorMode}`}>Sign Up</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className={`form-group text-${colorMode}`}>
                <label htmlFor="username">
                  Username:
                </label>
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </div>
              <div className={`form-group mt-2 text-${colorMode}`}>
                <label htmlFor="emailInput">
                  Email:</label>
                <input
                  id="emailInput"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className={`form-group mt-2 text-${colorMode}`}>
                <label htmlFor="password">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <div className={`form-group mt-2 text-${colorMode}`}>
                <label>
                  <input className="check" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                  I agree <a href="https://www.recetasgratis.net/receta-de-arepas-venezolanas-52618.html" target="_blank" rel="noopener noreferrer">to the terms & conditions and privacy policy</a>
                </label>
              </div>
              <div className="text-center">
                <button type="submit" className={`btn btn-${colorMode} mt-3`} disabled={isLoading}>
                  {isLoading ? "Registering..." : "Sign Up"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}