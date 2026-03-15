import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  LinearProgress,
} from '@mui/material'
import { createSolution } from '../../services/solutionService'
import { FileUpload } from '../../components/FileUpload'

export function SolutionSubmitPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [codeSnippet, setCodeSnippet] = useState('')
  const [attachmentId, setAttachmentId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createSolution({ title, description, codeSnippet, attachments: attachmentId ? [attachmentId] : [] })
      navigate('/solutions')
    } catch (err) {
      setError('Failed to submit solution. Please retry.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Submit Solution
      </Typography>
      <Card>
        <CardContent>
          <Box component="form" onSubmit={submit}>
            <Stack spacing={2}>
              <TextField label="Solution Title" required fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                label="Code Snippet"
                fullWidth
                multiline
                minRows={6}
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="Paste code snippet here"
              />
              <FileUpload label="Attachment" buttonText="Upload Attachment" onUploadComplete={(data) => setAttachmentId(data?.id || data?.fileId)} />
              {attachmentId && <Typography variant="body2">Uploaded attachment ID: {attachmentId}</Typography>}
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Solution'}
              </Button>
              {loading && <LinearProgress />}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
