const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export default async function resetCardsScore(user_id, deck_id) {
  const url = `${DataBaseURL}/users/${user_id}/decks/${deck_id}/card_score/reset`;

  try {
        const response = await fetch(url, {
            method: 'PATCH',
        });
        if (!response.ok) {
            throw new Error(`Failed to reset card scores: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error resetting card scores:', error);
        throw error;
    }
}
