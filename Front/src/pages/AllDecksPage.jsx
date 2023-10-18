import getDecks from "../services/decks/getDecks";
import getDMyDecks from "../services/decks/getMyDecks";
import chekLogNavigate from "../../utils/checkLogNavigate";
import { useEffect, useState } from "react";
import '../styles/allDecksActivation.css';
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
    return <div>Loading...</div>;
  }

  const decksByArea = decksToShow.reduce((acc, deck) => {
    if (!acc[deck.area]) {
      acc[deck.area] = [];
    }
    acc[deck.area].push(deck);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(decksByArea).map(([area, decks]) => (
        <div key={area} className="container mt-5">
          <h1>{area}</h1>
          <div className="decks-container">
            {decks.map((deck) =>(

              <div key={deck.id} className="deck">
                <div className={`card ${activatedCards.includes(deck.id) ? 'activated' : ''}`} style={{ width: "18rem" }}>
                  <img
                    className="card-img-top p-2 rounded"
                    src="https://placehold.co/600x400"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Deck {deck.id}</h5>
                    <p className="card-text" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                      This is a short description of the deck content
                    </p>
                    <div className="justify-content-center d-flex">
                      <button className="btn btn-primary justify-content-center  w-100" onClick={() => handleClickActive(userId, deck.id)}>
                        {activatedCards.includes(deck.id) ? 'Deck Activated!' : 'Activate'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
