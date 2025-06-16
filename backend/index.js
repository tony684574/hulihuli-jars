const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db/pool');
const jarsRoutes = require('./routes/jars');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Global Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));
app.use(express.json());

// Routes
app.use('/api/jars', jarsRoutes);

// Fallback + Error Middleware
app.use(notFound);
app.use(errorHandler);

// DB check, server start. and graceful shutdown

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    } 
    
    console.log(`Connected to DB. Server time: ${res.rows[0].now}`);

    app.listen(5000, () => {
        console.log('\n Huli Huli Jars backend running on http://localhost:5000\n')
    });
});

process.on('SIGINT', async () => {
    console.log('\n Gracefully shutting down DB pool...');
    await pool.end();
    process.exit(0);
});

