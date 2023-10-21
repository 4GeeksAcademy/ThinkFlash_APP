import chekLogNavigate from "../../utils/checkLogNavigate"
import { allDecksData } from "../../constants"
import "../../style.css"
import getMyDecks from "../services/decks/getMyDecks"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import getPreferentColor from "../services/colors/getPreferentColor"
import { useNavigate } from "react-router-dom"


export default function CreateCardPage() {
    const [myDecksList, setMyDecksList] = useState([]);
    const [myDeck, setMyDeck] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    const navigate = useNavigate()
  
    const params = useParams();
    const deckId = params.deck_id;
    const username = sessionStorage.getItem("username");
    const userId = sessionStorage.getItem("user_id");
  
    useEffect(() => {
      getMyDecks(userId)
        .then((res) => {
          setMyDecksList(res.decks);
        })
        .catch((error) => {
          console.error("Error fetching decks:", error);
        })
        .finally(() => {
          setIsDataLoaded(true);
        });
    }, [userId]);
  
    useEffect(() => {
      if (isDataLoaded) {
        myDecksList.map((deck) => {
          if (deck.id == deckId) {
            setMyDeck(deck);
          }
        });
      }
    }, [isDataLoaded, myDecksList, deckId]);

    const specialize = myDeck.specialize;
    const area = myDeck.area;
    const theme = myDeck.theme

    const colorMode = getPreferentColor()

    chekLogNavigate();

    return (
        <div className="h-auto mt-3 container mx-auto row align-items-center justify-content-center">
            <form className={`col-12 col-md-9 bg-${colorMode} rounded-5 py-3 px-5 row justify-content-center`}>
                <h2 className="border-bottom">Create New Card</h2>
                <div className="row">
                    <div className="row p-0 mx-auto">
                        <div className="col-12 col-md-4 text-center my-auto">
                            <h3>{area}</h3>
                        </div>
                        <div className="col-12 col-md-4 text-center my-auto">
                            <h3>{specialize}</h3>
                        </div>
                        <div className="col-12 col-md-4 text-center my-auto">
                            <h3>{theme}</h3>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-5">
                        <div className="mt-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Concept</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Fake Concept</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Fake Concept</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Fake Concept</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-5">
                        <div className="mt-2">
                            <div className="mt-2">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Fake Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Fake Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Fake Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className={`col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Submit</button>
            </form>
        </div>
    )
}