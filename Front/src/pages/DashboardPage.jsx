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




export default function DashboardPage() {
  const [deckList, setDeckList] = useState([]);
  const [myDeckList, setMyDeckList] = useState([]);
  const { store } = useAppContext();
  const { username, id } = store;
  const [myProgressList, setMyProgressList] = useState({});

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

  return (
    <div className="vh-90 container">
      <ContainerDiv title="My Decks" height="50" link={`/${username}/mydecks`} overflow="x">
        {myDeckList.map((deck, index) => (
          <GeneralCard key={index} title={deck.specialize} minWidth="10rem" minHeight="13rem" shadow="" progress={myProgressList[deck.id]}>
            {deck.theme}
          </GeneralCard>
        ))}
      </ContainerDiv>
      <ContainerDiv title="All Decks" height="75" link={`/${username}/alldecks`} overflow="x">
        {deckList.length === 0 ? (
          <div>No decks</div>
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