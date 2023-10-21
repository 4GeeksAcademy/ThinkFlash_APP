export default async function removeDeckFromUser(user_id, deck_id) {
    const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

    try {
        const res = await fetch(`${DataBaseURL}/users/${user_id}/decks/${deck_id}/remove`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            throw Error('Error fetch!!!');
        }
        const data = await res.json();

        console.log(data);
        return data;
    } catch (err) {
        console.error(err);

        throw Error('Error removing deck from user');
    }
}

