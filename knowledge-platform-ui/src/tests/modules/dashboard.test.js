import { render, screen, waitFor } from '@testing-library/react'
import { DashboardPage } from '../../features/dashboard/DashboardPage'
import { getAssignedTickets, getNotifications, getRecentKnowledge, getLeaderboard } from '../../services/dashboardService'

jest.mock('../../context/AuthContext', () => ({ useAuth: () => ({ user: { id: '1' } }) }))
jest.mock('../../services/dashboardService', () => ({ getAssignedTickets: jest.fn(), getNotifications: jest.fn(), getRecentKnowledge: jest.fn(), getLeaderboard: jest.fn() }))

describe('Dashboard module', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getAssignedTickets.mockResolvedValue({ data: [] })
    getNotifications.mockResolvedValue({ data: [] })
    getRecentKnowledge.mockResolvedValue({ data: [] })
    getLeaderboard.mockResolvedValue({ data: [] })
  })

  it('renders widgets and loading state then content', async () => {
    render(<DashboardPage />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: /Dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Assigned Tickets/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Notifications/i })).toBeInTheDocument()
  })
})
