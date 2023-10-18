import getDecks from "../services/decks/getDecks";
import chekLogNavigate from "../../utils/checkLogNavigate";
import { useEffect, useState } from "react";
import useAppContext from "../../context/AppContext";
const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AllDecksPage() {
  const { store } = useAppContext();
  const user_id = store.id;
  const [allDecksData, setAllDecksData] = useState([]);
  console.log('Hello', user_id)

  
  useEffect(() => {
    // const user_decks = `${DataBaseURL}/users



    getDecks()
      .then((res) => {
        // for (deck in res.decks
        setAllDecksData(res.decks);
      })
      .catch((error) => {
        console.error('Error fetching decks:', error);
      });
  }, []);
  
  const handleClickActive = async (user_id, deck_id) => {
    try {
      const response = await fetch(`${DataBaseURL}/users/add_deck/${user_id}/${deck_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Handle successful activation
        console.log(`Deck ${deck_id} activated`);
      } else {
        // Handle activation failure
        console.error(`Error activating deck ${deck_id}`);
      }
    } catch (error) {
      console.error("Error activating deck:", error);
    }
  };
      
    
  const decksByArea = allDecksData.reduce((acc, deck) => {
    if (!acc[deck.area]) {
      acc[deck.area] = [];
    }
    acc[deck.area].push(deck);
    return acc;
  }, {});

  chekLogNavigate();
    
  return (
    <>
      {Object.entries(decksByArea).map(([area, decks]) => (
        <div key={area} className="container mt-5">
          <h1>{area}</h1>
          <div className="decks-container">
            {decks.map((deck) => (
              <div key={deck.id} className="deck">
                <div className="card" style={{ width: "18rem" }}>
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
                      <button className="btn btn-dark justify-content-center  w-100" onClick={() => handleClickActive(user_id, deck.id)}>
                        Activate
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