import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SingupPage';
import DashboardPage from '../pages/DashboardPage';
import AllDecksPage from '../pages/AllDecksPage'

const Router = () => {
    return (
        <BrowserRouter basename=''>
            <Navbar
            usernameLink="/"
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/:username" element={<DashboardPage />} />
                <Route path="/alldecks" element={<AllDecksPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;