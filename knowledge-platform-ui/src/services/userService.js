import apiClient from './apiClient'

export const getProfile = () => apiClient.get('/users/me')
export const updateProfile = (payload) => apiClient.put('/users/me', payload)

export const getUsers = () => apiClient.get('/users')
export const updateUser = (userId, payload) => apiClient.put(`/users/${userId}`, payload)
