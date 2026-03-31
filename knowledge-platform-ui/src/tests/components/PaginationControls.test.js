import { render, screen } from '@testing-library/react'
import { PaginationControls } from '../../components/PaginationControls'

describe('PaginationControls', () => {
  it('renders pagination controls with rows per page label', () => {
    render(
      <PaginationControls
        count={50}
        page={0}
        rowsPerPage={10}
        onPageChange={jest.fn()}
        onRowsPerPageChange={jest.fn()}
      />
    )

    expect(screen.getByText(/Rows per page/i)).toBeInTheDocument()
  })
})
