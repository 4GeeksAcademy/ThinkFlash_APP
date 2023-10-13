import React from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../../context/AppContext";
import { Button, Navbar, Container } from 'react-bootstrap';


export default function Navbar({ usernameLink }) {
    const { store } = useAppContext();
    const { token } = store;

    let conditionalLinks = null;

    if (token == "" || !token) {
        conditionalLinks = (
            <>
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
                    <Link to={'/testUser'} className="nav-link">
                        Test User
                    </Link>
                </li>
            </>
        );
    }

    return (
            <nav class="navbar navbar-expand-lg navbar-dark">
                <div class="container-fluid">
                    <Link to={"/"} className="navbar-brand ps-3">
                        <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="50px" />
                    </Link>

                
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#menuLateral">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <!-- OFFCANVAS MAIN CONTAINER START -->
                    <section
                    class="offcanvas offcanvas-start"
                    id="menuLateral"
                    tabindex="-1"
                    >
                    <div class="offcanvas-header" data-bs-theme="dark">
                        <Link to={"/"} className="navbar-brand ps-3">
                        <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="50px" />
                        </Link>
                        <button
                        class="btn-close"
                        type="button"
                        aria-label="Close"
                        data-bs-dismiss="offcanvas"
                        ></button>
                    </div>
                    <!-- OFF CANVAS MENU LINKS  START-->
                    <div
                        class="offcanvas-body d-flex flex-column justify-content-between px-0"
                    >
                        <ul class="navbar-nav fs-5 justify-content-evenly">
                        <li class="nav-item p-3 py-md-1">
                            <a href="" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item p-3 py-md-1">
                            <a href="" class="nav-link">Login</a>
                        </li>
                        <li class="nav-item p-3 py-md-1">
                            <a href="" class="nav-link">Sign Up</a>
                        </li>
                        <li class="nav-item p-3 py-md-1">
                            <a href="" class="nav-link">Test User</a>
                        </li>
                        <li class="nav-item p-3 py-md-1">
                            <a href="" class="nav-link">User</a>
                        </li>
                        <li class="nav-item p-3 py-md-1">
                            <a href="" class="nav-link">Log out</a>
                        </li>
                        </ul>
                    </section>
                    <!-- OFFCANVAS MAIN CONTAINER END  -->
                </div>
                </nav>
    );
}
