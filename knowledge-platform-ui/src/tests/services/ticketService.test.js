import apiClient from '../../services/apiClient'
import { getTickets, getTicketById, createTicket, updateTicket } from '../../services/ticketService'

jest.mock('../../services/apiClient', () => ({ get: jest.fn(), post: jest.fn(), put: jest.fn() }))

describe('ticketService', () => {
  beforeEach(() => jest.clearAllMocks())

  it('calls the tickets endpoint', () => {
    getTickets()
    expect(apiClient.get).toHaveBeenCalledWith('/tickets')
  })

  it('requests ticket details by id', () => {
    getTicketById('123')
    expect(apiClient.get).toHaveBeenCalledWith('/tickets/123')
  })

  it('creates a new ticket', () => {
    const payload = { title: 'Issue' }
    createTicket(payload)
    expect(apiClient.post).toHaveBeenCalledWith('/tickets', payload)
  })

  it('updates a ticket', () => {
    const payload = { status: 'closed' }
    updateTicket('123', payload)
    expect(apiClient.put).toHaveBeenCalledWith('/tickets/123', payload)
  })
})
