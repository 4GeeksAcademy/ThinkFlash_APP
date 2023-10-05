import { Link } from "react-router-dom";

export default function Navbar({ usernameLink }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex ms-0 me-0">
          <div className="me-5">
            <Link to={usernameLink} className="navbar-brand ps-3">
              {/* Your logo here */}
              <img
                src="https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png"
                alt="Logo"
                width="auto"
                height="100"
              />
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto me-2">
              <li className="nav-item">
              <Link to={'/'} className="navbar-brand ps-3"> 
              Home</Link> 
              </li>
            </ul>
          </div>
          {/* Input group for search */}
          <div className="input-group ms-5">
            <input
              type="text"
              className="form-control me-5"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-light" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
}