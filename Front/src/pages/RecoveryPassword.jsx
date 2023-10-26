import useAppContext from "../../context/AppContext.jsx"
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { DataBaseURL } from "../../constants";
import getPreferentColor from '../services/colors/getPreferentColor';


export default function RecoveryPassword() {
  const { user_uuid } = useParams();
  const { store, actions } = useAppContext();
  const { password } = store;
  const { setPassword} = actions;
  const navigate = useNavigate();
  const colorMode = getPreferentColor(localStorage.getItem("opposite_color"));


  const recoveryFetch = async () => {
    try {
      const response = await fetch(`${DataBaseURL}/users/recovery_password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_uuid: user_uuid, password: password }),
      });

      if (response.ok) {
        toast('✅😊😁 Password changed succesfully!!');
        console.log('Password changed succesfully!!');
        navigate("/login")
      } else {
        toast('🥺Error changing password...');
        console.error('Error changing password...');
      }
    } catch (error) {
      toast('Try later... We have some trouble here...🥴');
      console.error('Error en la solicitud PATCH:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === '') {
      toast("🥺Please, type a new password...");
      return;}
    recoveryFetch(
       password);
  };

  return (
    <div className="mt-5">
      <h1 className={`text-center text-${colorMode}`}>New password</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group mt-2 text-left">
                <label className= {`text-center mb-2 text-${colorMode}`} htmlFor="passwordInput">New password:</label>
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
                  className={`btn btn-${colorMode} mt-3` }
                >
                  Send New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}