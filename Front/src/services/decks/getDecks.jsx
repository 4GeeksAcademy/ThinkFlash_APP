

const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;
const token = sessionStorage.getItem("token")

export default function getDecks() {
  console.log("token", token)
  return fetch(`${DataBaseURL}/all_decks`, {
    method: 'GET',
    headers: 
      {'Authorization': `Bearer ${token}`}
      // 'Content-Type': 'application/json'
})
    .then((res) => {
      if (!res.ok) {
        throw Error('Error fetch!!!');
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data); 
      return data;
    })
    .catch((err) => console.log(err));
  }