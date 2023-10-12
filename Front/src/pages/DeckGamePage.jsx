import GeneralCard from "../components/GeneralCard/GeneralCard"
import "../../style.css"
import useAppContext from "../../context/AppContext"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function DeckGamePage() {
    const [activeButton, setActiveButton] = useState(null);
    const [cardSide, setCardSide] = useState("front");
    const { store } = useAppContext();
    const { username } = store;

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const flipButtons = document.querySelectorAll(".flip-button");

        flipButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const cardInner = document.querySelector(".flip-card-inner");
                const side = button.getAttribute("data-card-side");

                if (side === "front") {
                    cardInner.classList.remove("flipped");
                } else {
                    cardInner.classList.add("flipped");
                }
            });
        });

        return () => {
            flipButtons.forEach((button) => {
                button.removeEventListener("click");
            });
        };
    }, [])


    const handleButtonClick = (res) => {
        if (activeButton === null) {
            setActiveButton(res);
        }
    };

    if (params.username !== username) {
        navigate("/login")
        return <h1>Cargando...</h1>
    }

    return (
        <div className="container h-90">
            <div className="row h-100">
                <div className="col-12 col-md-6 my-auto d-flex justify-content-center">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <GeneralCard minWidth="20rem" minHeight="30rem" shadow={"-lg"}>
                                    <p className="fs-1 my-auto">
                                        This Will be the concept of the card.
                                    </p>
                                </GeneralCard>
                            </div>
                            <div className="flip-card-back">
                                <GeneralCard minWidth="20rem" minHeight="30rem" shadow={"-lg"}>
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
                            <button
                                type="button"
                                className={`btn btn-light m-2 flip-button ${activeButton === "first" ? "active" : ""}`}
                                onClick={() => handleButtonClick("first")}
                            >
                                A first solution
                            </button>
                            <button
                                type="button"
                                className={`btn btn-light m-2 flip-button ${activeButton === "second" ? "active" : ""}`}
                                onClick={() => handleButtonClick("second")}
                            >
                                A second solution
                            </button>
                            <button
                                type="button"
                                className={`btn btn-light m-2 flip-button ${activeButton === "third" ? "active" : ""}`}
                                onClick={() => handleButtonClick("third")}
                            >
                                A third solution
                            </button>
                            <button
                                type="button"
                                className={`btn btn-light m-2 flip-button ${activeButton === "fourth" ? "active" : ""}`}
                                onClick={() => handleButtonClick("fourth")}
                            >
                                A fourth solution
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}