import apiClient from './apiClient'

export const createSolution = (payload) => apiClient.post('/solutions', payload)
export const getSolutionsByTicket = (ticketId) => apiClient.get(`/solutions/ticket/${ticketId}`)
export const approveSolution = (solutionId, payload = {}) => apiClient.put(`/solutions/${solutionId}/approve`, payload)
