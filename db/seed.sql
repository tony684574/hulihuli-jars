-- 🌱 Seed Data for Huli Huli Jars Project
-- Run this after creating the schema defined in schema.sql

-- Products
INSERT INTO products (name, sku, unit_cost, price, category)
VALUES
  ('Lilikoi Twist', 'LLK-2025-A', 2.75, 5.50, 'jam'),
  ('Sam''s sandwich spread', 'SS-2000-B', 5.00, 15.50, 'sandwich spread'),
  ('Lilikoi Love', 'LL-JAM-069', 5.00, 10.00, 'jam');

-- Locations
INSERT INTO locations (id, name, type, contact_info, notes)
VALUES
  (1, 'Warehouse', 'WAREHOUSE', '123 Storage Lane', 'Central inventory hub for all transfers'),
  (2, 'Honolulu Coffee Co.', 'SHOP', '456 Coffee Rd', NULL),
  (3, 'Waikiki Grocery', 'SHOP', '321 Beach Blvd', NULL),
  (4, 'Kalani Sales Rep', 'SALESPERSON', 'kalani@sales.org', NULL);

-- Events
INSERT INTO events (name, location, salesperson_id, schedule)
VALUES
  ('Kakaako Farmers Market', '123 Market St', 4, 'Saturday mornings at 9');

-- Inventory Movements
INSERT INTO inventory_movements (product_id, movement_type, quantity, date, note, to_location_id)
VALUES
  (1, 'restock', 100, CURRENT_TIMESTAMP, 'Initial restock of Lilikoi Twist', 1),
  (2, 'restock', 50, CURRENT_TIMESTAMP, 'Initial restock of Sam''s Sandwich Spread', 1),
  (1, 'transfer', 20, CURRENT_TIMESTAMP, 'Sent 20 Lilikoi Twist to Kalani', 1, 4),
  (2, 'transfer', 10, CURRENT_TIMESTAMP, 'Sent 10 Sam''s Spread to Kalani', 1, 4);

-- Sales Transaction Example
INSERT INTO sales_transactions (product_id, location_id, quantity_sold, sale_price, sale_date, cost_price, event_id)
VALUES
  (1, 1, 10, 5.50, '2025-07-06', 2.75, 1);
