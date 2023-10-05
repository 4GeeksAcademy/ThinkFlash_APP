import ContainerDiv from "../components/ContainerDiv"
import GeneralCard from "../components/GeneralCard/GeneralCard"
import getDecks from "../services/decks/getDecks"

import { useState, useEffect } from "react"

export default function DashboardPage({ username }) {
  const [deckList, setDeckList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDecks()
      .then((res) => {
        console.log("fuera del if", res);
        if (res == null) {
          setDeckList([]);
        } else {
          try {
            setDeckList(res);
          } catch {
            console.log("No ha cambiado el estado");
          }
        }
        console.log("dentro del if", deckList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error al obtener datos", err);
        setIsLoading(false);
      });
  }, []);


  return (
    <div className="h-75">
      <ContainerDiv
        title="My Decks"
        height="50"
        link={`/${username}/mydecks`}
      >
        This is my decks
      </ContainerDiv>
      <ContainerDiv
        title="My Decks"
        height="50"
        link={`/alldecks`}
      >
        {deckList.length === 0 ? <div>No decks</div> :

          deckList.map((deck) => {
            return (
              <GeneralCard title={deck.specialize}>
                {deck.theme}
              </GeneralCard>
            );
          })
        }
      </ContainerDiv>
    </div>
  )
}