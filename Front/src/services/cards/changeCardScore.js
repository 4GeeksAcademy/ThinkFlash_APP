const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default function changeCardScore({user_id, deck_id, card_id, operation}) {
  return fetch(`${DataBaseURL}/users/${user_id}/decks/${deck_id}/card_score/${card_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ operation: operation }),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error('Error fetch!!!');
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
}
