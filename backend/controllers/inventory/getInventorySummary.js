const pool = require('../../db/pool');

// getInventorySummary
module.exports = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.sku,
                COALESCE(SUM(im.quantity), 0) AS current_stock
            FROM products p
            LEFT JOIN inventory_movements im 
                ON p.id = im.product_id AND im.location_id IS NULL
            GROUP BY p.id, p.name, p.sku
            ORDER BY p.id;
            `);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching inventory summary:', err.message);
        res.status(500).json({ error: 'Failed to fetch inventory summary'})
    }
};