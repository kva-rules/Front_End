import axios from 'axios'
import { publishGlobalError } from '../utils/errorBus'

const API_BASE_URL = 'http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    publishGlobalError('Request failed to start.')
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      publishGlobalError('Network error: Unable to reach server.')
      return Promise.reject(new Error('Network error: Unable to reach server.'))
    }

    const status = error.response.status
    const awsMessage = error.response.data?.message || error.response.data?.error
    const message = awsMessage || error.message || 'An unknown error occurred.'

    if (status === 401) {
      publishGlobalError('Unauthorized. Please log in again.')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('token_expires_at')
      window.location.href = '/login'
      return Promise.reject(new Error('Unauthorized. Redirecting to login.'))
    }

    if (status === 500) {
      publishGlobalError('Server error (500). Please try again later.')
    }

    if (status >= 400) {
      publishGlobalError(message)
    }

    return Promise.reject(new Error(message))
  }
)

export default apiClient

export const getProfile = () => apiClient.get('/users/me')
