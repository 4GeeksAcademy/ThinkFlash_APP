import React from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../../context/AppContext";
import useLogout from "../../../utils/useLogout";
import classes from "./styles.module.css"



export default function Navbar() {
    const logout = useLogout()
    const { store } = useAppContext();
    const { token } = store;
    const { username } = store;
    const { avatar } = store;

    let conditionalLinks = null;

    if (token == "" || !token) {
        conditionalLinks = (
            <>
                <li className="nav-item p-3 py-md-1">
                    <Link to={'/login'} className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item p-3 py-md-1">
                    <Link to={'/signup'} className="nav-link">
                        Sign Up
                    </Link>
                </li>
            </>
        );
    }

    return (

        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to={token == "" || !token ? "/" : `/${username}`} className="navbar-brand ps-3 h-100 d-flex">
                    <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="60px" />
                    <p className="h4 text-white my-auto">Think Flash</p>
                </Link>


                <button
                    className="navbar-toggler btn border-0"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menuLateral"
                >
                    <img className="rounded-circle" src={avatar} alt={username + " avatar "} width="auto" height="60px" />
                </button>

                <section
                    className={`offcanvas offcanvas-end bg-dark w-75 ${classes.offcanvas}`}
                    id="menuLateral"
                    tabIndex="-1"
                >
                    <div className="offcanvas-header" data-bs-theme="dark">
                        {token == "" || !token ?
                            <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="60px" />
                            :
                            <li className="px-3">
                                <Link to={`/${username}`} className="p-0 h-100 d-flex text-decoration-none">
                                    <img className="rounded-circle" src={avatar} alt={username + " avatar "} width="auto" height="60px" />
                                    <p className="text-white fw-bold px-3 my-auto">{username}</p>
                                </Link>
                            </li>
                        }
                        <button
                            className="btn-close mt-3"
                            type="button"
                            aria-label="Close"
                            data-bs-dismiss="offcanvas"
                        ></button>
                    </div>

                    <div
                        className="offcanvas-body d-flex flex-column justify-content-between px-0"
                    >
                        <ul className="navbar-nav fs-5 justify-content-end">
                            {!token ? conditionalLinks : (
                                <>
                                    <li className="nav-item px-3">
                                        <Link to={`/${username}/mydecks`} className="nav-link">
                                            My decks
                                        </Link>
                                    </li>
                                    <li className="nav-item px-3">
                                        <Link to={`/${username}/alldecks`} className="nav-link">
                                            All decks
                                        </Link>
                                    </li>
                                    <li className="nav-item px-3 my-auto">
                                        <button className="nav-link text-warning" onClick={logout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )
                            }
                        </ul>
                    </div>
                </section>

            </div>
        </nav>

    );
}
