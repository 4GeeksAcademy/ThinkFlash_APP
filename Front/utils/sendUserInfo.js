import { toast } from 'react-toastify';
const DataBaseURL = import.meta.env.VITE_REACT_APP_API_URL


export const sendUserInfo = async (user) => {
  try {
    const response = await fetch(`${DataBaseURL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      toast("🦄 User created successfully!");
      toast("✉️Confirm your email address in your inbox to login!");
      return "OK"
    } else {
      const data = await response.json();
      if (data.error === "El usuario ya existe") {
        toast("🙅‍♀️The name or email already exists. Please choose another username or email address.");
      } else {
        toast("❌❌Error creating the user. Please try again later.");
      }
    }
  } catch (error) {
    console.error("Error fetching signup", error);
    toast("❌❌Error creating the user. Please try again later.");
  }
};
