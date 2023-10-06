import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({usernameLink}) {
    return (
        <div className="navbar bg-primary navbar-expand-lg" data-bs-theme="dark" >
        <div className="container">
        <Link to={usernameLink} className="navbar-brand ps-3">
            <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="80px"/>
        </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ms-auto">
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
                    <li className="nav-item">
                        <a href="#" className="nav-link">Config</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">User</a>
                        <ul className="dropdown-menu bg-primary">
                            <li><a className="dropdown-item" href="#">Log in</a></li>
                            <li><a className="dropdown-item" href="#">Sign up</a></li>
                            <li><a className="dropdown-item" href="#">Log out</a></li>
                        </ul>
                    </li>
                </ul>  
            </div>
        </div>
    </div>
       
    )
}



