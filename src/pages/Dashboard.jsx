import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({ members: 0, broadcasts: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch stats if API existed, or just mock/calculate
        // For now, let's fetch members count and broadcasts count via regular APIs
        const fetchStats = async () => {
             // Parallel fetch
             try {
                const [membersRes, broadcastsRes] = await Promise.all([
                    api.get('/members?limit=1'), // Just get one to see metadata if we had pagination with total
                    api.get('/broadcasts')
                ]);
                // Since our current list API returns all, we can count length. Not efficient for large data but okay for MVP.
                // Wait, members API `read_members` doesn't return count.
                // I will add a `limit=1000` to get all for MVP validation.
                
                const allMembers = await api.get('/members?limit=1000');
                const allBroadcasts = await api.get('/broadcasts');
                
                setStats({
                    members: allMembers.data.length,
                    broadcasts: allBroadcasts.data.length
                });

             } catch (e) {
                 console.error(e);
             }
        };
        fetchStats();
    }, []);

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <Card title="Total Members" subTitle="Active subscribers">
                    <p className="text-4xl font-bold m-0 text-blue-500">{stats.members}</p>
                    <Button label="Manage Members" icon="pi pi-users" className="mt-3" onClick={() => navigate('/members')} />
                </Card>
            </div>
            <div className="col-12 md:col-6">
                <Card title="Broadcasts Sent" subTitle="Total campaigns">
                    <p className="text-4xl font-bold m-0 text-green-500">{stats.broadcasts}</p>
                    <Button label="New Broadcast" icon="pi pi-megaphone" className="mt-3 p-button-success" onClick={() => navigate('/broadcast')} />
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
