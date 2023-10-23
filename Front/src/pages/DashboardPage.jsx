import ContainerDiv from "../components/ContainerDiv"
import GeneralCard from "../components/GeneralCard/GeneralCard"
import chekLogNavigate from "../../utils/checkLogNavigate"
import getDecks from "../services/decks/getDecks"
import { allDecksData } from "../../constants"
import "../../style.css"
import getMyDecks from "../services/decks/getMyDecks"
import useAppContext from "../../context/AppContext"
import getDeckProgress from "../services/decks/getDeckProgress"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoadingPage from "./LoadingPage"

export default function DashboardPage() {
  const [deckList, setDeckList] = useState([]);
  const [myDeckList, setMyDeckList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const { store } = useAppContext();
  const { username, id } = store;
  const [myProgressList, setMyProgressList] = useState({});

  useEffect(() => {
    Promise.all([
      getMyDecks(id),
      getDecks()
    ])
      .then(([myDecksRes, allDecksRes]) => {
        setMyDeckList(myDecksRes.decks);
        setDeckList(allDecksRes.decks);
        setIsLoading(false); 
      })
      .catch((errors) => {
        console.error("Error fetching data:", errors);
        // setError(errors);
        setIsLoading(false); 
      });
  }, [id]);

  useEffect(() => {
    const fetchProgress = async () => {
      const progressList = {};
      for (const deck of myDeckList) {
        try {
          const progress = await getDeckProgress({ user_id: id, deck_id: deck.id });
          progressList[deck.id] = progress;
        } catch (error) {
          console.error("Error fetching deck progress:", error);
        }
      }
      setMyProgressList(progressList);
    };

    if (myDeckList.length > 0) {
      fetchProgress();
    }
  }, [myDeckList, id]);

  const getDecksAreas = () => {
    const areas = [...new Set(deckList.map((objeto) => objeto.area))];
    return areas;
  };

  chekLogNavigate();
  
  if (isLoading){
    return <LoadingPage/>
  }

  return (
    <div className="vh-80 h-auto container">
      <ContainerDiv title="My Decks" height="50" link={`/${username}/mydecks`} overflow="x">
        {myDeckList.length ? (
          myDeckList.map((deck, index) => (
            <GeneralCard key={index} title={deck.specialize} minWidth="10rem" minHeight="13rem" shadow={""} progress={myProgressList[deck.id]}>
              {deck.theme}
            </GeneralCard>
          ))
        ) : (
          <div className="text-center d-flex ms-auto me-auto">
            <p className="pt-5 text-white justify-content-center">
              You don't have activated any decks!! 😊 <br /> Go to <Link to={`../../${username}/alldecks`}>All decks</Link> to activate the first one
            </p>
          </div>
        )}
      </ContainerDiv>




    
      <ContainerDiv title="All Decks" height="75" link={`/${username}/alldecks`} overflow="x"className="d-flex align-items-center justify-content-center">
        {!deckList.length ? (
          
          <div className="text-center d-flex ms-auto me-auto">
          <p className="pt-5 text-white">
            You've activated all the available decks!! 😊 <br /> Go to <Link to={`../../${username}/mydecks`}>My decks</Link> to start learning
          </p>
        </div>
        
        ) : (
          getDecksAreas().map((area, index) => (
            <GeneralCard key={index} title={area} minWidth="10rem" minHeight="13rem" shadow="" img="https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png">
              {area}
            </GeneralCard>
          ))
        )}
      </ContainerDiv>
    </div>
  );
}