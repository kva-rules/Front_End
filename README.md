# Knowledge Platform UI

## 🚀 Project Overview

**Knowledge Platform UI** is a modern, responsive web application built with React 19 and Material-UI for a comprehensive knowledge management platform. It enables users to:

- Manage support **tickets** and submit/review **solutions**
- Access a **knowledge base** with articles
- View **leaderboards** and **notifications**
- Handle **user profiles**, **admin functions** (users, categories)
- Real-time notifications via WebSocket support

Key features include authentication (JWT), role-based access (Admin/User), global error handling, theming, and Redux state management for tickets, notifications, leaderboard, users, and auth.

## 🏗️ Architecture

- **Frontend**: Single Page Application (SPA)
- **State Management**: Redux Toolkit (slices: auth, tickets, notifications, leaderboard, users)
- **Routing**: React Router v7 with auth guards (`RequireAuth`, `RequireRole`)
- **Styling**: Material-UI v7 + Emotion, CssBaseline, custom theme (`src/theme.js`)
- **API Client**: Axios with interceptors (auth token, error handling)
- **Providers Stack** (from root):
  ```
  GlobalErrorBoundary > Redux Provider > ThemeProvider > BrowserRouter > AuthContext > App (Routes)
  ```
- **Layout**: AppShell with Navbar, Sidebar, main content (`src/components/layout/`)
- **Error Handling**: GlobalErrorBoundary + GlobalErrorNotifier + errorBus utils
- **Contexts**: AuthContext (token/user/loading)

## 📁 Folder Structure

```
knowledge-platform-ui/
├── public/                 # Static assets (favicon.svg, icons.svg)
├── src/
│   ├── api/                # wsClient.js (WebSocket)
│   ├── app/                # store.js (Redux config)
│   ├── assets/             # Images (hero.png, react.svg, vite.svg)
│   ├── components/         # Reusable (Loader, Modal, NotificationBell/List, PaginationControls, layout/AppShell/Navbar/Sidebar/Layout)
│   ├── context/            # AuthContext.jsx
│   ├── features/           # Domain features
│   │   ├── auth/           # LoginPage.jsx, authSlice.js
│   │   ├── dashboard/      # DashboardPage.jsx
│   │   ├── knowledge/      # KnowledgePage.jsx, KnowledgeArticlePage.jsx
│   │   ├── leaderboard/    # LeaderboardPage.jsx, leaderboardSlice.js
│   │   ├── notifications/  # NotificationsPage.jsx, notificationSlice.js
│   │   ├── profile/        # ProfilePage.jsx
│   │   ├── solutions/      # SolutionsPage.jsx, SolutionSubmitPage.jsx
│   │   ├── tickets/        # TicketsPage.jsx, TicketDetailsPage.jsx, CreateTicketPage.jsx, ticketSlice.js
│   │   └── admin/          # AdminPage.jsx, CategoryManagementPage.jsx
│   │       └── users/      # UsersPage.jsx, userSlice.js
│   ├── providers/          # ThemeProvider.jsx
│   ├── routes/             # AppRoutes.jsx
│   ├── services/           # API layers (apiClient.js, authService.js, ticketService.js, etc.)
│   ├── utils/              # jwt-utils.js, errorBus.js
│   ├── constants.js
│   ├── App.jsx, main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🛠️ Technology Stack

| Category       | Technologies                                                                |
| -------------- | --------------------------------------------------------------------------- |
| **Core**       | React 19.2.4, React DOM 19.2.4                                              |
| **Build Tool** | Vite 5.4.8                                                                  |
| **Routing**    | React Router DOM 7.13.1                                                     |
| **State**      | @reduxjs/toolkit 2.11.2, react-redux 9.2.0                                  |
| **UI Library** | @mui/material 7.3.9, @mui/icons-material 7.3.9, @emotion/react+styled 11.14 |
| **HTTP**       | Axios 1.13.6                                                                |
| **Auth Utils** | jwt-decode 4.0.0                                                            |
| **Linting**    | ESLint 9.39.4 + React plugins                                               |

## 🚀 Quick Setup

### Prerequisites

- **Node.js** ≥20
- **Backend API** running at `http://localhost:8080/api`

```bash
cd knowledge-platform-ui
npm install
npm run dev
```

**App runs at:** `http://localhost:5173`

Available scripts:

- `npm run dev` - Development server
- `npm run build` - Production build (`dist/`)
- `npm run lint` - ESLint check
- `npm run preview` - Preview production build

## ⚙️ Environment Variables

Currently hardcoded `API_BASE_URL = 'http://localhost:8080/api'` in `apiClient.js`.

**Recommended `.env`** (add to `.gitignore`):

```
VITE_API_BASE_URL=https://your-api-gateway.com/api
```

Update `src/services/apiClient.js`:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
```

## 🔌 API Gateway & Backend Integration

**API Base**: `/api` (expects REST + JWT auth)

**Core Endpoints**:

```
Auth: POST /auth/login {email, password}, POST /auth/logout
Users: GET /users/me, GET /users, PUT /users/:id
Tickets: GET/POST/PUT/DEL /tickets(:id)
Knowledge: GET /knowledge(:id?), GET /knowledge/recent
Solutions: POST /solutions, GET /solutions/ticket/:ticketId, PUT /solutions/:id/approve
Notifications: GET /notifications/users/:userId, PUT/DEL /notifications/:id
Leaderboard: GET /rewards/leaderboard
Categories: CRUD /categories(:id) (admin)
Files: POST /files/upload (multipart)
```

**Auth Flow**: Login → JWT stored in context → Auto-refresh/interceptor adds `Authorization: Bearer <token>`

**Real-time**: `wsClient.js` for notification socket (implement connection in `notificationSocket.js`)

## ☁️ Deployment

### 1. **Static Hosting** (Netlify/Vercel)

```
npm run build
# Deploy 'dist/' folder
```

Set `VITE_API_BASE_URL` in platform env vars.

### 2. **Nginx Proxy** (API Gateway)

```nginx
server {
  listen 80;
  root /path/to/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://backend:8080/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Authorization $http_authorization;
  }
}
```

### 3. **Docker**

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=prod
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

**Build & Run**:

```bash
docker build -t knowledge-ui .
docker run -p 80:80 -e VITE_API_BASE_URL=https://api.example.com/api knowledge-ui
```

## 🧪 Testing & Development

- **Error Simulation**: Uses `GlobalErrorBoundary`, test via devtools
- **Redux DevTools**: Enabled in non-prod
- **Lint**: `npm run lint`
- **Responsive**: MUI handles mobile-first

## 🤝 Contributing

1. Fork repository
2. `npm install && npm run lint`
3. Create feature branch
4. PR to `main`

## 📄 License

MIT © [Your Name/Org]
