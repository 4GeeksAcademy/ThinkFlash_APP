import { useState, useEffect } from "react";
import GeneralCard from "../components/GeneralCard/GeneralCard";
import getPreferentColor from "../services/colors/getPreferentColor";
import changeCardScore from "../services/cards/changeCardScore";
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
    const [solutions, setSolutions] = useState([]);
    const [correctSolution, setCorrectSolution] = useState("");
    const [cardId, setCardId] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
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

    const colorMode = getPreferentColor();

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
                setBodyCard(`${selectedCard.description} score: ${selectedCard.score}`);
                setSolutions([
                    selectedCard.concept,
                    selectedCard.fake_concepts[0],
                    selectedCard.fake_concepts[1],
                    selectedCard.fake_concepts[2]
                ]);
                setCorrectSolution(selectedCard.concept);
                setCardId(selectedCard.id)
            } else {
                if (getRandomInt(10) <= 6) {
                    selectedCard = toLearnCardList[getRandomInt(toLearnCardList.length)];
                } else if (getRandomInt(10) > 9) {
                    selectedCard = learnedCardList[getRandomInt(learnedCardList.length)];
                } else {
                    selectedCard = midLearnedCardList[getRandomInt(midLearnedCardList.length)];
                }
                setBodyCard(`${selectedCard.concept} score: ${selectedCard.score}`);
                setSolutions([
                    selectedCard.description,
                    selectedCard.fake_descriptions[0],
                    selectedCard.fake_descriptions[1],
                    selectedCard.fake_descriptions[2]
                ]);
                setCorrectSolution(selectedCard.description);
                setCardId(selectedCard.id)
            }
            setActiveButtonIndex(null);
        }
    };

    const generateRandomSolutions = () => {
        const availableSolutions = [...solutions];
        const randomizedSolutions = [];
        for (let i = 0; i < 4; i++) {
            const randomIndex = getRandomInt(availableSolutions.length);
            const solution = availableSolutions.splice(randomIndex, 1)[0];
            randomizedSolutions.push(solution);
        }
        setSolutions(randomizedSolutions);
    };

    const handleButtonClick = ({index, card_id}) => {
        if (activeButtonIndex === null) {
            setActiveButtonIndex(index);
            const selectedSolution = solutions[index];
            if (selectedSolution === correctSolution) {
                changeCardScore({user_id:id, deck_id:deck_id, card_id:card_id, operation:"sum"})
                setCardList(cardList)
            } else {
                changeCardScore({user_id:id, deck_id:deck_id, card_id:card_id, operation:"subs"})
                setCardList(cardList)
            }
        }
    };

    const putNextButton = () => {
        if (activeButtonIndex !== null) {
            return (
                <button type="button" className={`btn btn-${colorMode} border border-0`} onClick={getRandomDescriptionOrConcept}>
                    Next Card!
                </button>
            );
        }
        return null;
    };

    useEffect(() => {
        getRandomDescriptionOrConcept();
    }, [toLearnCardList, learnedCardList, midLearnedCardList]);

    useEffect(() => {
        generateRandomSolutions();
    }, [bodyCard]);

    chekLogNavigate();

    return (
        <div className="container vh-90">
            <div className="row h-100">
                <div className="mx-auto col-12  mb-0 mt-auto d-flex justify-content-center">
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={activeButtonIndex}
                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                            classNames="fade"
                        >
                            <GeneralCard minWidth="16rem" minHeight="21rem" shadow="-lg">
                                <p className="fs-2 my-auto">{bodyCard || "Loading..."}</p>
                                {putNextButton()}
                            </GeneralCard>
                        </CSSTransition>
                    </SwitchTransition>
                </div>
                <div className="col-12 col-sm-8 col-lg-6 mb-auto mx-auto">
                    <div className="text-container d-flex flex-column justify-content-center text-center">
                        <div className={`list-group shadow-lg bg-${colorMode}`}>
                            {solutions.map((solution, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`btn btn-${colorMode} m-2 flip-button ${
                                        activeButtonIndex === index ? solution === correctSolution
                                        ? "active border-2 border-success"
                                        : "active border-2 border-danger"
                                    : ""
                                    } ${
                                        activeButtonIndex !== null && activeButtonIndex !== index
                                            ? solution === correctSolution
                                                ? "border-2 border-success"
                                                : ""
                                            : ""
                                    }`}
                                    onClick={() => handleButtonClick({index:index, card_id:cardId})}
                                >
                                    {solution}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}