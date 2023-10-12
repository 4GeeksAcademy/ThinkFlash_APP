
// const apiUrl = process.env.API_URL
import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";





export default function LoginPage() {

  const { store, actions } = useAppContext();
  const { token, username, password, email } = store;
  const { handleClickLoginWrapper, setPassword, setEmail } = actions;
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromSessionStorage = sessionStorage.getItem("token");
    if (tokenFromSessionStorage != undefined && tokenFromSessionStorage != "" && username != null && username != "") {
      navigate(`/${username}`);
    }
  }, [token, username]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleClickLoginWrapper(email, password);
  };


  return (
    <div className="mt-5">
      <h1 className="text-center">Login</h1>
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
                  className="btn btn-dark mt-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}