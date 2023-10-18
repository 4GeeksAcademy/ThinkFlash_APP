import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { DataBaseURL } from "../../constants";




export default function RecoveryPassword() {

  const { store, actions } = useAppContext();
  const { password, email } = store;
  const { setPassword, setEmail } = actions;
  const navigate = useNavigate();

  const recoveryFetch = async () => {
    try {
      const response = await fetch(`${DataBaseURL}/users/recovery_password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
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
    recoveryFetch(email, password);
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">New password</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group text-left">
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
              <div className="form-group mt-2 text-left">
                <label htmlFor="passwordInput">New password:</label>
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
                  className="btn btn-dark mt-3"
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