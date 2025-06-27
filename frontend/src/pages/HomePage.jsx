import React, { useEffect, useState } from 'react';
import { fetchInventorySummary } from '../api/inventory';
import InventoryTable from '../components/InventoryTable';

const HomePage = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activityErrored, setActivityErrored] = useState(null);

    console.log('Homepage component is rendering');

    useEffect(() => {
        console.log('useEffect is running')
        async function loadData() {
            try{
                const data = await fetchInventorySummary();
                console.log('Inventory Data from API:', data);
                setInventory(data);
            } catch (err) {
                setActivityErrored(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    if (loading) return <p>Loading inventory...</p>;
    if (activityErrored) return <p>Error: {activityErrored}</p>;

   return (
  <div className="p-8 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 min-h-screen text-white">
    <h1 className="text-5xl font-extrabold mb-6 text-yellow-300 text-center drop-shadow-lg">
      🎉 Tailwind is alive! 🎉
    </h1>
    <h2 className="text-2xl text-green-200 mb-4 text-center">
      Inventory just got fabulous.
    </h2>
    <InventoryTable inventory={inventory} />
  </div>
);

};

export default HomePage;