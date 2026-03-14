import React, { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('access_token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const clearAuth = useCallback(() => {
    authService.removeTokens()
    setToken(null)
    setUser(null)
  }, [])

  const handleLogout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
      clearAuth()
      navigate('/login')
    } catch (err) {
      clearAuth()
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }, [clearAuth, navigate])

  const fetchUser = useCallback(async (userId) => {
    if (!userId) return null
    try {
      const response = await authService.getUser(userId)
      setUser(response.data)
      return response.data
    } catch (err) {
      console.error('Failed to fetch user', err)
      return null
    }
  }, [])

  const handleLogin = useCallback(
    async (payload) => {
      setLoading(true)
      setError(null)
      try {
        const response = await authService.login(payload)
        const { accessToken, userId } = response.data
        setToken(accessToken)
        if (userId) {
          localStorage.setItem('user_id', userId)
          await fetchUser(userId)
        } else if (response.data.user?.id) {
          const resolvedId = response.data.user.id
          localStorage.setItem('user_id', resolvedId)
          setUser(response.data.user)
        } else {
          // fallback: attempt /users/me if API supports it
          try {
            const me = await authService.getUser('me')
            setUser(me.data)
            if (me.data?.id) {
              localStorage.setItem('user_id', me.data.id)
            }
          } catch {
            setUser(null)
          }
        }
        navigate('/dashboard')
        return response
      } catch (e) {
        setError(e)
        throw e
      } finally {
        setLoading(false)
      }
    },
    [fetchUser, navigate]
  )

  useEffect(() => {
    const currentToken = localStorage.getItem('access_token')
    if (currentToken && !user) {
      const savedUserId = localStorage.getItem('user_id')
      if (savedUserId) {
        fetchUser(savedUserId)
      }
    }
  }, [fetchUser, user])

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login: handleLogin, logout: handleLogout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
