import getPreferentColor from "../services/colors/getPreferentColor"
import chekLogNavigate from "../../utils/checkLogNavigate"
import useAppContext from "../../context/AppContext"
import getShowPage from "../components/Configuration/GetShowPage"
import { useState, useEffect } from "react"

export default function UserConfigPage() {
    const [activeTab, setActiveTab] = useState()

    const { store } = useAppContext();
    const username = store.username;
    const email = store.email
    const avatar = sessionStorage.getItem("avatar")


    const colorMode = getPreferentColor(localStorage.getItem("opposite_color"))


    return (
        <div className={`container my-3 bg-${colorMode} rounded-3`}>

            <div className="row justify-content-center align-items-center">
                <div className="col-7 col-md-3 mt-4">
                    <div className="ratio ratio-1x1">
                        <img className="rounded-circle object-fit-cover" src={avatar} alt={username} />
                    </div>
                </div>
                <div className="col-8 d-flex flex-column mt-4 text-center text-md-start">
                    <h1>{username}</h1>
                    <h3>{email}</h3>
                    <div className="fs-2">
                        <i className="fas fa-medal fa-lg"></i> <i className="fas fa-medal fa-lg"></i> <i className="fas fa-medal fa-lg"></i> <i className="fas fa-medal fa-lg"></i>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <ul className={`nav nav-tabs`}>
                    <li className="nav-item">
                        <a className={`nav-link px-2  text-${colorMode}`} aria-current="page" href="#ChangeAvatar" onClick={() => setActiveTab("avatar")}>Avatar</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link px-2  text-${colorMode}`} aria-current="page" href="#ChangeName" onClick={() => setActiveTab("username")}>Name</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link px-2  text-${colorMode}`} aria-current="page" href="#ChangeEmail" onClick={() => setActiveTab("email")}>E-mail</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link px-2  text-${colorMode}`} aria-current="page" href="#ChangePassword" onClick={() => setActiveTab("password")}>Password</a>
                    </li>
                </ul>
            </div>
            <div>
                {getShowPage(activeTab)}
            </div>
        </div>
    )
}