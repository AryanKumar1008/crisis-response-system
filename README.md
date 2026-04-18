# 🚨 Hospitality Crisis Response System

**Emergency Crisis Management + Blood Matching for Hotels & Hospitality**

## Features

- **Panic Button** — Guests can trigger emergency alerts instantly
- **Staff Dashboard** — Real-time crisis monitoring and response
- **Incident Tracking** — Live status updates for all active incidents
- **Blood Emergency Module** — Request blood by type/location, match nearby donors
- **Role System** — Guest and Staff views with appropriate access

## Tech Stack

| Layer    | Technology         |
|----------|--------------------|
| Frontend | React + Vite       |
| Backend  | Node.js + Express  |
| Database | In-memory store    |
| Styling  | Custom CSS         |

## Quick Start

### 1. Start the Backend

```bash
cd server
npm install
npm run dev
```

Server runs on `http://localhost:5000`

### 2. Start the Frontend

```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`

## API Endpoints

### Incidents
| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| POST   | `/api/incidents`              | Create incident (panic)  |
| GET    | `/api/incidents`              | List all incidents       |
| PATCH  | `/api/incidents/:id/status`   | Update incident status   |

### Blood
| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| POST   | `/api/blood/request`          | Create blood request     |
| GET    | `/api/blood/requests`         | List blood requests      |
| POST   | `/api/blood/donors`           | Register as donor        |
| GET    | `/api/blood/match/:requestId` | Match donors to request  |

## Roles

- **Guest** — Can trigger panic, request blood, register as donor
- **Staff** — Can view dashboard, update incident status, view blood matches
