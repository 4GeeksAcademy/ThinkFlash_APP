import ContainerDiv from "../components/ContainerDiv"
import GeneralCard from "../components/GeneralCard/GeneralCard"
import getDecks from "../services/decks/getDecks"
import { allDecksData } from "../../constants"

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
      <ContainerDiv title="My Decks" height="50" link="/alldecks">
        {deckList.map((deck, index) => 
          (
            <GeneralCard key={index} title={deck.specialize} col="col-md-5 col-lg-2">
              {deck.theme}
            </GeneralCard>
          ))
      }
      </ContainerDiv>
      <ContainerDiv title="All Decks" height="50" link="/alldecks">
        {
        deckList.length === 0 ? (
          <div>No decks</div>
        ) : (
          
          getDecksAreas().map((area, index) => (
            <GeneralCard key={index} title={area} col="col-md-3 col-lg-1">
              {area}
            </GeneralCard>
          ))
        )}
      </ContainerDiv>
    </div>
  );
}