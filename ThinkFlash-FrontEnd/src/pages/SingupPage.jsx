// const apiUrl = process.env.API_URL;
import useAppContext from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom";


export default function SignupPage () {
  const { store, actions } = useAppContext();
  const {user, token} = store;
  const {setUser, sendUserInfo} = actions;
  const navigate = useNavigate();


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user.username.trim() === '' || user.email.trim() === '' || user.password.trim() === '') {
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (user.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    await sendUserInfo(e);
    if (store.token) {
      navigate("/:username");
    }
  };
    return(
        <div className="text-center mt-5">
        <h1>Sign Up</h1>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleFormSubmit}>
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