import { Link } from "react-router-dom"

export default function ContainerDiv({ children, height, title, link, overflow, subtitle }) {
    const generateOverflowXClass = () => {
        return("overflow-x-auto card-body h-75 d-flex containerDiv"
)
    }
    const generateOverflowYClass = () => {
        return("card-body d-flex flex-wrap containerDiv justify-content-center")
    }

    if(subtitle){
        return (
            <div className={`h-${height} w-100 my-3`}>
                <div className="card border border-0 h-25 container">
                    <div className="w-100 card-header border-0 align-baseline d-flex justify-content-between align-items-end bg-white">
                        <h2 className="mb-0 mt-0">{subtitle}</h2>
                        {link && <Link to={link} className="ms-auto me-0 fs-7 text-body-secondary text-end">View all</Link>}
                    </div>
                </div>
                <div className={ overflow !== "y" ? generateOverflowXClass() : generateOverflowYClass()}>
                    {children}
                </div>  
            </div>
        )
    }
    return (
        <div className={`h-${height} w-100 my-3`}>
            <div className="card border border-0 h-25">
                <div className="w-100 card-header border-bottom align-baseline d-flex justify-content-between align-items-end bg-white">
                    <h1 className="mb-0 mt-0">{title}</h1>
                    {link && <Link to={link} className="ms-auto me-0 fs-7 text-body-secondary text-end">View all</Link>}
                </div>
            </div>
            <div className={ overflow !== "y" ? generateOverflowXClass() : generateOverflowYClass()}>
                {children}
            </div>  
        </div>
    )
    }


