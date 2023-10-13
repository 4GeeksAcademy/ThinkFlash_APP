import ContainerDiv from "../components/ContainerDiv"
import GeneralCard from "../components/GeneralCard/GeneralCard"
import chekLogNavigate from "../../utils/checkLogNavigate"
import getDecks from "../services/decks/getDecks"
import { allDecksData } from "../../constants"
import "../../style.css"
import useAppContext from "../../context/AppContext"

import { useState, useEffect } from "react"




export default function DashboardPage() {
  const [deckList, setDeckList] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const { store } = useAppContext();
  const { username } = store;

  const progress = { //hardcodeado
    learned: 70, 
    midLearned: 30, 
    toLearn: 20
  }

  const getDecksData = () => { 
    const data = allDecksData
    return data
  }

  useEffect(() => {
    const data = getDecksData()
    setDeckList(data)
  }, [])

  const getDecksAreas = () => {
    const Areas = [...new Set(deckList.map(objeto => objeto.area))];
    return Areas;
  }

  chekLogNavigate()
    
  return (
      <div className="h-75 container">
        <ContainerDiv title="My Decks" height="50" link={`/${username}/mydecks`} overflow="x">
          {deckList.map((deck, index) =>
          (
            <GeneralCard key={index} title={deck.specialize}  minWidth="10rem" minHeight="13rem" shadow={""}
            progress={progress}>
              {deck.theme}
            </GeneralCard>
          ))
          }
        </ContainerDiv>
        <ContainerDiv title="All Decks" height="50" link={`/${username}/alldecks`} overflow="x">
          {
            deckList.length === 0 ? (
              <div>No decks</div>
            ) : (

              getDecksAreas().map((area, index) => (
                <GeneralCard key={index} title={area} minWidth="10rem" minHeight="13rem" shadow={""}
                img="https://learning-corner.learning.europa.eu/sites/default/files/styles/oe_theme_medium_no_crop/public/2021-12/eurocoin_0.png?itok=I_UddCl2">
                  {area}
                </GeneralCard>
              ))
            )}
        </ContainerDiv>
      </div>
    );
  }


