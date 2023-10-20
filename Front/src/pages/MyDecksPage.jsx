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

  const getDecksAreas = () => {
    const Areas = [...new Set(deckList.map(objeto => objeto.area))];
    return Areas;
  }

  const colorMode = getPreferentColor()

  chekLogNavigate()

  return (
    <div className="h-75 container">
      <ContainerDiv title="My Decks" overflow="y">
        {getDecksAreas().map((area, index) => {
          return (
            <ContainerDiv key={index} subtitle={area} height="75" overflow="x">
              {deckList.map((deck, index) => {
                console.log("importante", deck.area)
                if (deck.area == area) {
                  return (
                    <GeneralCard key={index} title={deck.specialize} minWidth="15rem" minHeight="20rem" shadow={"-lg"}
                      progress={myProgressList[deck.id]}
                    >
                      {deck.theme}
                      <div className="d-flex mt-3">
                        <Link to={`../../${username}/${deck.id}`} className={`btn card-btn-${colorMode} my-auto w-100`}>Go Game</Link>
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