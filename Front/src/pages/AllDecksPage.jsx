import React, { useEffect, useState } from 'react';
import ContainerDiv from '../components/ContainerDiv';
import GeneralCard from '../components/GeneralCard/GeneralCard';
import getDecks from '../services/decks/getDecks';
import getDMyDecks from '../services/decks/getMyDecks';
import getPreferentColor from '../services/colors/getPreferentColor';
import useAppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import '../styles/allDecksActivation.css';
import '../../style.css';

const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default function AllDecksPage() {
  const [userId, setUserId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDecks, setUserDecks] = useState([]);
  const [allDecks, setAllDecks] = useState([]);
  const [decksToShow, setDecksToShow] = useState([]);
  const [activatedCards, setActivatedCards] = useState([]);
  const { store } = useAppContext();
  const { username } = store;

  const colorMode = getPreferentColor(localStorage.getItem("opposite_color"))

  useEffect(() => {
    setUserId(sessionStorage.getItem('user_id'));

    Promise.all([getDMyDecks(userId), getDecks()])
      .then(([userDecksResponse, allDecksResponse]) => {
        setUserDecks(userDecksResponse.decks);
        setAllDecks(allDecksResponse.decks)
        const myDeckIds = userDecksResponse.decks.map((deck) => deck.id);
        setDecksToShow(allDecksResponse.decks.filter((deck) => !myDeckIds.includes(deck.id)).sort((a, b) => a.area.localeCompare(b.area)));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching decks:', error);
        setIsLoading(false);
      });
  }, [userId]);

  const handleClickActive = async (user_id, deck_id) => {
    const token = sessionStorage.getItem("token")
    try {
      const response = await fetch(`${DataBaseURL}/users/add_deck/${user_id}/${deck_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`Deck ${deck_id} activated`);
        setActivatedCards([...activatedCards, deck_id]);

        setTimeout(() => {
          setActivatedCards(activatedCards.filter((id) => id !== deck_id));
          setDecksToShow(decksToShow.filter((deck) => deck.id !== deck_id));
        }, 2000);
      } else {
        console.error(`Error activating deck ${deck_id}`);
      }
    } catch (error) {
      console.error('Error activating deck:', error);
    }
  };


  if (decksToShow.length) {
    const decksByArea = decksToShow.reduce((acc, deck) => {
      if (!acc[deck.area]) {
        acc[deck.area] = [];
      }
      acc[deck.area].push(deck);
      return acc;
    }, {});


    if (isLoading) {
      return <LoadingPage />;
    }
    console.log(decksToShow)
    return (
      <div className="h-auto container">
        <ContainerDiv title="All Decks" overflow="y">
          {Object.entries(decksByArea).map(([area, decks]) => (
            <ContainerDiv key={area} subtitle={area} height="50" overflow="x">
              <div className="decks-container">
                {decks.map((deck) => (
                  <div key={deck.id} className={`deck ${activatedCards.includes(deck.id) ? 'activated' : ''}`}>
                    <GeneralCard
                      key={deck.id}
                      title={`${deck.specialize}`}
                      minWidth="16rem"
                      minHeight="300px"
                      shadow=""
                      img="https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png"
                      onClick={() => handleClickActive(userId, deck.id)}
                    >
                      <div className="justify-content-center d-flex">
                        <button
                          className={`btn btn-${colorMode} justify-content-center w-100`}
                          onClick={() => handleClickActive(userId, deck.id)}
                        >
                          {activatedCards.includes(deck.id) ? 'Deck Activated!' : 'Activate'}
                        </button>
                      </div>
                    </GeneralCard>
                  </div>
                ))}
              </div>
            </ContainerDiv>
          ))}
        </ContainerDiv>
      </div>
    );
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  
  if (allDecks) {
    if (allDecks.length === 0) {
      return <LoadingPage />;
    }
  }
  
  // if (!isLoading && decksToShow.length === 0 && activatedCards.length != 0 ) {
    if (!isLoading && allDecks && userDecks) {
      if (allDecks.length === userDecks.length && allDecks.length !=0) {
    // if (allDecks.length === userDecks.length && userDecks.length != 0 && !isLoading) {
    return (
      <div className="h-auto container">
        <ContainerDiv
          title="All Decks"
          overflow="y"
          className="text-dark-mode justify-content-center align-items-center flex-direction-row"
        >
          <div className="text-center g-0">
            <p className="pt-5 text-white">
              You activated all the available decks!! 😊 <br /> Go to{' '}
              <Link to={`../../${username}/mydecks`}>My decks</Link> to start learning
            </p>
          </div>
        </ContainerDiv>
      </div>
    );
  }
  }

}
