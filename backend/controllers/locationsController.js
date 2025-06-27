const pool = require('../db/pool');

const getAllLocations = async (req, res, next) => {
    try {
        // Fetch all locations
        const locationResult = await pool.query('SELECT * FROM locations');
        const locations = locationResult.rows;

        // fetch stock sums grouped by location_id
        const totalStockResult = await pool.query(`
            SELECT location_id, SUM(quantity) AS current_stock
            FROM inventory_movements
            WHERE location_id IS NOT NULL
            GROUP BY location_id
            `);

        // build a map of location_id to current_stock
        const stockMap = new Map();
        totalStockResult.rows.forEach(row => {
            stockMap.set(row.location_id, parseInt(row.current_stock, 10));
        });

        // get stock per product per location
        const breakdownResult = await pool.query(`
            SELECT
                im.location_id,
                im.product_id,
                p.name AS product_name,
                SUM (im.quantity) AS quantity
            FROM inventory_movements im
            JOIN products p ON im.product_id = p.id
            WHERE im.location_id IS NOT NULL
            GROUP BY im.location_id, im.product_id, p.name
            `);

        // group stock by product
        const productStockMap = new Map();

        breakdownResult.rows.forEach(row => {
            const quantity = parseInt(row.quantity, 10);
            const entry = {
                product_id: row.product_id,
                product_name: row.product_name,
                quantity,
                low_stock: quantity < 20
            };
            if (!productStockMap.has(row.location_id)) {
                productStockMap.set(row.location_id, []);
            }
            productStockMap.get(row.location_id).push(entry);
        })

        // merge both sets of data into each location
        const enrichedLocations = locations.map(location => ({
            ...location,
            current_stock: stockMap.get(location.id) || 0,
            stock_by_product: productStockMap.get(location.id) || []
        }));

        // send the response
        res.json(enrichedLocations)
    } catch (err) {
    next(err);
    }
};

const addLocation = async (req, res, next) => {
    const { name, type, contact_info, notes } = req.body;

    if (!name || !type) {
        return res.status(400).json({ error: 'Name and type are required fields' });
    }
    
    try {
    const result = await pool.query(
        `INSERT INTO locations (name, type, contact_info, notes)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [name, type, contact_info || null, notes || null]
    );
    res.status(201).json(result.rows[0]);
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getAllLocations,
    addLocation
}