import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  LinearProgress,
} from '@mui/material'
import { createTicket } from '../../services/ticketService'
import { FileUpload } from '../../components/FileUpload'

const categories = ['Bug', 'Feature', 'Support', 'Security']
const difficulties = ['Low', 'Medium', 'High', 'Critical']

export function CreateTicketPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Bug')
  const [difficulty, setDifficulty] = useState('Medium')
  const [attachmentId, setAttachmentId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        title,
        description,
        category,
        difficulty,
        attachments: attachmentId ? [attachmentId] : [],
      }
      await createTicket(payload)
      navigate('/tickets')
    } catch (err) {
      setError('Failed to create ticket. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create Ticket
      </Typography>
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField label="Title" required fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
              <TextField
                label="Description"
                required
                fullWidth
                multiline
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((c) => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Difficulty</InputLabel>
                  <Select value={difficulty} label="Difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                    {difficulties.map((d) => (
                      <MenuItem key={d} value={d}>{d}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <FileUpload
                label="Attachment"
                buttonText="Upload Attachment"
                onUploadComplete={(data, file) => {
                  const id = data?.id || data?.fileId || data?.attachmentId
                  setAttachmentId(id)
                }}
              />
              {attachmentId && <Typography variant="body2">Uploaded file ID: {attachmentId}</Typography>}

              {error && <Typography color="error">{error}</Typography>}

              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Ticket'}
              </Button>

              {loading && <LinearProgress />}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
