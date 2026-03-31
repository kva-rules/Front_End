import { render, screen, fireEvent } from '@testing-library/react'
import { ModalDialog } from '../../components/ModalDialog'

describe('ModalDialog', () => {
  it('renders title and content', () => {
    render(
      <ModalDialog open title="Confirm Action" onClose={jest.fn()} onConfirm={jest.fn()}>
        Confirm the operation.
      </ModalDialog>
    )

    expect(screen.getByText(/Confirm Action/i)).toBeInTheDocument()
    expect(screen.getByText(/Confirm the operation./i)).toBeInTheDocument()
  })

  it('calls confirm and close handlers', () => {
    const onClose = jest.fn()
    const onConfirm = jest.fn()

    render(
      <ModalDialog open title="Confirm" onClose={onClose} onConfirm={onConfirm} />
    )

    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }))
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
