const pool = require('../../db/pool');
const { getSignedQuantity } = require('../../helpers/inventory');

// addInventory
module.exports = async (req, res) => {
    const { product_id, movement_type, quantity, location_id, date, note } = req.body;

    // Validate inputs
    if (!product_id || !movement_type || isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ error: "Missing or invalid inventory movement fields"});
        }

        // Validate allowed movement types
        const allowedTypes = ['restock', 'adjustment', 'return'];
        if (!allowedTypes.includes(movement_type)) {
            return res.status(400).json({ error: `Invalid movement_type. Allowed types: ${allowedTypes.join(', ')}` });
        }

    try {
        const signedQuantity = getSignedQuantity(movement_type, quantity);

        const result = await pool.query(
            `INSERT INTO inventory_movements (product_id, movement_type, quantity, location_id, date, note)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [product_id, movement_type, signedQuantity, location_id || null, date || new Date(), note]
        );

        // console.log('Query result:', result)
        console.log(`${movement_type} recorded: ${signedQuantity} for product ${product_id}`);

        // if (!result.rows || result.rows.length === 0) {
        //     throw new Error('Insert succeeded but no row was returned');
        // }

        res.status(201).json({
            message: 'Inventory movement recorded',
            movement: result.rows[0]
        });
    } catch (err) {
        console.error('Error recording movement:', err.message);
        res.status(500).json({ error: 'Failed to record inventory movement'});
    }
};