import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import LocationSummary from '../components/Dashboard/LocationSummary';
import AlertsPanel from '../components/Dashboard/AlertsPanel';

const AdminDashboard = () => {
    return (
        <div className="flex min0h0screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Huli Huli Jars Admin Dashboard</h1>
                <AlertsPanel />
                <LocationSummary />
            </main>
        </div>
    );
};

export default AdminDashboard;