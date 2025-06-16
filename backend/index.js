const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    } else {
        console.log(`Connected to DB. Server time: ${res.rows[0].now}`);

        const app = express();

        app.use(cors({
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
        }));
        app.use(express.json());

        app.get('/api/jars', async (req, res) => {
            try {
                const result = await pool.query('SELECT * FROM products');
                res.json(result.rows);
            } catch (err) {
                console.log('Error fetching products', err);
                res.status(500).send('Server error')
            }
        });

        app.listen(5000, () => {
            console.log('\n Huli Huli Jars backend running on http://localhost:5000\n')
        });
    }
})

