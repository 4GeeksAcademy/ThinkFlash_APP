import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/confirmUser.css';
import { DataBaseURL } from "../../constants";
import { useNavigate } from 'react-router-dom';
import getPreferentColor from "../services/colors/getPreferentColor.js";



export default function ConfirmUser() {
    const { user_uuid } = useParams();
    const navigate  = useNavigate();
    const colorMode = getPreferentColor(localStorage.getItem("opposite_color"));

    const confirmUser = async () => {
        try {
            const response = await fetch(`${DataBaseURL}/users/confirm`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_uuid: user_uuid}),
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
                    <button className={`rounded-button bg-${colorMode}`} onClick={confirmUser}>
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
