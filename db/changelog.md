# 📓 Database Change Log

This file tracks all meaningful changes made to the database schema, constraints, seed data, and structural relationships for the **Huli Huli Jars** application.

---

## 📅 2025-06-29
### Initial Change Log Creation
- Added `CHANGELOG.md` to track schema evolution.
- Created `/db/README.md` with schema overview, seed data, and constraint queries.
- Added initial `/db/seed.sql` to populate test data for:
  - Products
  - Locations
  - Events
  - Inventory Movements

### Schema Adjustments
- Enforced `movement_type` constraint in `inventory_movements`: must be one of `'restock'`, `'sale'`, `'transfer'`.
- Enforced `type` constraint in `locations`: must be one of `'WAREHOUSE'`, `'SHOP'`, `'SALESPERSON'`.
- Replaced `location_id` with `from_location_id` and `to_location_id` in `inventory_movements` for directional clarity.
- Removed `event_date` column from `events` and replaced it with a new `schedule` field.
- Linked `sales_transactions.event_id` to `events.id` to tie sales to events.

### Data Cleanup
- Cleared all prior data in `inventory_movements`, `sales_transactions`, `events`, and `locations`.
- Re-sequenced `locations` so that Warehouse is always `id = 1`.
- Re-inserted known-good seed data with consistent and clean foreign key relations.

---

This log will be updated every time changes are made to the `/db` schema, relationships, or seed data.

> For backend and frontend logs, see `/backend/CHANGELOG.md` and `/frontend/CHANGELOG.md` respectively.
