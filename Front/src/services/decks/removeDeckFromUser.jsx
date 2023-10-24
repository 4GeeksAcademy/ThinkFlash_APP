export default async function removeDeckFromUser(user_id, deck_id) {
    const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem("token")

    try {
        const res = await fetch(`${DataBaseURL}/users/${user_id}/decks/${deck_id}/remove`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!res.ok) {
            throw Error('Error fetch!!!', res);
        }
        const data = await res.json();

        console.log(data);
        return data;
    } catch (err) {
        console.error(err);

        throw Error('Error removing deck from user');
    }
}

