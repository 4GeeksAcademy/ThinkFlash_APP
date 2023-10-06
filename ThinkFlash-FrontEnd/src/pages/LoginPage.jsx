import {useState} from "react";

export default function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [token, setToken] = useState(sessionStorage.getItem("token"));
  
   
  
    const handleClick = () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,  
          password: password
        }),
      };
  
      fetch(
        "https://automatic-spoon-xjx4xprw5pgf5r7-6969.app.github.dev/login",
        options
      )
        .then((response) => {
          if (response.status === 200) return response.json();
          else alert("There has ben an error, first then in loginfetch");
        })
        .then((data) => {
          setToken(data.token);
          sessionStorage.setItem("token", data.token)
        })
        .catch((error) => {
          console.log("there is an error fetching login", error);
        });
    };
    return(
        <div className="text-center mt-5">
      <h1>Login</h1>
      {token ? (
        "You are logged in with this token: " + token
      ) : (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form> 
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
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={handleClick}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    )
}