import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || "Login failed");
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-blue-50">
            <Card title="Login" className="w-25rem shadow-4">
                <form onSubmit={handleSubmit} className="flex flex-column gap-3">
                    {error && <Message severity="error" text={error} />}
                    <div className="flex flex-column gap-2">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="password">Password</label>
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask required className="w-full" inputClassName="w-full" />
                    </div>
                    <Button label="Login" type="submit" />
                    <div className="text-center mt-2">
                        <span>Don't have an account? </span>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default Login;
