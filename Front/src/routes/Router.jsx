import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from '../../context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SingupPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import AllDecksPage from '../pages/AllDecksPage.jsx'
import MyDecksPage from '../pages/MyDecksPage.jsx'
import DeckGamePage from '../pages/DeckGamePage';
import ConfirmUser from '../pages/ConfirmUser.jsx';
import InfoSignUp from '../pages/InfoSignup.jsx'

const Router = () => {
    return (

        <BrowserRouter basename=''>
            <AppContextProvider>
                <ToastContainer
                    position="top-center"
                    autoClose={8000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"

                />
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/:username" element={<DashboardPage />} />
                    <Route path="/:username/alldecks" element={<AllDecksPage />} />
                    <Route path="/:username/mydecks" element={<MyDecksPage />} />
                    <Route path="/:username/:deck" element={<DeckGamePage />} />
                    <Route path="/user/:user_id" element={<ConfirmUser />} />
                    <Route path="/infoSignup" element={<InfoSignUp />} />
                </Routes>
            </AppContextProvider>
        </BrowserRouter>
    );
}

export default Router;