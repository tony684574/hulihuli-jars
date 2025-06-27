import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const fetchInventorySummary = async () => {
    try {
        const res = await axios.get(`${API_BASE}/inventory/summary`);
        return res.data;
    } catch (error) {
        console.error('Error fetching inventory summary:', error);
        throw error;
    }
};