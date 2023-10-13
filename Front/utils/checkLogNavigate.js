import LoadingPage from "../src/pages/LoadingPage";
import { useParams, useNavigate, Link } from "react-router-dom"
import useAppContext from "../context/AppContext";

export default function chekLogNavigate () {
    const params = useParams();
    const navigate = useNavigate();
    const { store } = useAppContext();
    const { username } = store;

    if (params.username !== username) { navigate("/") 
    return LoadingPage()}
}