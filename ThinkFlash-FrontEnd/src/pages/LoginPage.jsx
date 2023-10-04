import {useState} from "react";

export default function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, serUsername] = useState("");

  
    const token = sessionStorage.getItem("token");
  
    const handleClick = () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,  
          email: email,
          password: password
        }),
      };
  
      fetch(
        "http://127.0.0.1:6969/login",
        options
      )
        .then((response) => {
          if (response.status === 200) return response.json();
          else alert("There has ben an error, first then in loginfetch");
        })
        .then((data) => {
          sessionStorage.setItem("token", data.access_token);
        })
        .catch((error) => {
          console.log("there is an error fetching login", error);
        });
    };
    return(
        <div className="text-center mt-5">
      <h1>Login</h1>
      {token && token != "" && token != undefined ? (
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
                    onChange={(e) => serUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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