const pool = require('../../db/pool');
const { getSignedQuantity } = require('../../helpers/inventory');

module.exports = async (req, res) => {
    const { location_id } = req.params;
    const { product_id, quantity, note } = req.body;

    if (!product_id || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: "Valid product_id and quantity are required." });
    }

    const outQty = getSignedQuantity('disperse_out', quantity);
    const inQty = getSignedQuantity('disperse_in', quantity);

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // check unassigned inventory (no location_id)
        const result = await client.query(`
            SELECT COALESCE(SUM(quantity), 0) AS available
            FROM inventory_movements
            WHERE product_id = $1 and location_id IS NULL
            `, [product_id]);

        const available = parseInt(result.rows[0].available, 10);

        if (available < quantity) {
            throw new Error(`Not enough unassigned stock. Available: ${available}, Requested: ${quantity}`);
        }

        const now = new Date();

        console.log('Dispersing', quantity, 'units to location', location_id);
        console.log('Out qty:', outQty, 'In qty:', inQty);


            // subtract from general (unassigned) inventory
        await client.query(`
            INSERT INTO inventory_movements
            (product_id, quantity, movement_type, date, note)
            VALUES ($1, $2, $3, $4, $5)
            `, [product_id, outQty, 'disperse_out', now, note])

            // add inventory to specific location
        await client.query(`
            INSERT INTO inventory_movements
            (product_id, quantity, location_id, movement_type, date, note)
            VALUES ($1, $2, $3, 'disperse_in', $4, $5)
            `, [product_id, inQty, location_id, now, note])

        const productRes = await client.query(
            `SELECT name FROM products WHERE id = $1`,
            [product_id]
        );
        const productName = productRes.rows[0]?.name || `Product ${product_id}`;

        const locationRes = await client.query(
            `SELECT name FROM locations WHERE id = $1`,
            [location_id]
        );

        const locationName = locationRes.rows[0]?.name || `Location ${location_id}`;

        await client.query('COMMIT');
        console.log('Commit successful')

        res.status(201).json({
            quantity,
            product: { id: product_id, name: productName },
            location: { id: location_id, name: locationName }
        });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error dispersing inventory:', err.message);
        res.status(500).json({ error: err.message})
    } finally {
        client.release();
    }
}