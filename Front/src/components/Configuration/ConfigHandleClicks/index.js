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
            if (response.ok) {
                alert("Data change success")
                return response.json();
            } else {
                return response.json().then(err => {
                    console.log("Error in handleChangeValue", err)
                });
            }
        })
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
};

export default handleChangeValue;