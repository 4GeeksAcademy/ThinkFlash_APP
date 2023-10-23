import { toast } from "react-toastify";

const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default async function getMyDecks(user_id) {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token not available");
    }

    const response = await fetch(`${DataBaseURL}/users/${user_id}/decks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
     console.log("Succes fetching my decks!")
     toast("There was a problem loading your decks!")
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error, "Error getting my decks");
    throw error; 
  }
}
