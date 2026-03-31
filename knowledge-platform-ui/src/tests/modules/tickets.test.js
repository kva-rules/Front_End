import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TicketsPage } from '../../features/tickets/TicketsPage'
import * as ticketService from '../../services/ticketService'

jest.mock('../../services/ticketService')
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}))

describe('Ticket module', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders ticket list with filters', async () => {
    ticketService.getTickets.mockResolvedValueOnce({
      data: [
        { id: '1', title: 'Test ticket', category: 'Bug', difficulty: 'Low', status: 'Open', assignedEngineer: 'Alice' },
      ],
    })

    render(<TicketsPage />)

    await waitFor(() => expect(screen.getByText(/Test ticket/i)).toBeInTheDocument())
    expect(screen.getByText(/Bug/i)).toBeInTheDocument()
  })

  it('filters tickets by status', async () => {
    ticketService.getTickets.mockResolvedValueOnce({ data: [ { id: '1', title: 'Filtered ticket', status: 'Closed', category: '', difficulty: '' } ] })

    render(<TicketsPage />)
    await waitFor(() => expect(screen.getByText(/Filtered ticket/i)).toBeInTheDocument())

    fireEvent.mouseDown(screen.getByRole('combobox', { name: /Status/i }))
    fireEvent.click(screen.getByRole('option', { name: 'Closed' }))

    expect(screen.getByText(/Filtered ticket/i)).toBeInTheDocument()
  })
})
