const pool = require('../../db/pool');

module.exports = async (req, res) => {
    const { location_id } = req.params;

    if (!location_id) {
        return res.status(400).json({ error: 'location_id is required in the URL'});
    }

    try {
        const result = await pool.query(`
            SELECT
                p.id AS product_id,
                p.name AS product_name,
                p.sku,
                COALESCE(SUM(im.quantity), 0) AS current_stock
            FROM products p
            LEFT JOIN inventory_movements im
                ON p.id = im.product_id
            WHERE im.location_id = $1
            GROUP BY p.id, p.name, p.sku
            ORDER BY p.id
            `, [location_id]);

     if (result.rows.length === 0) {
        return res.status(200).json({
            message: `No inventory assigned to this location.`,
            location_id: location_id,
            inventory: []
        });
     }   

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching inventory by location:', error.message);
        res.status(500).json({ error: 'Failed to fetch inventory for this location' });
    }
};