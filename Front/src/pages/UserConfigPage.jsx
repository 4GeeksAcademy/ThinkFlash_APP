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
                <img className="rounded-circle col-3 img-fluid mt-4" src={avatar} alt={username}/>
                <h1 className="col-8">{username}</h1>
            </div>
            <ul className={`nav nav-tabs mt-4`}>
                <li className="nav-item">
                    <a className={`nav-link text-${colorMode}`} aria-current="page" href="#" onClick={()=>setActiveTab("avatar")}>Avatar</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link text-${colorMode}`} aria-current="page" href="#" onClick={()=>setActiveTab("username")}>Name</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link text-${colorMode}`} aria-current="page" href="#" onClick={()=>setActiveTab("email")}>E-mail</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link text-${colorMode}`} aria-current="page" href="#" onClick={()=>setActiveTab("password")}>Password</a>
                </li>
            </ul>
            <div>
                {getShowPage(activeTab)}
            </div>
        </div>
    )
}