# Tomi Dashboard

A neobrutalist-styled dashboard frontend for the Unitree Go2 robot (nicknamed "Tomi"), with a Node.js/Express backend that proxies robot commands and status.

## Tech Stack

- **Frontend:** React (Vite, JSX), vanilla CSS
- **Backend:** Node.js, Express, `cors`, `dotenv`
- **Build Tool:** Vite

## Setup

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend && npm install
```

## Build / Run / Test

```bash
# Run the backend (from backend/)
cd backend
npm run dev     # or: npm start
# Runs on http://localhost:8787

# Run the frontend dev server (from project root)
npm run dev     # Vite dev server (default: http://localhost:5173)

# Build frontend for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project Structure

```
tomi-dashboard/
├── src/
│   ├── App.jsx       # Main React component (status cards, command buttons)
│   ├── App.css       # Neobrutalist styles
│   ├── main.jsx      # React entry point
│   └── index.css     # Global styles
├── backend/
│   ├── server.js     # Express server — status endpoint + command routing
│   └── package.json  # Backend deps (express, cors, dotenv)
├── public/           # Static assets
├── index.html        # Vite entry HTML
├── vite.config.js    # Vite configuration
└── package.json      # Frontend deps and scripts
```

## Architecture & Key Files

- `src/App.jsx` — all UI logic: live status cards (battery, mode, location, last action) polling every 3 seconds, and command buttons (patrol, stream, idle, charge, emergency stop).
- `backend/server.js` — Express API that the frontend polls; intended to interface with the Unitree Go2 robot API or mock data.
- The frontend polls the backend at `http://localhost:8787` on a 3-second interval.

## Conventions & Notes for Agents

- Frontend and backend are separate Node packages with separate `package.json` files; run `npm install` in both.
- The neobrutalist UI style is intentional — maintain bold borders, high-contrast colors, and flat design when editing CSS.
- Backend environment variables (e.g. robot IP or API keys) go in `backend/.env`.
- No test suite is currently present.
- The emergency stop button should always remain prominently visible and functional — do not move or hide it.
