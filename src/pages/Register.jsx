import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [orgName, setOrgName] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, firstName, orgName);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || "Registration failed");
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
            <Card title="Register Organization" className="w-30rem shadow-4">
                <form onSubmit={handleSubmit} className="flex flex-column gap-3">
                    {error && <Message severity="error" text={error} />}
                    <div className="flex flex-column gap-2">
                        <label htmlFor="orgName">Organization Name</label>
                        <InputText id="orgName" value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name">Full Name</label>
                        <InputText id="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="password">Password</label>
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask required className="w-full" inputClassName="w-full" />
                    </div>
                    <Button label="Sign Up" type="submit" />
                    <div className="text-center mt-2">
                        <span>Already have an account? </span>
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Register;
