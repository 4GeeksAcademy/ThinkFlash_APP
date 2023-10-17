import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/confirmUser.css';
import { DataBaseURL } from "../../constants";
import { useNavigate } from 'react-router-dom';


export default function ConfirmUser() {
    const { user_id } = useParams();
    const navigate  = useNavigate();
    console.log( "userid",user_id)
    console.log(DataBaseURL)
    const confirmUser = async () => {
        try {
            const response = await fetch(`${DataBaseURL}/users/confirm/${user_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ confirmed: true }),
            });

            if (response.ok) {
                toast('✅😊😁 Usuario confirmado, puede hacer Login y empezar a aprender!!!');
                console.log('Usuario confirmado correctamente');
                navigate("/login")
            } else {
                toast('🥺Error al confirmar el usuario!');
                console.error('Error al confirmar usuario');
            }
        } catch (error) {
            toast('Intentelo mas tarde... tenemos algun problemilla por aqui...🥴');
            console.error('Error en la solicitud PATCH:', error);
        }
    };

    return (
        <div>
            <div className="container h-90 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    <button className="rounded-button" onClick={confirmUser}>
                        Click to confirm user!
                    </button>
                </div>
                <img
                    className="pulsating-heart"
                    style={{ width: "35vh", height: "30vh" }}
                    src="https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png"
                    alt="ThinkFlash Logo"
                    onClick={confirmUser}
                />
            </div>
        </div>
    );
}
