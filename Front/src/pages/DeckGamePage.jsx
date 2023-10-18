import React, { useState, useEffect } from "react";
import GeneralCard from "../components/GeneralCard/GeneralCard";
import useAppContext from "../../context/AppContext";
import chekLogNavigate from "../../utils/checkLogNavigate";
import getDeckCards from "../services/cards/getDeckCards";
import { useParams } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "../../style.css";

export default function DeckGamePage() {
    const [cardList, setCardList] = useState([]);
    const [learnedCardList, setLearnedCardList] = useState([]);
    const [midLearnedCardList, setMidLearnedCardList] = useState([]);
    const [toLearnCardList, setToLearnCardList] = useState([]);
    const [bodyCard, setBodyCard] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [activeButton, setActiveButton] = useState(null);
    const { store } = useAppContext();
    const { id } = store;

    const params = useParams();
    const deck_id = params.deck_id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await getDeckCards(id, deck_id);
                setCardList(res.cards);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching decks:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [deck_id, id]);

    useEffect(() => {
        setToLearnCardList(cardList.filter(card => card.score === 1));
        setMidLearnedCardList(cardList.filter(card => card.score > 1 && card.score < 4));
        setLearnedCardList(cardList.filter(card => card.score === 4));
    }, [cardList]);

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };

    const getRandomDescriptionOrConcept = () => {
        if (toLearnCardList.length > 0 || learnedCardList.length > 0 || midLearnedCardList.length > 0) {
            let selectedCard;
            if (getRandomInt(2) === 1) {
                if (getRandomInt(10) <= 6) {
                    selectedCard = toLearnCardList[getRandomInt(toLearnCardList.length)];
                } else if (getRandomInt(10) > 9) {
                    selectedCard = learnedCardList[getRandomInt(learnedCardList.length)];
                } else {
                    selectedCard = midLearnedCardList[getRandomInt(midLearnedCardList.length)];
                }
                setBodyCard(`${selectedCard.description} score: ${selectedCard.score}`)
            } else {
                if (getRandomInt(10) <= 6) {
                    selectedCard = toLearnCardList[getRandomInt(toLearnCardList.length)];
                } else if (getRandomInt(10) > 9) {
                    selectedCard = learnedCardList[getRandomInt(learnedCardList.length)];
                } else {
                    selectedCard = midLearnedCardList[getRandomInt(midLearnedCardList.length)];
                }
                setBodyCard(`${selectedCard.concept} score: ${selectedCard.score}`)
            };
            setActiveButton(null)
        }
    };

    const handleButtonClick = (res) => {
        if (activeButton === null) {
            setActiveButton(res);
        }
    };

    const putNextButton = () => {
        if (activeButton) {
            return (
                <button type="button" className="btn btn-dark border border-0" onClick={getRandomDescriptionOrConcept}>Next Card!</button>
            );
        }
        return "";
    };

    useEffect(() => {
        getRandomDescriptionOrConcept();
    }, [toLearnCardList, learnedCardList, midLearnedCardList]);

    chekLogNavigate();

    return (
        <div className="container h-90">
            <div className="row h-100">
                <div className="mx-auto col-12 col-md-6 my-auto d-flex justify-content-center">
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={activeButton}
                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                            classNames="fade"
                        >
                            <GeneralCard minWidth="20rem" minHeight="30rem" shadow="-lg">
                                <p className="fs-1 my-auto">
                                    {bodyCard || "Loading..."}
                                </p>
                                {putNextButton()}
                            </GeneralCard>
                        </CSSTransition>
                    </SwitchTransition>
                </div>
                <div className="col-12 col-md-6 my-auto mx-auto">
                    <div className="text-container d-flex flex-column justify-content-center mb-5 text-center">
                        <div className="list-group shadow-lg bg-dark">
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
    );
}
