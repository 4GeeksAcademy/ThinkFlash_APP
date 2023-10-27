import { Link } from "react-router-dom"
import getPreferentColor from "../../services/colors/getPreferentColor"

export default function ContainerDiv({ children, height, title, link, overflow, subtitle, titleButton }) {
    const generateOverflowXClass = () => {
        return("overflow-x-auto card-body h-75 d-flex containerDiv"
)
    }
    const generateOverflowYClass = () => {
        return("card-body d-flex flex-wrap containerDiv justify-content-center")
    }

    const colorMode = getPreferentColor(localStorage.getItem("opposite_color"))

    if(subtitle){
        return (
            <div className={`h-${height} w-100 my-3`}>
                <div className="border border-0 container">
                    <div className={`w-100 border-0 align-baseline d-flex justify-content-between align-items-end bg-transparent text-${colorMode}`}>
                        <h2 className="mb-0 mt-0">{subtitle}</h2>
                        {link && <Link to={link} className={`ms-auto me-0 fs-7 text-${colorMode} text-end`}>View all</Link>}
                    </div>
                </div>
                <div className={`${overflow !== "y" ? generateOverflowXClass() : generateOverflowYClass()}`}>
                    {children}
                </div>  
            </div>
        )
    }
    return (
        <div className={`vh-${height} w-100 my-3`}>
            <div className="border border-0 h-25">
                <div className={`w-100 border-bottom align-baseline d-flex justify-content-between align-items-end bg-transparent text-${colorMode}`}>
                    <h1 className="mb-0 mt-0">{title}</h1>
                    {titleButton}
                    {link && <Link to={link} className={`ms-auto me-0 fs-7 text-${colorMode} text-end`}>View all</Link>}
                </div>
            </div>
            <div className={ overflow !== "y" ? generateOverflowXClass() : generateOverflowYClass()}>
                {children}
            </div>  
        </div>
    )
    }


