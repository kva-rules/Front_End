import apiClient from './apiClient'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const EXPIRES_AT_KEY = 'token_expires_at'

export const setTokens = ({ accessToken, refreshToken, expiresIn }) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  const expiresAt = Date.now() + (expiresIn * 1000)
  localStorage.setItem(EXPIRES_AT_KEY, expiresAt.toString())
}

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(EXPIRES_AT_KEY)
}

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)
export const getExpiresAt = () => Number(localStorage.getItem(EXPIRES_AT_KEY) || 0)
export const isTokenExpired = () => Date.now() >= getExpiresAt()

export const login = async (payload) => {
  // Static fallback login for local dev
  if (payload.username === 'mellwyn' && payload.password === '123') {
    const accessToken = 'static-local-token'
    const refreshToken = 'static-local-refresh'
    const expiresIn = 3600
    setTokens({ accessToken, refreshToken, expiresIn })
    const mockResponse = {
      data: {
        accessToken,
        refreshToken,
        expiresIn,
        userId: '1',
        user: { id: '1', username: 'mellwyn', role: 'USER' },
      },
    }
    return mockResponse
  }

  if (payload.username === 'admin' && payload.password === '123') {
    const accessToken = 'static-admin-token'
    const refreshToken = 'static-admin-refresh'
    const expiresIn = 3600
    setTokens({ accessToken, refreshToken, expiresIn })
    const mockResponse = {
      data: {
        accessToken,
        refreshToken,
        expiresIn,
        userId: '99',
        user: { id: '99', username: 'admin', role: 'ADMIN' },
      },
    }
    return mockResponse
  }

  const response = await apiClient.post('/auth/login', payload)
  const { accessToken, refreshToken, expiresIn } = response.data
  setTokens({ accessToken, refreshToken, expiresIn })
  return response
}

export const logout = async () => {
  try {
    await apiClient.post('/auth/logout')
  } catch (err) {
    // Ignore network/log out gracefully even if backend fails
  }
  removeTokens()
}

export const getUser = async (userId) => {
  return apiClient.get(`/users/${userId}`)
}
