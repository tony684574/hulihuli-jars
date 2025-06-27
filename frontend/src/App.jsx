import React from 'react';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <AdminDashboard />
    </div>
  );
}
