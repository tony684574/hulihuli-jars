import React, { useEffect, useState } from 'react';
import axios from 'axios';

// utility map and funtion
const typeToBorderColor = {
    event: 'border-yellow-500',
    shop: 'border-green-500',
    salesperson: 'border-blue-500',
    default: 'border-gray-300'
}

const getBorderColor = (type) => {
    return typeToBorderColor[type] || typeToBorderColor.default;
}

const LocationSummary = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/locations')
        .then(res => setLocations(res.data))
        .catch(err => console.error("Error loading locations:", err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading location summaries...</p>

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {locations.map(loc => (
                <div key={loc.id} className="bg-white shadow rounded p-4">
                    <div className={`bg-white shadow-md rounded-sm bg-4 border-2 ${getBorderColor(loc.type)}`}>
                        <h3 className="text-lg font-bold text-black">{loc.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{loc.type}</p>
                    <p className="text-gray-800">Total Stock: {loc.current_stock}</p>
                    <div className="mt-3">
                        <h4 className="font-semibold text-sm mb-1">By Product:</h4>
                        <ul className="space-y-1">
                            {loc.stock_by_product.map(prod => (
                                <li key={prod.product_id} className={`text-sm ${prod.low_stock ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>
                                    {prod.product_name}: {prod.quantity} {prod.low_stock ? '!' : ''}
                                </li>    
                            ))}
                        </ul>
                    </div>    
                </div>
            ))}
        </div>
    );
};

export default LocationSummary;