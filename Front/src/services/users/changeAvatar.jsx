const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

const changeAvatar = async ({ token, imageSelected, userId }) => {
    if (!imageSelected) {
        console.error("No image selected");
        return; 
    }

    const formData = new FormData();
    formData.append("avatar", imageSelected);
    formData.append("upload_preset", "pttavpy");

    try {
        const response = await fetch(`${DataBaseURL}/users/${userId}/upload_avatar`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            const err = await response.json();
            console.log("Error in handleChangeAvatar", err);
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

export default changeAvatar;
