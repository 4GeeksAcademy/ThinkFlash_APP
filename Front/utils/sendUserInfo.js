import { toast } from 'react-toastify';
import { DataBaseURL } from "../constants";


export const sendUserInfo = async (user) => {
  try {
    const response = await fetch(`${DataBaseURL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      toast("🦄 Usuario creado exitosamente!!");
      toast("✉️Confirme su email en su bandeja de entrada para hacer Login!!");
      return "OK"
    } else {
      const data = await response.json();
      if (data.error === "El usuario ya existe") {
        toast("🙅‍♀️El nombre o email ya existen. Por favor, elija otro nombre o email de usuario.");
      } else {
        toast("❌❌Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
      }
    }
  } catch (error) {
    console.error("Error fetching signup", error);
    toast("❌❌Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
  }
};
