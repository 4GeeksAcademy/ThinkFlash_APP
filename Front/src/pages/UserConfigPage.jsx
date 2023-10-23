import getPreferentColor from "../services/colors/getPreferentColor"
import chekLogNavigate from "../../utils/checkLogNavigate"
import useAppContext from "../../context/AppContext"
import getShowPage from "../services/users/configuration/getShowPage"
import { useState } from "react"

export default function UserConfigPage() {
    const [activeTab, setActiveTab] = useState()

    const {store} = useAppContext();
    const username = store.username;
    const avatar = store.avatar;

    const colorMode = getPreferentColor()
    chekLogNavigate()


    return (
        <div className={`container my-3 bg-${colorMode} rounded-3`}>

            <div className="row justify-content-center align-items-center">
                <div className="col-7 col-md-3 mt-4">
                    <img className="rounded-circle img-fluid" src={avatar} alt={username}/>
                </div>
                <div className="col-8 d-flex flex-column mt-4 text-center text-md-start">
                    <h1>{username}</h1>
                    <div className="fs-2">
                        <i class="fas fa-medal fa-lg"></i> <i class="fas fa-medal fa-lg"></i> <i class="fas fa-medal fa-lg"></i> <i class="fas fa-medal fa-lg"></i>
                    </div>
                </div>
            </div>
            <p className="mt-4 ms-3">Click to change:</p>
            <ul className={`nav nav-tabs`}>
                <li className="nav-item">
                    <a className={`nav-link text-${colorMode}`} aria-current="page" href="#ChangeAvatar" onClick={()=>setActiveTab("avatar")}>Avatar</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link text-${colorMode}`} aria-current="page" href="#ChangeName" onClick={()=>setActiveTab("username")}>Name</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link text-${colorMode}`} aria-current="page" href="#ChangeEmail" onClick={()=>setActiveTab("email")}>E-mail</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link text-${colorMode}`} aria-current="page" href="#ChangePassword" onClick={()=>setActiveTab("password")}>Password</a>
                </li>
            </ul>
            <div>
                {getShowPage(activeTab)}
            </div>
        </div>
    )
}