import GeneralCard from "../components/GeneralCard/GeneralCard"
import useAppContext from "../../context/AppContext"
import chekLogNavigate from "../../utils/checkLogNavigate"
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useState, useRef } from "react"
import "../../style.css"

export default function DeckGamePage() {
    const [activeButton, setActiveButton] = useState(null);
    const [cardSide, setCardSide] = useState("front");



    const handleButtonClick = (res) => {
        if (activeButton === null) {
            setActiveButton(res);
        }
    };

    const putNextButton = () => {
        if (activeButton) {
            return (
                <button type="button" className="btn btn-primary border border-0">Next Card!</button>
            )
        }
        return ""
    }

    chekLogNavigate()

    return (

        <div className="container h-90">
            <div className="row h-100">
                <div className="mx-auto col-12 col-md-6 my-auto d-flex justify-content-center">
                    <SwitchTransition mode={"out-in"}>
                        <CSSTransition
                            key={activeButton}
                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                            classNames="fade"
                        >
                            <GeneralCard minWidth="20rem" minHeight="30rem" shadow={"-lg"}>
                                <p className="fs-1 my-auto">
                                    This Will be the description of the card.
                                </p>
                                {putNextButton()}
                            </GeneralCard>
                        </CSSTransition>
                    </SwitchTransition>
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