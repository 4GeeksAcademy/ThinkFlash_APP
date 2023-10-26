import { useNavigate } from "react-router-dom";
import useAppContext from "../context/AppContext";

export default function useLogout () {
    const navigate = useNavigate();
    const { actions } = useAppContext();

    function deleteSesionStorage() {
        actions.setToken(null)
        actions.setUsername(null)
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('avatar')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('user_id')
        navigate("/")
    }
    return deleteSesionStorage
}