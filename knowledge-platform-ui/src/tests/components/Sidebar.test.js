import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Sidebar } from '../../components/layout/Sidebar'

describe('Sidebar', () => {
  it('renders the navigation links and profile link', () => {
    render(
      <MemoryRouter>
        <Sidebar open onClose={jest.fn()} />
      </MemoryRouter>
    )

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
    expect(screen.getByText(/Tickets/i)).toBeInTheDocument()
    expect(screen.getByText(/Profile/i)).toBeInTheDocument()
  })
})
