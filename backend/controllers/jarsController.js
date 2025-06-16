const pool = require('../db/pool');

const getAllJars = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.log('Error fetching products:', err);
        res.status(500).send('Server error')
    }
}

module.exports = { getAllJars }