# Huli Huli Jars

**Huli Huli Jars** is a prototype full-stack application built to track jam inventory, distribution, and sales. It is structured as a monorepo containing both the frontend (React) and backend (Express + PostgreSQL).

This project serves as a personal learning tool and architectural template for future inventory management systems—built with clarity, modularity, and real-world utility in mind.

---

## 🛍️ Project Goals

* Learn and apply full-stack development patterns
* Create a clean monorepo structure with frontend and backend separation
* Connect a React frontend to a PostgreSQL database via REST API
* Experiment with building endpoints and querying relational data
* Serve as a baseline for future production-ready tools

---

## 📁 Project Structure

```
/huli-huli-jars/
├── frontend/              # Vite + React (presentation layer)
├── backend/               # Express + PostgreSQL (API and data layer)
│   ├── index.js           # Entry point (server boot + DB check)
│   ├── db/
│   │   └── pool.js        # DB connection logic (with graceful shutdown + config)
│   ├── routes/
│   │   └── jars.js        # Express router for /api/jars
│   ├── controllers/
│   │   └── jarsController.js # Business logic for jars API
│   ├── middleware/
│   │   ├── errorHandler.js   # General error handler middleware
│   │   └── notFound.js       # 404 fallback middleware
│   └── .env               # Environment variables (ignored)
├── .gitignore             # Unified ignore rules for frontend and backend
├── README.md              # This file
└── package.json           # Root script to launch both services
```

---

## 🛠️ Tech Stack

| Layer       | Technology         |
| ----------- | ------------------ |
| Frontend    | React (via Vite)   |
| Backend     | Node.js + Express  |
| Database    | PostgreSQL (local) |
| Dev Tooling | Git, dotenv, CORS  |

---

## 🚀 Getting Started

### 1. Clone and Setup

```bash
git clone <your-repo-url>
cd huli-huli-jars
```

> Note: This project is not yet pushed to a remote repo.

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend/`:

```
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/hulihuli_jars
```

Start the server:

```bash
node index.js
```

If successful, your backend will be running at:

```
http://localhost:5000
```

Test it with:

```bash
curl http://localhost:5000/api/jars
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

This launches your Vite-powered React app at:

```
http://localhost:5173
```

---

## 🔁 Starting Both Services Together (Manual)

Open two terminals:

**Terminal 1: Backend**

```bash
cd backend
node index.js
```

**Terminal 2: Frontend**

```bash
cd frontend
npm run dev
```

---

## 🔧 Optional: Script to Start Both

If you want a single command to start both services, install `concurrently` in the root:

```bash
npm install -D concurrently
```

Create a root-level `package.json` (if you don't already have one) and add:

```json
{
  "name": "huli-huli-jars",
  "private": true,
  "scripts": {
    "start": "concurrently \"npm run server --prefix backend\" \"npm run dev --prefix frontend\""
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

Then simply run:

```bash
npm start
```

---

## 🧪 API Endpoints (So Far)

| Method | Route       | Description           |
| ------ | ----------- | --------------------- |
| GET    | `/api/jars` | Fetch all jar records |

---

## 📌 Notes

* This project is for educational and prototyping purposes only.
* The backend database must be running locally and seeded with appropriate data.
* Backend follows a modular Express structure with clear separation of concerns.
* PostgreSQL connection pooling is used to optimize performance.
* Pool configuration includes:

  * Max 10 concurrent connections
  * 10s idle timeout
  * 2s connection wait timeout
  * Graceful shutdown on SIGINT
* `index.js` now delegates:

  * Routing to `routes/jars.js`
  * Business logic to `controllers/jarsController.js`
  * 404 responses to `middleware/notFound.js`
  * Error handling to `middleware/errorHandler.js`
* Environment variables and database credentials are stored in `.env` and excluded from version control.

---

## 🗓️ Next Steps (Future Development Ideas)

* Create new routes for `locations`, `transactions`, and summary queries
* Build the React UI to display and filter inventory data
* Add form submission to track jar sales
* Deploy to a local Docker environment or cloud provider for hosting

---

Crafted by hand for future inspiration and technical growth. 🍟



