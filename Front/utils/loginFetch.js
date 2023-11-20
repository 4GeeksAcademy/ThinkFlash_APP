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
      toast.error("🙅‍♀️🙅‍♀️🤦‍♂️🤯 Credenciales inválidas o email no confirmado. Por favor, verifica tu correo electrónico y contraseña");
      return null; 
    } else {
      throw new Error(`Error in handleClickLogin: ${response.status}`);
    }
  } catch (error) {
    toast.error("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
    console.error(`Error fetching login: ${error.message}`);
    throw new Error("Error fetching login", error);
  }
};
