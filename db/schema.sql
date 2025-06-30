-- /db/schema.sql

-- PRODUCTS TABLE
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    unit_cost NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    category TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LOCATIONS TABLE
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('WAREHOUSE', 'SHOP', 'SALESPERSON')),
    contact_info TEXT,
    notes TEXT
);

-- EVENTS TABLE
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    salesperson_id INTEGER REFERENCES locations(id),
    schedule TEXT
);

-- INVENTORY MOVEMENTS TABLE
CREATE TABLE inventory_movements (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    movement_type TEXT CHECK (movement_type IN ('restock', 'sale', 'transfer')),
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    from_location_id INTEGER REFERENCES locations(id),
    to_location_id INTEGER REFERENCES locations(id)
);

-- SALES TRANSACTIONS TABLE
CREATE TABLE sales_transactions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    location_id INTEGER REFERENCES locations(id),
    quantity_sold INTEGER NOT NULL,
    sale_price NUMERIC(10,2) NOT NULL,
    sale_date DATE DEFAULT CURRENT_DATE,
    cost_price NUMERIC,
    event_id INTEGER REFERENCES events(id)
);
