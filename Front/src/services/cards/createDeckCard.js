const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default function createDeckCards(user_id, deck_id, cardData) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cardData),
  };

  return fetch(`${DataBaseURL}/users/${user_id}/decks/${deck_id}/cards`, requestOptions)
    .then((res) => {
      if (!res.ok) {
        throw Error('Error fetching data from API');
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Error:', err);
      throw err;
    });
}