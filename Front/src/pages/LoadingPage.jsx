import "../../style.css"

export default function LoadingPage() {
    return (
        <div>
            <div className="container vh-90 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-grow custom-spinner position-absolute top-50 start-50 translate-middle m-2" role="status" style={{ width: "30vh", height: "30vh" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <img className="ms-3 mt-1 position-absolute top-50 start-50 translate-middle" style={{ width: "35vh", height: "30vh" }} src="https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png" alt="ThinkFlash Logo" />
            </div>
        </div>
    )
}