
// const apiUrl = process.env.API_URL
import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";


export default function LoginPage () {
    
    const { store, actions } = useAppContext();
    const { token, username, password } = store;
    const { handleClickLoginWrapper, setUsername, setPassword } = actions;
    const navigate = useNavigate();
  
    const handleFormSubmit  = (e) => {
      e.preventDefault();
      handleClickLoginWrapper(username, password);
      if (store.token) {
        navigate("/:username");
      }
    };
  
   
    return(
        <div className="text-center mt-5">
      <h1>Login</h1>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleFormSubmit}>  
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
               
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
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