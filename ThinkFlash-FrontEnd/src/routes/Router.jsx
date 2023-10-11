import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from '../../context/AppContext';

import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SingupPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import AllDecksPage from '../pages/AllDecksPage.jsx'
import MyDecksPage from '../pages/MyDecksPage.jsx'
import DeckGamePage from '../pages/DeckGamePage';


const Router = () => {
    return (
        <AppContextProvider>
        <BrowserRouter basename=''>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/:username" element={<DashboardPage />} />
                <Route path="/alldecks" element={<AllDecksPage />} />
                <Route path="/:username/mydecks" element={<MyDecksPage />} />
                <Route path="/:username/:deck" element={<DeckGamePage />} />
            </Routes>
        </BrowserRouter>
        </AppContextProvider>
    );
}

export default Router;