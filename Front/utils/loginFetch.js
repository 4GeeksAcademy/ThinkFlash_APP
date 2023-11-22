import { toast } from 'react-toastify';

const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const handleClickLogin = async (email, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  try {
    const response = await fetch(`${DataBaseURL}/login`, options);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else if (response.status === 401) {
      toast.error("🙅‍♀️🙅‍♀️🤦‍♂️🤯 Invalid credentials or unconfirmed email. Please verify your email and password.");
      return null; 
    } else {
      throw new Error(`Error in handleClickLogin: ${response.status}`);
    }
  } catch (error) {
    toast.error("Error logging in. Please try again later.");
    console.error(`Error fetching login: ${error.message}`);
    throw new Error("Error fetching login", error);
  }
};
