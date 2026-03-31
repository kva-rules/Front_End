import apiClient from '../../services/apiClient'
import { createSolution, getSolutionsByTicket, approveSolution } from '../../services/solutionService'

jest.mock('../../services/apiClient', () => ({ post: jest.fn(), get: jest.fn(), put: jest.fn() }))

describe('solutionService', () => {
  beforeEach(() => jest.clearAllMocks())

  it('creates a solution entry', () => {
    const payload = { text: 'Fix' }
    createSolution(payload)
    expect(apiClient.post).toHaveBeenCalledWith('/solutions', payload)
  })

  it('retrieves solutions by ticket id', () => {
    getSolutionsByTicket('123')
    expect(apiClient.get).toHaveBeenCalledWith('/solutions/ticket/123')
  })

  it('approves a solution', () => {
    approveSolution('abc', { approved: true })
    expect(apiClient.put).toHaveBeenCalledWith('/solutions/abc/approve', { approved: true })
  })
})
