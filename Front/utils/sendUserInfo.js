// import { DataBaseURL } from "../constants";
// import useAppContext from "../context/AppContext";

// export const sendUserInfo = async (e) => {
//     const {store} = useAppContext();
//     const { user } = store;

//     e.preventDefault();
//     const response = await fetch(`${DataBaseURL}/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user)
//     });
    
//     try {
//       const data = await response.json();
//       updateSessionStorage({token: data.token, username: data.username});
      
//       if (response.ok) {
//         alert("Usuario creado exitosamente");
//       } else {
//         if (data.error === "El usuario ya existe") {
//           alert("El usuario ya existe. Por favor, elija otro nombre de usuario.");
//         } else {
//           alert("Error al crear el usuario. Por favor, inténtelo de nuevo más tarde.");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching signup", error);
//     }
//   };