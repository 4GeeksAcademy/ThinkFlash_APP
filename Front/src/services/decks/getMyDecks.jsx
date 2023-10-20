const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;
// import {useAppContext} from "../../../context/AppContext";

export default function getMyDecks(user_id) {
    // const { store } = useAppContext();
  return fetch(`${DataBaseURL}/users/${user_id}/decks`)
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
