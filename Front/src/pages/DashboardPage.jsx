import ContainerDiv from "../components/ContainerDiv"
import GeneralCard from "../components/GeneralCard/GeneralCard"
import getDecks from "../services/decks/getDecks"
import { allDecksData } from "../../constants"
import "../../style.css"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"



export default function DashboardPage() {
  const [deckList, setDeckList] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const params = useParams()

  const getDecksData = () => { // Esa funcion se cambiará por la función getDecks del hook comentado.
    const data = allDecksData
    return data
  }

  useEffect(() => { // Este hook se cambiará por el comentado.
    const data = getDecksData()
    setDeckList(data)
  }, [])

  const getDecksAreas = () => {
    const Areas = [...new Set(deckList.map(objeto => objeto.area))];
    return Areas;
  }


  return (
    <div className="h-75 container">
      <ContainerDiv title="My Decks" height="50" link="/:username/mydecks" overflow="x">
        {deckList.map((deck, index) =>
        (
          <GeneralCard key={index} title={deck.specialize}  minWidth="10rem" minHeight="10rem"
          img="https://avatars.githubusercontent.com/u/134429160?v=4">
            {deck.theme}
          </GeneralCard>
        ))
        }
      </ContainerDiv>
      <ContainerDiv title="All Decks" height="50" link="/alldecks" overflow="x">
        {
          deckList.length === 0 ? (
            <div>No decks</div>
          ) : (

            getDecksAreas().map((area, index) => (
              <GeneralCard key={index} title={area} minWidth="10rem" minHeight="10rem"
              img="https://learning-corner.learning.europa.eu/sites/default/files/styles/oe_theme_medium_no_crop/public/2021-12/eurocoin_0.png?itok=I_UddCl2">
                {area}
              </GeneralCard>
            ))
          )}
      </ContainerDiv>
    </div>
  );
}