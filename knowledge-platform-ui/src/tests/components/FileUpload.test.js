import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FileUpload } from '../../components/FileUpload'
import { uploadFile } from '../../services/fileService'

jest.mock('../../services/fileService', () => ({ uploadFile: jest.fn() }))

describe('FileUpload', () => {
  it('renders upload button and label', () => {
    render(<FileUpload />)
    expect(screen.getByText(/Upload file/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument()
  })

  it('uploads a file and calls onUploadComplete', async () => {
    const mockResponse = { data: { id: 'file-1' } }
    uploadFile.mockResolvedValueOnce(mockResponse)
    const onUploadComplete = jest.fn()

    render(<FileUpload onUploadComplete={onUploadComplete} />)

    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })
    const input = document.querySelector('input[type="file"]')
    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => expect(onUploadComplete).toHaveBeenCalledWith(mockResponse.data, file))
  })
})
