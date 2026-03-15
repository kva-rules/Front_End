import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoginPage } from '../features/auth/LoginPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { TicketsPage } from '../features/tickets/TicketsPage'
import { TicketDetailsPage } from '../features/tickets/TicketDetailsPage'
import { CreateTicketPage } from '../features/tickets/CreateTicketPage'
import { SolutionsPage } from '../features/solutions/SolutionsPage'
import { SolutionSubmitPage } from '../features/solutions/SolutionSubmitPage'
import { KnowledgePage } from '../features/knowledge/KnowledgePage'
import { KnowledgeArticlePage } from '../features/knowledge/KnowledgeArticlePage'
import { LeaderboardPage } from '../features/leaderboard/LeaderboardPage'
import { NotificationsPage } from '../features/notifications/NotificationsPage'
import { ProfilePage } from '../features/profile/ProfilePage'
import { AdminPage } from '../features/admin/AdminPage'
import { UsersPage } from '../features/users/UsersPage'
import { CategoryManagementPage } from '../features/admin/CategoryManagementPage'
import { Layout } from '../components/layout/Layout'


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
                <Route path="tickets" element={<TicketsPage />} />
                <Route path="tickets/:id" element={<TicketDetailsPage />} />
                <Route path="create-ticket" element={<CreateTicketPage />} />
                <Route path="solutions" element={<SolutionsPage />} />
                <Route path="solutions/new" element={<SolutionSubmitPage />} />
                <Route path="knowledge" element={<KnowledgePage />} />
                <Route path="knowledge/:id" element={<KnowledgeArticlePage />} />
                <Route path="leaderboard" element={<LeaderboardPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route
                  path="admin"
                  element={
                    <RequireRole roles={["ADMIN"]}>
                      <AdminPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="admin/categories"
                  element={
                    <RequireRole roles={["ADMIN"]}>
                      <CategoryManagementPage />
                    </RequireRole>
                  }
                />
                <Route
                  path="users"
                  element={
                    <RequireRole roles={["ADMIN"]}>
                      <UsersPage />
                    </RequireRole>
                  }
                />
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
