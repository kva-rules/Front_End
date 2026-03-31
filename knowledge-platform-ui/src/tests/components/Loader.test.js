import { render, screen } from '@testing-library/react'
import { Loader } from '../../components/Loader'

describe('Loader', () => {
  it('renders the loading spinner with a default message', () => {
    render(<Loader />)
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })

  it('renders a custom message when provided', () => {
    render(<Loader message="Please wait" />)
    expect(screen.getByText(/Please wait/i)).toBeInTheDocument()
  })
})
