import { Link } from "react-router-dom"

export default function ContainerDiv({ children, height, title, link }) {
    return (
        <div className={`h-${height} w-100`}>
            <div className="card h-25">
                <div className="card-header d-flex">
                    {title}
                    {link && <Link to={link} className="ms-auto me-0">View all</Link>}
                </div>
                <div className="card-body h-75">
                    {children}
                </div>
            </div>
        </div>

    )
}