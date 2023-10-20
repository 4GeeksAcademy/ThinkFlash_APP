import getDecks from "../services/decks/getDecks";
import getDMyDecks from "../services/decks/getMyDecks";
import chekLogNavigate from "../../utils/checkLogNavigate";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import '../styles/allDecksActivation.css';
import "../../style.css"
import ContainerDiv from "../components/ContainerDiv";
import GeneralCard from "../components/GeneralCard/GeneralCard";  // Ensure this path is correct

const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AllDecksPage() {
  const [userId, setUserId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDecks, setUserDecks] = useState([]);
  const [allDecksData, setAllDecksData] = useState([]);
  const [decksToShow, setDecksToShow] = useState([]);
  const [activatedCards, setActivatedCards] = useState([]);

  useEffect(() => {
    setUserId(sessionStorage.getItem("user_id"));

    Promise.all([getDMyDecks(userId), getDecks()])
      .then(([userDecksResponse, allDecksResponse]) => {
        setUserDecks(userDecksResponse.decks);
        setAllDecksData(allDecksResponse.decks);
        const myDeckIds = userDecksResponse.decks.map((deck) => deck.id);
        setDecksToShow(allDecksResponse.decks.filter((deck) => !myDeckIds.includes(deck.id)));
      })
      .catch((error) => {
        console.error('Error fetching decks:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const handleClickActive = async (user_id, deck_id) => {
    try {
      const response = await fetch(`${DataBaseURL}/users/add_deck/${user_id}/${deck_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Deck ${deck_id} activated`);
        setActivatedCards([...activatedCards, deck_id]);

        setTimeout(() => {
          setActivatedCards(activatedCards.filter((id) => id !== deck_id));
          setDecksToShow(decksToShow.filter((deck) => deck.id !== deck_id));
        }, 2000);
      } else {
        console.error(`Error activating deck ${deck_id}`);
      }
    } catch (error) {
      console.error("Error activating deck:", error);
    }
  };

  chekLogNavigate();

  if (isLoading) {
    return <LoadingPage/>
  }

  const decksByArea = decksToShow.reduce((acc, deck) => {
    if (!acc[deck.area]) {
      acc[deck.area] = [];
    }
    acc[deck.area].push(deck);
    return acc;
  }, {});

  if (!Object.keys(decksByArea).length){
    return (
      <div className="vh-100 container">
        <ContainerDiv title="All Decks" overflow="y" className="text-dark-mode">
          <h1 className="pt-5">No decks are available at the moment.</h1>
        </ContainerDiv>
      </div>
    );
  }

  


  return (
    
    <div className="vh-100 container">
      <ContainerDiv title="All Decks" overflow="y">
        {Object.entries(decksByArea).map(([area, decks]) => (
          <ContainerDiv key={area} subtitle={area} height="50" overflow="x">
            <div className="decks-container">
              {decks.map((deck) => (
                <div key={deck.id} className={`deck ${activatedCards.includes(deck.id) ? 'activated' : ''}`}>
                  <GeneralCard
                    key={deck.id}
                    title={`${deck.specialize}`}
                    minWidth="16rem"
                    minHeight="300px"
                    shadow=""
                    // review={activatedCards.includes(deck.id) ? 'Deck Activated!' : 'Activate'}
                    img='https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png'
                    // progress={deck.specialize}
                    onClick={() => handleClickActive(userId, deck.id)}
                    className = ""
                  >
                      <div className="justify-content-center d-flex">
                        <button
                          className="btn btn-dark justify-content-center w-100"
                          onClick={() => handleClickActive(userId, deck.id)}
                        >
                          {activatedCards.includes(deck.id) ? 'Deck Activated!' : 'Activate'}
                        </button>
                        </div>
                  </GeneralCard>
                </div>
              ))}
            </div>
          </ContainerDiv>
        ))}
      </ContainerDiv>
    </div>
  );
}
