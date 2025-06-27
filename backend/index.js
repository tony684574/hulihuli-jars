// External Modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

// Internal modules
const pool = require('./db/pool');
const productsRoutes = require('./routes/products');
const inventoryRoutes = require('./routes/inventory');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const locationRoutes = require('./routes/locations'); 
const salesRoutes = require('./routes/sales');

const app = express();

// Global Middleware
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));
app.use(express.json());

// healthcheck
app.get('/healthcheck', (req, res) => {
    res.json({
        message: 'Welcome to Huli Huli Jars Inventory API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);

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

