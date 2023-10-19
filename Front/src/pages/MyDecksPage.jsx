// import ContainerDiv from "../components/ContainerDiv";
// import GeneralCard from "../components/GeneralCard/GeneralCard";
// import chekLogNavigate from "../../utils/checkLogNavigate";
// import getMyDecks from "../services/decks/getMyDecks";
// import useAppContext from "../../context/AppContext";
// import "../../style.css";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Loading from "../components/Loading";

// import { useNavigate } from 'react-router-dom';
// import '../styles/allDecksActivation.css';

// export default function MyDecksPage() {
//   const [deckList, setDeckList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate  = useNavigate();

//   // const [id, setId] = useState("");
//   // const [username, setUsername] = useState("");
//   // const [userId, setUserId] = useState(store.id)
//   const { store } = useAppContext();
//   const { username, id } = store;

//   const progress = {
//     learned: 70,
//     midLearned: 30,
//     toLearn: 20
//   };


//   // useEffect(() => {
//   //   setUsername(sessionStorage.getItem("username"))
//   //   setUserId(sessionStorage.getItem("user_id"))
//   //   getMyDecks(userId)
//   //     .then((res) => {
//   //       setDeckList(res.decks);
//   //       setIsLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching decks:', error);
//   //       setIsLoading(false);
//   //     });
//   // }, [userId]);
//   useEffect(() => {
//     getMyDecks(id)
//       .then((res) => {
//         setDeckList(res.decks);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching decks:", error);
//         setIsLoading(false);
//       });
//   }, [id]);

//   const getDecksAreas = () => {
//     const Areas = [...new Set(deckList.map(objeto => objeto.area))];
//     return Areas;
//   }

//   chekLogNavigate()
//   console.log(username, deckList.length)
  
//   const navigateToAllDecks = () => {
//     navigate(`/${username}/alldecks`)
//   }

//   if (isLoading){
//     return <Loading/>
//   }
  
//   return (
//     <div className="h-75 container">
//       <ContainerDiv title="My Decks" overflow="y">
//         {deckList.length === 0 ? (
//           <p className="mt-5">
//             There are no decks to show 😊, go to <span onClick={navigateToAllDecks} className="linkstyle">All Decks</span> to add new ones
            
//           </p>
//         ) : (
//           getDecksAreas().map((area, index) => (
//             <ContainerDiv key={index} subtitle={area} height="75" overflow="x">
//               {deckList.map((deck, index) => {
//                 console.log("importante", deck.objeto.area); // Fix accessing deck area
//                 if (deck.objeto.area === area) { // Fix accessing deck area
//                   return (
//                     <GeneralCard
//                       key={index}
//                       title={deck.objeto.specialize} // Fix accessing deck properties
//                       minWidth="15rem"
//                       minHeight="20rem"
//                       shadow="-lg"
//                       progress={progress}
//                     >
//                       {deck.objeto.theme} {/* Fix accessing deck properties */}
//                       <div className="d-flex mt-3">
//                         <Link to={`../../${username}/${deck.id}`} className="btn btn-dark my-auto w-100">Go Game</Link>
//                       </div>
//                     </GeneralCard>
//                   );
//                 }
//               })
//               }
//             </ContainerDiv>
//           ))
//         )}
//       </ContainerDiv>
//     </div>
//   );
// }


import ContainerDiv from "../components/ContainerDiv"
import GeneralCard from "../components/GeneralCard/GeneralCard"
import chekLogNavigate from "../../utils/checkLogNavigate"
import getDecks from "../services/decks/getDecks"
import { allDecksData } from "../../constants"
import "../../style.css"
import getMyDecks from "../services/decks/getMyDecks"
import useAppContext from "../../context/AppContext"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"




export default function DashboardPage() {
  const [deckList, setDeckList] = useState([]);
  const [myDeckList, setMyDeckList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const { store } = useAppContext();
  const { username, id } = store;
  const navigate  = useNavigate();

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
  }, [id]);

  const getDecksAreas = () => {
    const Areas = [...new Set(deckList.map(objeto => objeto.area))];
    return Areas;
  }
  const navigateToAllDecks = () => {
    navigate(`/${username}/alldecks`)
  }

  chekLogNavigate()
    
  return (
      <div className="h-75 container">
        <ContainerDiv title="My Decks" height="50" link={`/${username}/mydecks`} overflow="x">
          {myDeckList.length === 0 ? (
              <p className="mt-5">
              There are no decks to show 😊, go to <span onClick={navigateToAllDecks} className="linkstyle">All Decks</span> to add new ones
            </p>
            ) : (
          myDeckList.map((deck, index) =>
          (
            <GeneralCard key={index} title={deck.specialize}  minWidth="10rem" minHeight="13rem" shadow={""}
            progress={progress}>
              {deck.theme}
            </GeneralCard>
          ))
          )}
        </ContainerDiv>

      </div>
    );
  }


