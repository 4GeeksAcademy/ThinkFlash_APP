import useAppContext from "../context/AppContext";

export default function useLogout () {
    
    const { actions } = useAppContext();

    function deleteSesionStorage() {
        
        actions.setToken(null)
        actions.setUsername(null)
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
    }
    return deleteSesionStorage
}