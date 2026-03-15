import apiClient from './apiClient'

export const getAssignedTickets = (userId) => apiClient.get(`/tickets/user/${userId}`)
export const getRecentKnowledge = () => apiClient.get('/knowledge/recent')
export const getLeaderboard = () => apiClient.get('/rewards/leaderboard')
export const getNotifications = (userId) => apiClient.get(`/notifications/users/${userId}`)
