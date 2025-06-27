const pool = require('../db/pool');

const getAllProducts = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM other');
        res.json(result.rows);
    } catch (err) {
        console.log('Error fetching products:', err);
        res.status(500).send('\nServer error')
    }
}

const addProduct = async (req, res, next) => {
    const { name, sku, unit_cost, price, category } = req.body;

    const requiredFields = ['name', 'sku', 'unit_cost', 'price', 'category'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Missing required field(s): ${missingFields.join(', ')}`
        });
    }

    const validCategories = ['jam', 'sandwich spread', 'honey', 'butter'];
    if (!validCategories.includes(category)) {
    return res.status(400).json({
      error: `Invalid category. Must be one of: ${validCategories.join(', ')}`
    });
  }

    try {
        const result = await pool.query(`
            INSERT INTO products (name, sku, unit_cost, price, category)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, sku, unit_cost, price, category]
        );

        console.log(`New product added: ${name} (SKU: ${sku}, Category: ${category})`)

        res.status(201).json({
            message: 'New product added successfully',
            product: result.rows[0]
        });
            
    } catch(err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'SKU already exists' });
        }
        next(err)
    }
}

module.exports = { 
    getAllProducts,
    addProduct
}