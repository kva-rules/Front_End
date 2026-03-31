import { render, screen, waitFor } from '@testing-library/react'
import { ProfilePage } from '../../features/profile/ProfilePage'

jest.mock('../../services/userService', () => ({ getProfile: jest.fn().mockResolvedValue({ data: { name: 'Jane Doe', email: 'jane@example.com', department: 'Engineering', skills: 'React', experience: '5 years' } }) }))
jest.mock('../../context/AuthContext', () => ({ useAuth: () => ({ user: { id: '1' }, fetchUser: jest.fn() }) }))

describe('Profile page', () => {
  it('renders profile form fields', async () => {
    render(<ProfilePage />)
    await waitFor(() => expect(screen.getByLabelText(/Name/i)).toHaveValue('Jane Doe'))
    expect(screen.getByLabelText(/Email/i)).toHaveValue('jane@example.com')
  })
})
