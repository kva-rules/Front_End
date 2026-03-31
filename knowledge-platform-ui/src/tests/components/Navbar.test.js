import { render, screen } from '@testing-library/react'
import { Navbar } from '../../components/layout/Navbar'

jest.mock('../../components/NotificationBell', () => ({ NotificationBell: () => <div data-testid="notification-bell" /> }))
jest.mock('../../providers/ThemeProvider', () => ({ useThemeToggle: () => ({ toggleTheme: jest.fn(), mode: 'light' }) }))

describe('Navbar', () => {
  it('renders the app title and notification bell', () => {
    render(<Navbar onMenuClick={jest.fn()} />)
    expect(screen.getByText(/Knowledge Collaboration Platform/i)).toBeInTheDocument()
    expect(screen.getByTestId('notification-bell')).toBeInTheDocument()
  })
})
