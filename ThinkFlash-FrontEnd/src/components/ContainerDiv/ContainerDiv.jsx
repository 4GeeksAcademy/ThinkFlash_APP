import { Link } from "react-router-dom"

export default function ContainerDiv({ children, height, title, link }) {
    return (
        <div className={`h-${height} w-100 my-3 `}>
            <div className="card border border-0 h-25">
                <div className="w-100 card-header border-bottom align-baseline d-flex justify-content-between align-items-end">
                    <p className="mb-0 mt-0">{title}</p>
                    {link && <Link to={link} className="ms-auto me-0 fs-7 text-body-secondary text-end">View all</Link>}
                </div>
                <div className="card-body h-75">
                    {children}
                </div>
            </div>
        </div>
    )
}

