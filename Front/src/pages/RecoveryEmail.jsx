import React, {useState} from 'react';
import { toast } from 'react-toastify';
import '../styles/confirmUser.css';
import { DataBaseURL } from "../../constants";
import { useNavigate } from 'react-router-dom';
import getPreferentColor from '../services/colors/getPreferentColor';

export default function RecoveryEmail() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const colorMode = getPreferentColor(localStorage.getItem("opposite_color"));
    const sendRecoveryEmail = async () => {
        try {
            console.log("dsdfs", DataBaseURL)
            console.log("email", email)
            const response = await fetch(`${DataBaseURL}/users/recovery_email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
          
            if (response.ok) {
                toast(`✅😊😁 Change your password in the URL sent to your adrress: ${email}`);
                console.log('Email enviado correctamente');

            } else {
                toast('🥺Error sending email');
                console.error('Error sending email');
            }
        } catch (error) {
            toast('Try later... We have some trouble here...🥴');
            console.error('Error en la solicitud POST:', error);
        }
    };

    return (
        <div>
            <div className="container vh-90 d-flex flex-column justify-content-center align-items-center">
                <h5 className= {`text-center mb-4 pulsating-heart text-${colorMode}`}>Type your email here, so that we can send you a link to change your password...</h5>
                <div className="mb-4">
                    <div className="form-group mt-2 text-left align-items-center justify-content-center ">
                        <label htmlFor="emailInput" className="mr-2 mt-2">Email:</label>
                        <input
                            id="emailInput"
                            className="form-control input-lg"
                            placeholder="Your email here!"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='text-center'>
                            <button className={`btn btn-${colorMode} rounded-button mt-3`} onClick={sendRecoveryEmail}>
                                Click to send email!
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}
