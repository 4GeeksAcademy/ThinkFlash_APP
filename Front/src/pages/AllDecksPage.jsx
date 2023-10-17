import getDecks from "../services/decks/getDecks";
import chekLogNavigate from "../../utils/checkLogNavigate";
import { useEffect, useState } from "react";

export default function AllDecksPage() {
  const [allDecksData, setAllDecksData] = useState([])

  useEffect(() => {
    getDecks()
      .then((res) => {
        setAllDecksData(res.decks);
      })
      .catch((error) => {
        console.error('Error fetching decks:', error);
      });
  }, []);
    
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
                        <button className="btn btn-primary justify-content-center  w-100">
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