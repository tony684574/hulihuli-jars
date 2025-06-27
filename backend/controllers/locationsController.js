const pool = require('../db/pool');

const getAllLocations = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM locations');
        res.json(result.rows);
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