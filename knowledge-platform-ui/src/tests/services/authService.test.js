import apiClient from '../../services/apiClient'
import { login, logout, getUser, removeTokens } from '../../services/authService'

jest.mock('../../services/apiClient', () => ({ post: jest.fn(), get: jest.fn() }))

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('stores tokens for static credentials', async () => {
    const response = await login({ email: 'mellwyn', password: '123' })
    expect(response.data.accessToken).toBe('static-local-token')
    expect(localStorage.getItem('access_token')).toBe('static-local-token')
  })

  it('calls apiClient for non-static credentials', async () => {
    apiClient.post.mockResolvedValueOnce({ data: { accessToken: 'token', refreshToken: 'refresh', expiresIn: 3600 } })
    const response = await login({ email: 'test@example.com', password: 'pass' })
    expect(apiClient.post).toHaveBeenCalledWith('/auth/login', { email: 'test@example.com', password: 'pass' })
    expect(localStorage.getItem('access_token')).toBe('token')
    expect(response.data.accessToken).toBe('token')
  })

  it('removes tokens on logout', async () => {
    localStorage.setItem('access_token', 'token')
    apiClient.post.mockResolvedValueOnce({})
    await logout()
    expect(localStorage.getItem('access_token')).toBeNull()
  })

  it('calls getUser with correct endpoint', async () => {
    apiClient.get.mockResolvedValueOnce({ data: { id: '123' } })
    await getUser('123')
    expect(apiClient.get).toHaveBeenCalledWith('/users/123')
  })
})
