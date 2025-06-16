const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Limit 10 simultaneous connections
    idleTimeoutMillis: 10000, // Close idle connections after 10 seconds
    connectionTimeoutMillis: 2000 // Wait max 2s for a connection before throwing error
});

module.exports = pool;