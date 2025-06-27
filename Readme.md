# Huli Huli Jars

A full-stack inventory management system built with **Node.js**, **Express**, **PostgreSQL**, and **React** (with **Tailwind CSS**). Designed to help small businesses track inventory, sales, and distribution by location.

---

## 🌐 API Endpoints

| Method | Endpoint                               | Description                                     |
| ------ | -------------------------------------- | ----------------------------------------------- |
| GET    | `/healthcheck`                         | Health status check                             |
| POST   | `/api/products`                        | Add a new product                               |
| POST   | `/api/inventory`                       | Add inventory (general stock, no location)      |
| GET    | `/api/inventory/summary`               | Inventory summary (all products, all locations) |
| POST   | `/api/inventory/{location_id}`         | Disperse stock to a specific location           |
| GET    | `/api/inventory/summary/{location_id}` | Summary of inventory at specific location       |
| GET    | `/api/inventory/active/{location_id}`  | Active (non-zero) stock for a location          |
| POST   | `/api/sales`                           | Record a sales transaction                      |

---

## 🗂️ Project Directory Structure

```
HULIHULI JARS
├── backend
│   ├── controllers
│   │   ├── inventory
│   │   │   ├── disperseInventory.js
│   │   │   ├── getActiveInventoryByLocation.js
│   │   │   ├── getInventorySummary.js
│   │   │   ├── getInventorySummaryByLocation.js
│   │   ├── inventoryController.js
│   │   ├── locationsController.js
│   │   ├── productController.js
│   │   ├── salesController.js
│   ├── db
│   │   ├── pool.js                   # PostgreSQL connection setup
│   │   └── seed.psql                 # Initial DB schema and data seed
│   ├── helpers
│   │   └── inventory.js             # Helper: signed quantity logic
│   ├── middleware
│   │   ├── errorHandler.js          # Centralized error handler
│   │   └── notFound.js              # 404 fallback handler
│   ├── routes
│   │   ├── inventory.js
│   │   ├── locations.js
│   │   ├── products.js
│   │   └── sales.js
│   ├── .env                          # Environment variables
│   ├── index.js                      # Express server setup
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   │   ├── inventory.js         # Fetch functions for inventory
│   │   │   └── sales.js             # Fetch functions for sales
│   │   ├── assets
│   │   ├── components
│   │   │   └── InventoryTable.jsx   # Table component for display
│   │   ├── pages
│   │   │   └── HomePage.jsx         # Home dashboard
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css                # Tailwind directives live here
│   │   └── main.jsx
│   ├── tailwind.config.js          # Tailwind config
│   ├── postcss.config.js           # PostCSS config for Tailwind
├── package.json                     # Shared project scripts and deps
```

---

## 🚀 Getting Started Locally

### Prerequisites

* Node.js
* PostgreSQL (running locally or via Docker)

---

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/hulihuli-jars.git
cd hulihuli-jars
```

### 2. Set Up Backend

```bash
cd backend
npm install

# Create `.env` file with:
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/hulihuli_jars
CORS_ORIGIN=http://localhost:5173

# Optional: Seed the database (PostgreSQL must be running):
psql -U postgres -d hulihuli_jars -f db/seed.psql

# Start the backend
npm start
```

---

### 3. Set Up Frontend

```bash
cd frontend
npm install
npm run dev
```

#### ⚠️ Tailwind CSS Setup

Tailwind is already configured with:

* `tailwind.config.js`
* `postcss.config.js`
* Tailwind directives in `src/index.css`

No need to run `npx tailwindcss init` unless starting from scratch.

---

## 🧪 Progress Notes (Internal)

* Backend CRUD operations completed for products, inventory movements, and sales.
* Dispersal route validates available stock and logs signed quantities.
* Inventory can now be tracked across locations.
* Frontend routes and display components scaffolded.
* Tailwind verified functional (via test styles and `text-teal-600`).
* Ready to implement Admin dashboard components.
* Seed file exists but collaboration will wait until DB server setup is ready.

---

## 👥 Collaboration (Coming Soon)

Once frontend MVP is ready and DB hosting is configured:

* Collaborators can pull repo, install dependencies, and start contributing.
* Frontend will fetch from live backend with shared DB.

---

Happy jamming 🥄
