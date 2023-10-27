import { useState, useEffect } from "react";
import GeneralCard from "../components/GeneralCard/GeneralCard";
import ContainerDiv from "../components/ContainerDiv";
import getPreferentColor from "../services/colors/getPreferentColor";
import useAppContext from "../../context/AppContext";
import getDeckCards from "../services/cards/getDeckCards";
import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useNavigate } from "react-router-dom";
import "../../style.css";

export default function ReviewPage() {
    const [cardList, setCardList] = useState([]);
    const [learnedCardList, setLearnedCardList] = useState([]);
    const [midLearnedCardList, setMidLearnedCardList] = useState([]);
    const [toLearnCardList, setToLearnCardList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { store } = useAppContext();
    const { id } = store;

    const params = useParams();
    const deck_id = params.deck_id;
    const username = params.username;

    const navigate = useNavigate();

    useEffect(() => {
        getDeckCards(id, deck_id)
            .then((res) => {
                console.log("esta funcionando", res)
                setCardList(res)
                return res
            })
            .then((res)=>{
                setToLearnCardList(res.filter(card => card.score === 1));
                setMidLearnedCardList(res.filter(card => card.score > 1 && card.score < 4));
                setLearnedCardList(res.filter(card => card.score === 4));
            })
            .then(() => {
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("Error fetch in review page", err)
            })
    }, [deck_id, id]);

    console.log("card list", cardList)
    console.log("learned list", learnedCardList)
    console.log("midlearnedList", midLearnedCardList)
    console.log("tolearnlist", toLearnCardList)

    const getToNewCardButton = () => {
        return (<button className={`btn btn-${colorMode} float-end me-3 mb-1`} onClick={() => navigate(`/${username}/${deck_id}/create_card`)}>
            <i class="fas fa-plus me-1"></i> New Card
        </button>)
    }


    const colorMode = getPreferentColor(localStorage.getItem("opposite_color"));

    return (
        <div className="h-auto container">
            <ContainerDiv
                title="To Learn Cards"
                titleButton={getToNewCardButton()}
                overflow="y">
                {toLearnCardList.map((card, index) => {
                    return (
                        <GeneralCard key={index} title={card.concept} minWidth="15rem" minHeight="20rem" shadow={"-lg"}
                            className=""
                            img='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png'>
                            {card.description}
                        </GeneralCard>
                    )
                })

                }

            </ContainerDiv>
            <ContainerDiv title="MidLearned Cards" overflow="y">
                {midLearnedCardList.map((card, index) => {
                    return (
                        <GeneralCard key={index} title={card.concept} minWidth="15rem" minHeight="20rem" shadow={"-lg"}
                            className=""
                            img='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png'>
                            {card.description}
                        </GeneralCard>
                    )
                })

                }

            </ContainerDiv>
            <ContainerDiv title="Learned Cards" overflow="y">
                {learnedCardList.map((card, index) => {
                    return (
                        <GeneralCard key={index} title={card.concept} minWidth="15rem" minHeight="20rem" shadow={"-lg"}
                            className=""
                            img='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png'>
                            {card.description}
                        </GeneralCard>
                    )
                })

                }

            </ContainerDiv>
        </div>
    );
}