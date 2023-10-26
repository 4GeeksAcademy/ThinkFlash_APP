import React from "react";
import { Link } from "react-router-dom";
import useAppContext from "../../../context/AppContext";
import useLogout from "../../../utils/useLogout";
import classes from "./styles.module.css"
import getPreferentColor from "../../services/colors/getPreferentColor";



export default function Navbar() {

    const logout = useLogout()
    const { store } = useAppContext();
    const { token } = store;
    const { username } = store;
    const avatar = sessionStorage.getItem("avatar")

    const colorMode = getPreferentColor(localStorage.getItem("opposite_color"))

    const handleClickChangeThemeColor = (e) => {
        e.preventDefault()

        if (localStorage.getItem("opposite_color") == "false") {
            localStorage.setItem("opposite_color", true)
            window.location.reload();
        } else {
            localStorage.setItem("opposite_color", false)
            window.location.reload();
        }

    }

    let conditionalLinks = null;


    if (token == "" || !token) {
        conditionalLinks = (
            <>
                <li className="nav-item p-3 py-md-1">
                    <Link to={'/login'} className={`nav-link text-${colorMode}`}>
                        Login
                    </Link>
                </li>
                <li className="nav-item p-3 py-md-1">
                    <Link to={'/signup'} className={`nav-link text-${colorMode}`}>
                        Sign Up
                    </Link>
                </li>
            </>
        );
    }

    return (

        <nav className={`navbar navbar-expand-md bg-${colorMode}`}>
            <div className="container-fluid">
                <Link to={token == "" || !token ? "/" : `/${username}`} className="navbar-brand ps-3 h-100 d-flex">
                    <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="60px" />
                    <p className={`h4 text-${colorMode} my-auto`}>Think Flash</p>
                </Link>


                <button
                    className="navbar-toggler btn border-0"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#menuLateral"
                >
                    <div className="">
                        {avatar ?
                            <img className="rounded-circle object-fit-cover" width="60px" height="60px" src={avatar} alt={username} /> :
                            <i className={`fa-solid fa-bars ${colorMode}`}></i>
                        }
                    </div>
                </button>

                <section
                    className={`offcanvas offcanvas-end bg-${colorMode} w-75 ${classes.offcanvas}`}
                    id="menuLateral"
                    tabIndex="-1"
                >
                    <div className="offcanvas-header" data-bs-theme={colorMode === "dark-mode" ? "dark" : "light"}>
                        {token == "" || !token ?
                            <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="60px" />
                            :
                            <div className="px-3">
                                <Link to={`/${username}`} className="p-0 h-100 d-flex text-decoration-none">
                                    <img className="rounded-circle object-fit-cover" src={avatar} alt={username + " avatar "} width="60px" height="60px" />
                                    <p className={`text-${colorMode} fw-bold px-3 my-auto`}>{username}</p>
                                </Link>
                            </div>
                        }
                        <button
                            className={`btn-close mt-3 text-${colorMode}`}
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
                                        <Link to={`/${username}/mydecks`} className={`nav-link text-${colorMode}`}>
                                            My decks
                                        </Link>
                                    </li>
                                    <li className="nav-item px-3">
                                        <Link to={`/${username}/alldecks`} className={`nav-link text-${colorMode}`}>
                                            All decks
                                        </Link>
                                    </li>
                                    <li className="nav-item px-3">
                                        <Link to={`/${username}/config`} className={`nav-link text-${colorMode}`}>
                                            <i className="fas fa-user-cog"></i>
                                        </Link>
                                    </li>
                                    <li className="nav-item ps-3 my-auto">
                                        <button className={`nav-link important-text-${colorMode}`} onClick={logout}>
                                            Logout
                                        </button>
                                    </li>
                                    <li className="nav-item ps-2 my-auto">
                                        <button type="button" className={`nav-link text-${colorMode}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i className="fas fa-adjust"></i>
                                        </button>
                                    </li>
                                    <div className={`modal fade`} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className={`modal-content bg-${colorMode}`}>
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Change color Theme!!</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>You have changed the color of the theme, you have to reset to update</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className={`btn important-btn-${colorMode}`} onClick={(e) => handleClickChangeThemeColor(e)}>Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
