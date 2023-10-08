import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SingupPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import AllDecksPage from '../pages/AllDecksPage.jsx'
import { AppContextProvider } from '../../context/AppContext';

const Router = () => {
    return (
        <AppContextProvider>
        <BrowserRouter basename=''>
            <Navbar
            
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/:username" element={<DashboardPage />} />
                <Route path="/alldecks" element={<AllDecksPage />} />
            </Routes>
        </BrowserRouter>
        </AppContextProvider>
    );
}

export default Router;