const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

const handleChangeValue = ({ userId, newValue, toChange, token, password }) => {
    return fetch(`${DataBaseURL}/users/${userId}/configuration`, {
            method: 'PATCH',
            body: JSON.stringify({ to_change: toChange, new_value: newValue, password: password }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response, "response")
            return response
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
};

export default handleChangeValue;