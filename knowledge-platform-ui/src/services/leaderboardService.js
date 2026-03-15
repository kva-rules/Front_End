import apiClient from './apiClient'

export const getLeaderboard = () => apiClient.get('/rewards/leaderboard')
