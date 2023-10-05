import { Link } from "react-router-dom";

export default function Navbar({ usernameLink }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to={usernameLink} className="navbar-brand ps-0">
          <img
            src="https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png"
            alt="Logo"
            width="auto"
            height="100"
          />
        </Link>
        <div className="d-flex">
          <ul className="navbar-nav ml-auto me-2">
            <li className="nav-item">
              <Link to={'/'} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/login'} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/signup'} className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>

          </div>
        </div>
    </nav>
  );
}
