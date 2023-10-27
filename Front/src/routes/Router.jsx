import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from '../../context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SingupPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import AllDecksPage from '../pages/AllDecksPage.jsx'
import CreateCardPage from '../pages/CreateCardPage';
import MyDecksPage from '../pages/MyDecksPage.jsx'
import DeckGamePage from '../pages/DeckGamePage';
import ConfirmUser from '../pages/ConfirmUser.jsx';
import InfoSignUp from '../pages/InfoSignup.jsx'
import RecoveryEmail from '../pages/RecoveryEmail.jsx'
import RecoveryPassword from '../pages/RecoveryPassword.jsx'
import UserConfigPage from '../pages/UserConfigPage';
import getPreferentColor from '../services/colors/getPreferentColor';
import ReviewPage from '../pages/ReviewPage';
import NotFound from '../pages/NotFound.jsx';

const Router = () => {
    const colorMode=getPreferentColor(localStorage.getItem("opposite_color"))
    return (

        <BrowserRouter basename=''>
            <AppContextProvider >
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
                <div className={`min-vh-100 body-bg-${colorMode} d-flex flex-column`}>
                <Navbar />
                <div className='vh-80'>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/:username" element={<DashboardPage />} />
                        <Route path="/:username/config" element={<UserConfigPage />} />
                        <Route path="/:username/alldecks" element={<AllDecksPage />} />
                        <Route path="/:username/mydecks" element={<MyDecksPage />} />
                        <Route path="/:username/:deck_id" element={<DeckGamePage />} />
                        <Route path="/:username/:deck_id/create_card" element={<CreateCardPage />} />
                        <Route path="/user/:user_uuid" element={<ConfirmUser />} />
                        <Route path="/infoSignup" element={<InfoSignUp />} />
                        <Route path="/recoveryEmail" element={<RecoveryEmail />} />
                        <Route path="/recoveryPassword/:user_uuid" element={<RecoveryPassword />} />
                        <Route path="/:username/:deck_id/review" element={<ReviewPage/>}/>
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </div>
                <Footer/> 
                </div>
            </AppContextProvider>
        </BrowserRouter>
    );
}

export default Router;