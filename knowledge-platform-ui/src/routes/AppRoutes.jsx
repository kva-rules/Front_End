import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoginPage } from '../features/auth/LoginPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { Layout } from '../components/layout/Layout'

function Dummy({ label }) {
  return <div>{label}</div>
}

function RequireAuth({ children }) {
  const { token, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!token) return <Navigate to="/login" replace />
  return children
}

function RequireRole({ children, roles = [] }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />
  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Layout>
              <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="tickets" element={<Dummy label="Tickets" />} />
                <Route path="solutions" element={<Dummy label="Solutions" />} />
                <Route path="knowledgebase" element={<Dummy label="Knowledge Base" />} />
                <Route path="leaderboard" element={<Dummy label="Leaderboard" />} />
                <Route path="notifications" element={<Dummy label="Notifications" />} />
                <Route
                  path="users"
                  element={
                    <RequireRole roles={["ADMIN"]}>
                      <Dummy label="Users" />
                    </RequireRole>
                  }
                />
                <Route
                  path="admin"
                  element={
                    <RequireRole roles={["ADMIN"]}>
                      <Dummy label="Admin" />
                    </RequireRole>
                  }
                />
                <Route path="profile" element={<Dummy label="Profile" />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </Layout>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
