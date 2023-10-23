const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default function getDeckProgress({ user_id, deck_id }) {
    return fetch(`${DataBaseURL}/users/${user_id}/decks/${deck_id}/cards`)
    .then((res) => {
        if (!res.ok) {
            throw Error('Error fetch!!!');
        }
        return res.json();
    })
    .then((deck) => {
        const deckCardsProgress = deck.cards.map((card) => card.score);

        const progress = {
            learned: 0,
            midLearned: 0,
            toLearn: 0
        };

        for (const score of deckCardsProgress) {
            if (score === 1) {
                progress.toLearn++;
            } else if (score === 4) {
                progress.learned++;
            } else if (score > 1 && score < 4) {
                progress.midLearned++;
            }
        }
        // console.log(progress)
        return progress;
    })
    .catch((error) => {
        console.error("Error fetching deck progress:", error);
        throw error;
    });
}
