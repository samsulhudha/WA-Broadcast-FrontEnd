import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Broadcast from './pages/Broadcast';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? <><Navbar /><div className="p-4"><Outlet /></div></> : <Navigate to="/login" replace />;
};

import Landing from './pages/Landing'; // Import Landing

// ...

function App() {
  return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Landing />} /> {/* Landing Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/broadcast" element={<Broadcast />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirect unknown to Landing */}
            </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
