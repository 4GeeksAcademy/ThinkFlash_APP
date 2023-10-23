import { toast } from 'react-toastify';
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
    } else if (response.status === 401) {
      toast.error("🙅‍♀️🙅‍♀️🤦‍♂️🤯Credenciales inválidas o email no confirmado. Por favor, verifica tu correo electrónico y contraseña");
      return null; 
    } else {
      throw new Error("Error in loginfetch");
    }
  } catch (error) {
    toast.error("Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
    throw new Error("Error fetching login", error);
  }
};
