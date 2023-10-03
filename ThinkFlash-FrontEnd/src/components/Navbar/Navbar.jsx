import { Link } from "react-router-dom";

export default function Navbar({usernameLink}) {
    return (
        <nav className="navbar bg-primary">
                <Link to={usernameLink} className="navbar-brand ps-3">
                    <img src='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png' alt="Logo" width="auto" height="100"/>
                </Link>
        </nav>
    )
}