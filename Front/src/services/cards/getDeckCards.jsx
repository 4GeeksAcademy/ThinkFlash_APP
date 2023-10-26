const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;
const token = sessionStorage.getItem("token")

export default function getDeckCards(user_id, deck_id) {
  return fetch(`${DataBaseURL}/users/${user_id}/decks/${deck_id}/cards`,
  {
    method: 'GET',
    headers: 
      {'Authorization': `Bearer ${token}`}
}
  )
    .then((res) => {
      if (!res.ok) {
        throw Error('Error fetch!!!');
      }
      return res.json();
    })
    .then((data) => {
      let userCards = [];

      data.cards.map((card)=>{
        if (card.author == user_id || !card.author){
          userCards.push(card)
        }
      })
      console.log("userCards",userCards)
      return userCards;

    })
    .then((data) => {
      return data
    })
    .catch((err) => console.log(err));
}
