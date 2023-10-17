const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default function getMyDecks() {
  return fetch(`${DataBaseURL}/:username`)
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