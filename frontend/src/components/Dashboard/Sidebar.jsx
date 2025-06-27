import React from 'react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white p-6">
            <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
            <ul className='space-y-4'>
                <li><a href="#" className="hover:text-yellow-300">Dashboard</a></li>
                <li><a href="#" className="hover:text-yellow-300">Add Product</a></li>
                <li><a href="#" className="hover:text-yellow-300">Add Location</a></li>
                <li><a href="#" className="hover:text-yellow-300">Add Inventory</a></li>
                <li><a href="#" className="hover:text-yellow-300">Transfer Stock</a></li>
                <li><a href="#" className="hover:text-yellow-300">Profit Report</a></li>
            </ul>
        </aside>
    );
};

export default Sidebar;