# Tomi Dashboard (Neobrutalist)

Attractive frontend + backend dashboard for Unitree Go2 (Tomi).

## Features
- Live status cards (battery, mode, location, last action)
- Command buttons (patrol, stream, idle, charge, emergency stop)
- Neobrutalist UI style
- Polling every 3s

## Run

### 1) Backend
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:8787`

### 2) Frontend
```bash
cd ..
npm install
npm run dev
```
Runs on Vite default port (usually `http://localhost:5173`)

## Optional
Set frontend API URL:

Create `.env` in root:
```env
VITE_API_URL=http://localhost:8787
```

## Build frontend
```bash
npm run build
```
