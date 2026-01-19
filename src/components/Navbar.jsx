import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from 'primereact/button';

const Navbar = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const items = [
        { label: 'Dashboard', icon: 'pi pi-home', command: () => navigate('/dashboard') },
        { label: 'Members', icon: 'pi pi-users', command: () => navigate('/members') },
        { label: 'Broadcast', icon: 'pi pi-megaphone', command: () => navigate('/broadcast') },
        { label: 'Profile', icon: 'pi pi-user', command: () => navigate('/profile') }
    ];

    const end = <Button label="Logout" icon="pi pi-power-off" className="p-button-text p-button-danger" onClick={() => { logout(); navigate('/login'); }} />;

    return (
        <Menubar model={items} end={end} className="mb-4" start={<span className="text-xl font-bold mr-4 text-blue-600">WA Broadcast</span>} />
    );
};

export default Navbar;
