import ContainerDiv from "../components/ContainerDiv"
import GeneralCard from "../components/GeneralCard/GeneralCard"
import chekLogNavigate from "../../utils/checkLogNavigate"
import getDecks from "../services/decks/getDecks"
import { allDecksData } from "../../constants"
import "../../style.css"
import getMyDecks from "../services/decks/getMyDecks"
import useAppContext from "../../context/AppContext"

import { useState, useEffect } from "react"




export default function DashboardPage() {
  const [deckList, setDeckList] = useState([]);
  const [myDeckList, setMyDeckList] = useState([])
  //const [isLoading, setIsLoading] = useState(true);
  const { store } = useAppContext();
  const { username, id } = store;

  const progress = { //hardcodeado
    learned: 70, 
    midLearned: 30, 
    toLearn: 20
  }

  useEffect(() => {
    getMyDecks(id)
      .then((res) => {
        setMyDeckList(res.decks);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
  }, [id]);
  useEffect(() => {
    getDecks()
      .then((res) => {
        setDeckList(res.decks);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
  }, []);

  const getDecksAreas = () => {
    const Areas = [...new Set(deckList.map(objeto => objeto.area))];
    return Areas;
  }

  chekLogNavigate()
    
  return (
      <div className="vh-90 container">
        <ContainerDiv title="My Decks" height="50" link={`/${username}/mydecks`} overflow="x">
          {myDeckList.map((deck, index) =>
          (
            <GeneralCard key={index} title={deck.specialize}  minWidth="10rem" minHeight="13rem" shadow={""}
            progress={progress}>
              {deck.theme}
            </GeneralCard>
          ))
          }
        </ContainerDiv>
        <ContainerDiv title="All Decks" height="75" link={`/${username}/alldecks`} overflow="x">
          {
            deckList.length === 0 ? (
              <div>No decks</div>
            ) : (

              getDecksAreas().map((area, index) => (
                <GeneralCard key={index} title={area} minWidth="10rem" minHeight="13rem" shadow={""}
                img="https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png">
                  {area}
                </GeneralCard>
              ))
            )}
        </ContainerDiv>
      </div>
    );
  }


