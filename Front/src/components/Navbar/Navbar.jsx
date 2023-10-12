import React from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../../context/AppContext";
import useLogout from "../../../utils/useLogout";



export default function Navbar() {
    const logout = useLogout()
    const { store } = useAppContext();
    const { token } = store;
    const { username } = store;

    let conditionalLinks = null;

    if (token == "" || !token) {
        conditionalLinks = (
            <><button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
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
                </div >
            </>
        );
    }

    return (
        <div className="navbar bg-primary navbar-expand-lg h-10" data-bs-theme="dark">
            <div className="container">
                <Link to={token == "" || !token ? "/" : `/${username}`} className="navbar-brand ps-3 h-100">
                    <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="60px" />
                </Link>

                <ul className="navbar-nav ms-auto">
                    {!token ? conditionalLinks : (
                        <li className="nav-item">
                            <button className="btn" onClick={logout}>
                                Logout
                            </button>
                        </li>
                    )
                    }
                </ul>
            </div>
        </div>

    );
}
