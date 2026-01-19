import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import api from '../api/axios';

const Profile = () => {
    const [user, setUser] = useState({
        full_name: '',
        email: '',
        password: '',
        organization_name: '' // readonly generally
    });
    const [loading, setLoading] = useState(false);
    const toast = React.useRef(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get('/users/me');
            setUser(prev => ({ ...prev, ...res.data, password: '' }));
        } catch (error) {
            console.error("Failed to fetch profile", error);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // We reuse the signup schema structure which expects these fields
            // For update, email is usually immutable in simple systems or ID
            // We send what the backend expects
            const payload = {
                email: user.email, 
                full_name: user.full_name,
                password: user.password
            };
            
            await api.put('/users/me', payload);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Profile updated' });
            fetchProfile();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Update failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-grid p-justify-center p-align-center" style={{ minHeight: '80vh' }}>
            <Toast ref={toast} />
            <div className="p-col-12 p-md-6">
                <Card title="My Profile" className="p-shadow-4">
                    <div className="p-fluid">
                        <div className="p-field p-mb-3">
                            <label htmlFor="full_name" className="p-d-block p-mb-2">Full Name</label>
                            <InputText 
                                id="full_name" 
                                value={user.full_name} 
                                onChange={(e) => setUser({...user, full_name: e.target.value})} 
                            />
                        </div>

                        <div className="p-field p-mb-3">
                            <label htmlFor="email" className="p-d-block p-mb-2">Email (Read-only)</label>
                            <InputText 
                                id="email" 
                                value={user.email} 
                                disabled
                                className="p-disabled-opacity"
                            />
                        </div>

                        <div className="p-field p-mb-4">
                            <label htmlFor="password" className="p-d-block p-mb-2">New Password (leave empty to keep current)</label>
                            <Password 
                                inputId="password" 
                                value={user.password} 
                                onChange={(e) => setUser({...user, password: e.target.value})} 
                                toggleMask
                            />
                        </div>

                        <div className="p-field">
                            <Button 
                                label="Save Changes" 
                                icon="pi pi-check" 
                                loading={loading} 
                                onClick={handleSave} 
                                className="p-button-success"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
