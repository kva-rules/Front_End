import { render, screen, waitFor } from '@testing-library/react'
import { UsersPage } from '../../features/users/UsersPage'
import * as userService from '../../services/userService'

jest.mock('../../services/userService')

describe('Admin module', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    userService.getUsers.mockResolvedValue({ data: [{ id: '1', name: 'Alice', email: 'alice@example.com', role: 'USER', active: true }] })
  })

  it('renders user management table', async () => {
    render(<UsersPage />)
    await waitFor(() => expect(screen.getByText(/^Alice$/i)).toBeInTheDocument())
    expect(screen.getByText(/Users/i)).toBeInTheDocument()
  })
})
