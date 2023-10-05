import { useState } from "react";


export default function SignupPage () {
    const [user, setUser] = useState({})
    const sendUserInfo = async (e)=>{
      e.preventDefault()
       const response = await fetch("https://automatic-spoon-xjx4xprw5pgf5r7-6969.app.github.dev/signin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
       });
       await response.json();
    } 
    return(
        <div className="text-center mt-5">
        <h1>Sign Up</h1>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={sendUserInfo}>
              <div className="form-group">
                  <input
                    type="username"
                    className="form-control"
                    id="username"
                    placeholder="Ingrese su nombre de usuario"
                    onChange={(e)=>setUser({...user, username: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingrese su email"
                    onChange={(e)=>setUser({...user, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingrese su contraseña"
                    onChange={(e)=>setUser({...user, password: e.target.value})}
                  />
                </div>
                <button type="submit"  className="btn btn-primary mt-3">
                  SignUp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}