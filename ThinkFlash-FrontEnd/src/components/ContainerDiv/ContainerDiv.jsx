import { Link } from "react-router-dom"

export default function ContainerDiv({ children, height, title, link }) {
    return (
        <div className={` h-${height} w-100 my-3`}>
            <div className="card border border-0 h-25">
                <div className="w-100 card-header border-bottom align-baseline d-flex justify-content-between align-items-end">
                    <p className="mb-0 mt-0">{title}</p>
                    {link && <Link to={link} className="ms-auto me-0 fs-7 text-body-secondary text-end">View all</Link>}
                </div>
                </div>
                
                    <div className="overflow-x-auto card-body h-75 d-flex ">
                        {children}
                    </div>
               

                
        </div>
        // <div id="carouselExample" class="carousel slide">
        //     <div class="carousel-inner">
        //         <div class="carousel-item active">
        //             {children}
        //         </div>
        //         <div class="carousel-item">
        //             {children}
        //         </div>
        //     </div>
        //     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        //         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span class="visually-hidden">Previous</span>
        //     </button>
        //     <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span class="visually-hidden">Next</span>
        //     </button>
        // </div>
    )
}

