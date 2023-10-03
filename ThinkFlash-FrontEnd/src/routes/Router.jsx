import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter basename=''>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/:username<" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;