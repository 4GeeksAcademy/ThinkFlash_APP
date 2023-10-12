import GeneralCard from "../components/GeneralCard/GeneralCard"
import "../../style.css"
import useAppContext from "../../context/AppContext"
import { useParams, useNavigate } from "react-router-dom"

export default function DeckGamePage() {
    const { store } = useAppContext();
    const { username } = store;
    
    const params = useParams();
    const navigate = useNavigate();

    if (params.username !== username) { navigate("/login") 
    return <h1>Cargando...</h1>}

    return (
        <div className="container h-90">
            <div className="row h-100">
                <div className="col-12 col-md-6 my-auto d-flex justify-content-center">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <GeneralCard  minWidth="20rem" minHeight="30rem" shadow={"-lg"}>
                                <p className="fs-1 my-auto">
                                    This Will be the concept of the card.
                                </p>
                                </GeneralCard>
                            </div>
                            <div className="flip-card-back">
                                <GeneralCard  minWidth="20rem" minHeight="30rem" shadow={"-lg"}>
                                    <p className="fs-1 my-auto">
                                        This Will be the description of the card.
                                    </p>
                                </GeneralCard>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="col-12 col-md-6 my-auto mx-auto">
                    <div className="text-container d-flex flex-column justify-content-center mb-5 text-center">
                        <div className="list-group shadow-lg bg-primary">
                            <button type="button" className="btn btn-light m-2">
                                A first solution
                            </button>
                            <button type="button" className="btn btn-light m-2">
                                A second solution
                            </button>
                            <button type="button" className="btn btn-light m-2">
                                A third solution
                            </button>
                            <button type="button" className="btn btn-light m-2">
                                A fourth solution
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}