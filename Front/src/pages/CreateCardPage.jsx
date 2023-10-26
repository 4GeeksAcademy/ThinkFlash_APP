import chekLogNavigate from "../../utils/checkLogNavigate"
import { allDecksData } from "../../constants"
import "../../style.css"
import getMyDecks from "../services/decks/getMyDecks"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import getPreferentColor from "../services/colors/getPreferentColor"
import { useNavigate } from "react-router-dom"
import createDeckCards from "../services/cards/createDeckCard"


export default function CreateCardPage() {
    const [myDecksList, setMyDecksList] = useState([]);
    const [myDeck, setMyDeck] = useState([]);
    const [concept, setConcept] = useState("");
    const [fakeConcepts, setFakeConcepts] = useState(["", "", ""]);
    const [description, setDescription] = useState("");
    const [fakeDescriptions, setFakeDescriptions] = useState(["", "", ""]);
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

    const handleFormSubmit = () => {
        const cardData = {
            description,
            concept,
            fake_concepts: fakeConcepts.filter((fakeConcept) => fakeConcept !== ""),
            fake_descriptions: fakeDescriptions.filter((fakeDescription) => fakeDescription !== ""),
        };

        createDeckCards(userId, deckId, cardData)
            .then((response) => {
                console.log("Card created successfully:", response);
                alert("Card created successfully")
                setConcept("");
                setFakeConcepts(["", "", ""]);
                setDescription("");
                setFakeDescriptions(["", "", ""]);
            })
            .catch((error) => {
                console.error("Error creating card:", error);
            });
    };

    const specialize = myDeck.specialize;
    const area = myDeck.area;
    const theme = myDeck.theme

    const colorMode = getPreferentColor(localStorage.getItem("opposite_color"))

    chekLogNavigate();

    return (
        <div className="h-auto my-3 container mx-auto row align-items-center justify-content-center">
            <form className={`col-12 col-md-9 bg-${colorMode} rounded-5 py-3 px-5 row justify-content-center`}>
                <h2 className="border-bottom">Create New Card</h2>
                <div className="row">
                    <div className="row p-0 mx-auto">
                        <div className={`col-12 col-md-4 text-center my-auto`}>
                            <h3 className={`m-2 p-2 rounded-3 bg-${colorMode}`}>{area}</h3>
                        </div>
                        <div className={`col-12 col-md-4 text-center my-auto`}>
                            <h3 className={`m-2 p-2 rounded-3 bg-${colorMode}`}>{specialize}</h3>
                        </div>
                        <div className={`col-12 col-md-4 text-center my-auto`}>
                            <h3 className={`m-2 p-2 rounded-3 bg-${colorMode}`}>{theme}</h3>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="mt-2">
                            <label htmlFor="concept" className="form-label">
                                <i className="far fa-check-circle me-2" style={{ color: "#5ace8c" }}></i>
                                Concept
                            </label>
                            <textarea
                                className="form-control"
                                id="concept"
                                rows="3"
                                value={concept}
                                onChange={(e) => setConcept(e.target.value)}
                                required
                                maxLength="250"
                            ></textarea>
                        </div>
                        {fakeConcepts.map((fakeConcept, index) => (
                            <div className="mt-2" key={index}>
                                <label htmlFor={`fakeConcept${index + 1}`} className="form-label">
                                    <i className="far fa-times-circle me-2" style={{ color: "#b1486d" }}></i>
                                    Fake Concept {index + 1}
                                </label>
                                <textarea
                                    className="form-control"
                                    id={`fakeConcept${index + 1}`}
                                    rows="3"
                                    value={fakeConcept}
                                    onChange={(e) => {
                                        const updatedFakeConcepts = [...fakeConcepts];
                                        updatedFakeConcepts[index] = e.target.value;
                                        setFakeConcepts(updatedFakeConcepts);
                                    }}                                
                                    required
                                    maxLength="250"
                                ></textarea>
                            </div>
                        ))}
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <div className="mt-2">
                            <label htmlFor="description" className="form-label">
                                <i className="far fa-check-circle me-2" style={{ color: "#5ace8c" }}></i>
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                maxLength="250"
                            ></textarea>
                        </div>
                        {fakeDescriptions.map((fakeDescription, index) => (
                            <div className="mt-2" key={index}>
                                <label htmlFor={`fakeDescription${index + 1}`} className="form-label">
                                    <i className="far fa-times-circle me-2" style={{ color: "#b1486d" }}></i>
                                    Fake Description {index + 1}
                                </label>
                                <textarea
                                    className="form-control"
                                    id={`fakeDescription${index + 1}`}
                                    rows="3"
                                    value={fakeDescription}
                                    onChange={(e) => {
                                        const updatedFakeDescriptions = [...fakeDescriptions];
                                        updatedFakeDescriptions[index] = e.target.value;
                                        setFakeDescriptions(updatedFakeDescriptions);
                                    }}
                                    required
                                    maxLength="250"
                                ></textarea>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="button"
                    className={`col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}
                    onClick={() => {
                        if (concept.trim() === '' || description.trim() === '' || fakeConcepts.some(fc => fc.trim() === '') || fakeDescriptions.some(fd => fd.trim() === '')) {
                            alert("Please complete the entire form.");
                        } else if (description.length > 250 || fakeDescriptions.some(fd => fd.length > 250)) {
                            alert("The text must be no more than 250 characters.");
                        } else {
                            handleFormSubmit();
                        }
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}