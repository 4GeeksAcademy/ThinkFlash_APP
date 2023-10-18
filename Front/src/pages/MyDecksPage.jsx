import ContainerDiv from "../components/ContainerDiv";
import GeneralCard from "../components/GeneralCard/GeneralCard";
import chekLogNavigate from "../../utils/checkLogNavigate";
import getMyDecks from "../services/decks/getMyDecks";
import useAppContext from "../../context/AppContext";
import "../../style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MyDecksPage() {
  const [deckList, setDeckList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const getDecksAreas = () => {
    const Areas = [...new Set(deckList.map(objeto => objeto.area))];
    return Areas;
  }

  chekLogNavigate()

  return (
    <div className="h-75 container">
      <ContainerDiv title="My Decks" overflow="y">
        {getDecksAreas().map((area, index) => {
          return (
            <ContainerDiv key={index} subtitle={area} overflow="x">
              {deckList.map((deck, index) => {
                console.log("importante", deck.area)
                if (deck.area == area) {
                  return (
                    <GeneralCard key={index} title={deck.specialize} minWidth="15rem" minHeight="20rem" shadow={"-lg"}
                      progress={progress}
                    >
                      {deck.theme}
                      <div className="d-flex mt-3">
                        <Link to={`../../${username}/${deck.id}`} className="btn btn-dark my-auto w-100">Go Game</Link>
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