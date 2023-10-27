import '../styles/confirmUser.css';
import getPreferentColor from '../services/colors/getPreferentColor';


export default function InfoSignUp() {
  const colorMode = getPreferentColor(localStorage.getItem("opposite_color"));

    return (
        <div>
            <div className="container vh-90 d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    <h5 className={`text-center text-${colorMode}`}>Check your mailbox!!!</h5>
                </div>
                <img className="pulsating-heart" style={{ width: "35vh", height: "30vh" }} src="https://i.ibb.co/Phs1CSV/Logo-2-removebg-preview.png" alt="ThinkFlash Logo" />
            </div>
        </div>
    )
}