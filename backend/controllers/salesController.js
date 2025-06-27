const db = require('../db/pool');
const { getSignedQuantity } = require('../helpers/inventory');

exports.recordSale = async (req, res) => {
    const { product_id, location_id, quantity_sold, sale_price, sale_date } = req.body;

    // Validate input
    if (!product_id || !location_id || !quantity_sold || !sale_price) {
        return res.status(400).json({ error: "Missing required sale fields" });
    }

    if (isNaN(quantity_sold) || quantity_sold <= 0) {
        return res.status(400).json({ error: "Quantity sold must be a positive number" });
    }

    const effectiveDate = sale_date || new Date();
    let client;

    try {
        client = await db.connect();
        await client.query('BEGIN');

        // 🔍 Check current stock at the location
        const inventoryCheck = await client.query(`
            SELECT COALESCE(SUM(quantity), 0) AS total_stock
            FROM inventory_movements
            WHERE product_id = $1 AND location_id = $2
        `, [product_id, location_id]);

        const totalStock = parseInt(inventoryCheck.rows[0].total_stock, 10);

        if (totalStock < quantity_sold) {
            throw new Error(`Insufficient inventory. Available: ${totalStock}, Requested: ${quantity_sold}`);
        }

        // 🧾 Record the sale in sales_transactions
        const saleInsert = await client.query(`
            INSERT INTO sales_transactions 
                (product_id, location_id, quantity_sold, sale_price, sale_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [product_id, location_id, quantity_sold, sale_price, effectiveDate]);

        // 📉 Subtract inventory by creating a negative inventory movement
        const movement_type = 'sale';
        const signedQuantity = getSignedQuantity(movement_type, quantity_sold);

        await client.query(`
            INSERT INTO inventory_movements
                (product_id, quantity, location_id, movement_type, date, note)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [product_id, signedQuantity, location_id, movement_type, effectiveDate, `Sale of ${quantity_sold} units`]);

        console.log(`✅ Sale recorded: Product ${product_id} x ${quantity_sold} at ${sale_price} from Location ${location_id}`);

        await client.query('COMMIT');
        res.status(201).json(saleInsert.rows[0]);

    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error("❌ Error recording sale:", err);
        res.status(500).json({ error: err.message });
    } finally {
        if (client) client.release();
    }
};
