import { DataBaseURL } from "../constants";

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
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    throw new Error("Error in loginfetch");
  } catch (error) {
    throw new Error("Error fetching login", error);
  }
};
