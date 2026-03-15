import apiClient from './apiClient'

export const getTickets = () => apiClient.get('/tickets')
export const getTicketById = (ticketId) => apiClient.get(`/tickets/${ticketId}`)
export const createTicket = (payload) => apiClient.post('/tickets', payload)
export const updateTicket = (ticketId, payload) => apiClient.put(`/tickets/${ticketId}`, payload)
