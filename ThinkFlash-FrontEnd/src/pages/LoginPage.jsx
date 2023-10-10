
// const apiUrl = process.env.API_URL
import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import '../styles/loginLogout.css'

export default function LoginPage() {

  const { store, actions } = useAppContext();
  const { token, username, password, email } = store;
  const { handleClickLoginWrapper, setPassword, setEmail } = actions;
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromSessionStorage = sessionStorage.getItem("token");
    if (tokenFromSessionStorage != undefined && tokenFromSessionStorage != "") {
      navigate(`/${username}`);
    }
  }, [token, username]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleClickLoginWrapper(email, password);
  };


  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
              <label>
                Email:
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                </label>
                
              </div>

              <div className="form-group mt-2">
                <label>
                  Password:
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

              </div>
              <button
                type="submit"
                className="btn btn-dark mt-3"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}