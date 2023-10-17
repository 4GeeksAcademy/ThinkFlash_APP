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
  const user_id = sessionStorage.getItem("user_id");
  const { username } = store;

  const progress = {
    learned: 70,
    midLearned: 30,
    toLearn: 20
  };

  useEffect(() => {
    getMyDecks(user_id)
      .then((res) => {
        setDeckList(res.decks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching decks:', error);
        setIsLoading(false);
      });
  }, []);

  const getDecksByArea = () => {
    const decksByArea = {};
    deckList.forEach((deck) => {
      if (!decksByArea[deck.area]) {
        decksByArea[deck.area] = [];
      }
      decksByArea[deck.area].push(deck);
    });
    return decksByArea;
  };

  const groupedDecksByArea = getDecksByArea();

  chekLogNavigate();

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        Object.entries(groupedDecksByArea).map(([area, decks]) => (
          <div key={area} className="container mt-5">
            <h1>{area}</h1>
            <div className="decks-container">
              {decks.map((deck, index) => (
                <GeneralCard
                  key={index}
                  title={deck.specialize}
                  minWidth="15rem"
                  minHeight="20rem"
                  shadow="-lg"
                  progress={progress}
                >
                  {deck.theme}
                  <div className="d-flex mt-3">
                    <Link to={`../../${username}/${deck.theme}`} className="btn btn-primary my-auto w-100">
                      Go Game
                    </Link>
                  </div>
                </GeneralCard>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
