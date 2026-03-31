# Knowledge Platform UI [![Tests](https://github.com/kva-rules/Front_End/actions/workflows/ci.yml/badge.svg)](https://github.com/kva-rules/Front_End/actions) [![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)](coverage/index.html)

## 🚀 Project Overview

**Knowledge Platform UI** is a modern, responsive single-page application (SPA) built with **React 19**, **Vite**, **Material-UI 7**, and **Redux Toolkit**. It provides a comprehensive interface for knowledge management, support ticketing, leaderboards, notifications, and admin functions.

### Key Features

- **Authentication & Authorization**: JWT-based login, role-based access (User/Admin)
- **Ticket Management**: Create, view, detail, update/delete tickets
- **Knowledge Base**: Browse articles, view details
- **Solutions**: Submit solutions to tickets, admin approval
- **Leaderboard**: View user rankings
- **Notifications**: Real-time bell/list with WebSocket support
- **Dashboard**: Overview metrics
- **Profile**: User settings
- **Admin**: Manage users, categories
- **Global Error Handling**, Theming, Responsive Layout

## 📁 Folder Structure

```
knowledge-platform-ui/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI (Loader, Modal, Layout, Notifications...)
│   ├── features/    # Pages & slices (auth, tickets, knowledge, admin...)
│   ├── services/    # API wrappers (ticketService.js...)
│   ├── utils/       # Helpers (jwt-utils.js)
│   ├── store.js     # Redux config
│   └── App.jsx
├── Dockerfile       # Multi-stage Docker build
├── nginx.conf       # Prod Nginx config
├── jest.config.js   # Testing
├── package.json
└── vite.config.js
```

## 🛠️ Technology Stack

| Category  | Tools                        |
| --------- | ---------------------------- |
| Framework | React 19, Vite 5             |
| State     | Redux Toolkit 2, React-Redux |
| UI        | MUI 7, Emotion               |
| Routing   | React Router 7               |
| HTTP      | Axios                        |
| Testing   | Jest, RTL, Jest-DOM          |
| Linting   | ESLint 9                     |

## 🚀 Local Development & Build

### Prerequisites

- Node.js ≥20
- Backend API at `http://localhost:8080/api` (or set `VITE_API_BASE_URL`)

### Setup & Run

```bash
cd knowledge-platform-ui
npm install
npm run dev  # http://localhost:5173
```

### Scripts

```bash
npm run dev      # Dev server (HMR)
npm run build    # Production build → dist/
npm run preview  # Local prod preview
npm run lint     # ESLint
npm test         # Run tests
npm run test:coverage  # Tests + coverage report

cd knowledge-platform-ui && npm run dev
Ctrl + C --> to stop the dev

```

**Env Vars** (`.env`):

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🧪 Testing & Coverage

```bash
npm test                    # All tests (80% coverage threshold)
npm run test:coverage       # Generate coverage/ folder
open coverage/lcov-report/index.html  # View detailed HTML report
```

- **Config**: `jest.config.js` (jsdom, Babel, 80% thresholds)
- Tests in `src/**/*.test.[jt]s?(x)`

## 🔧 Docker Setup & Build

### Build Image

```bash
docker build -t knowledge-ui .
```

**Dockerfile Highlights** (multi-stage):

- Build: `node:20-alpine` → `npm ci` → `npm run build`
- Runtime: `nginx:stable-alpine` → Copy `dist/` + `nginx.conf`

### Run Container

```bash
docker run -p 80:80 knowledge-ui
```

### Docker Compose Example (with backend)

```yaml
version: "3.8"
services:
  ui:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=http://backend:8080/api
  backend:
    image: your-backend:latest
    ports:
      - "8080:8080"
```

## ☁️ Environment Stages

| Stage | API URL Example                   | Purpose                 |
| ----- | --------------------------------- | ----------------------- |
| INT   | `https://int-api.company.com/api` | Integration Testing     |
| UAT   | `https://uat-api.company.com/api` | User Acceptance Testing |
| PROD  | `https://api.company.com/api`     | Production              |

Set `VITE_API_BASE_URL` accordingly during build/deploy.

## 🔄 GitHub Actions Pipeline Explanation

**Recommended `.github/workflows/ci.yml`**:

```yaml
name: CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run test:coverage # if main branch
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
```

**Flow**:

1. Lint & test on every push/PR
2. Coverage report on main
3. Build artifacts
   Extend for Docker push, deployments to stages.

## 🎯 Detailed Functionalities

1. **Auth**: Login (email/password → JWT), auto-persist, guards (`RequireAuth`, `RequireRole=admin`)
2. **Tickets**: List (paginated), Create (form + file upload), Details (solutions), CRUD
3. **Knowledge Base**: List/search articles, Article details
4. **Solutions**: List per ticket, Submit new, Admin approve/reject
5. **Leaderboard**: Paginated user rankings (points)
6. **Notifications**: Real-time bell (count/badge), List page, Mark read/delete, WebSocket
7. **Dashboard**: Key metrics, charts overview
8. **Profile**: View/edit user info
9. **Admin**:
   - Users: List, manage roles
   - Categories: CRUD for knowledge/tickets
10. **Layout**: Responsive Navbar/Sidebar, Theme toggle, Loader, Modals, Pagination, Global errors/notifications

**Real-time**: WebSocket for notifications.
**Error Handling**: Global boundary + notifier.
**File Upload**: Multipart to `/files/upload`.

## 🤝 Contributing & Deployment

- Fork → `npm i && npm test`
- Branch `feat/xxx`
- PR to main

**Deploy Options**: Netlify/Vercel (static), Docker/K8s, CDN.

## 📄 License

MIT © Kva_rules
