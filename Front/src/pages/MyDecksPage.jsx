import ContainerDiv from "../components/ContainerDiv";
import GeneralCard from "../components/GeneralCard/GeneralCard";
import chekLogNavigate from "../../utils/checkLogNavigate";
import getMyDecks from "../services/decks/getMyDecks";
import useAppContext from "../../context/AppContext";
import getDeckProgress from "../services/decks/getDeckProgress";
import "../../style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getPreferentColor from "../services/colors/getPreferentColor";
import LoadingPage from "./LoadingPage";

export default function MyDecksPage() {
  const [deckList, setDeckList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myProgressList, setMyProgressList] = useState({});
  const { store } = useAppContext();
  const { username, id } = store;

  const progress = {
    learned: 70,
    midLearned: 30,
    toLearn: 20
  };

  useEffect(() => {
    getMyDecks(id)
      .then((res) => {
        setDeckList(res.decks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching decks:', error);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchProgress = async () => {
      const progressList = {};
      for (const deck of deckList) {
        try {
          const progress = await getDeckProgress({ user_id: id, deck_id: deck.id });
          progressList[deck.id] = progress;
        } catch (error) {
          console.error("Error fetching deck progress:", error);
        }
      }
      setMyProgressList(progressList);
    };

    if (deckList.length > 0) {
      fetchProgress();
    }
  }, [deckList, id]);



    if (!deckList.length){
      return (
        <div className="h-auto container">
          <ContainerDiv title="My Decks" overflow="y" className="text-dark-mode justify-content-center align-items-center flex-direction-row">
          <div className="text-center g-0">
            <p className="pt-5 text-white">
            You activated all the available decks!! 😊 <br /> Go to <Link to={`../../${username}/alldecks`}>All decks</Link> to start learning
            </p>
            </div>
          </ContainerDiv>
        </div>
      );
    }

  const getDecksAreas = () => {
    const Areas = [...new Set(deckList.map(objeto => objeto.area))];
    return Areas;
  }

  const colorMode = getPreferentColor()


  chekLogNavigate()
  if (isLoading){
    return <LoadingPage/>
  }

  return (
    <div className="h-auto container">
      <ContainerDiv title="My Decks" overflow="y">
        {getDecksAreas().map((area, index) => {
          return (
            <ContainerDiv key={index} subtitle={area} height="75" overflow="x">
              {deckList.map((deck, index) => {
                if (deck.area == area) {
                  return (
                    <GeneralCard key={index} title={deck.specialize} minWidth="15rem" minHeight="20rem" shadow={"-lg"}
                      progress={myProgressList[deck.id]}
                    >
                      {deck.theme}
                      <div className="d-flex mt-3">
                        <Link to={`../../${username}/${deck.id}`} className={`btn card-btn-${colorMode} my-auto w-100 me-2`}>Go Game</Link>
                        <Link to={`../../${username}/${deck.id}/review`} className={`btn card-btn-${colorMode} my-auto w-100`}>Review</Link>
                      </div>
                    </GeneralCard>
                  )
                }
              }
              )
              }
            </ContainerDiv>
          )
        })
        }

      </ContainerDiv>
    </div>
  );
}