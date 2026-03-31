import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginPage } from '../../features/auth/LoginPage'

jest.mock('../../context/AuthContext', () => {
  const login = jest.fn()
  return {
    useAuth: () => ({ login, loading: false }),
    __esModule: true,
    login,
  }
})

describe('Authentication module', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  const getLoginMock = () => jest.requireMock('../../context/AuthContext').login

  it('renders login form fields and submit button', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i, { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument()
  })

  it('shows an error message when login fails', async () => {
    getLoginMock().mockRejectedValueOnce(new Error('Invalid credentials'))
    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Password/i, { selector: 'input' }), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }))

    await waitFor(() => expect(screen.getByText(/Login failed/i)).toBeInTheDocument())
  })
})
