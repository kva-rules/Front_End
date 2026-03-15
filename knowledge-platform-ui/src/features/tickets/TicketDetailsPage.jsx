import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  LinearProgress,
} from '@mui/material'
import { getTicketById } from '../../services/ticketService'

export function TicketDetailsPage() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTicket = async () => {
      setLoading(true)
      try {
        const response = await getTicketById(id)
        setTicket(response.data)
      } catch (err) {
        console.error('Ticket load failed', err)
      } finally {
        setLoading(false)
      }
    }
    if (id) loadTicket()
  }, [id])

  if (loading) return <LinearProgress />

  if (!ticket) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Ticket Details
        </Typography>
        <Typography color="error">Ticket not found.</Typography>
      </Box>
    )
  }

  const solutions = ticket.solutions || ticket.submittedSolutions || []
  const attachments = ticket.attachments || []
  const comments = ticket.comments || ticket.notes || []

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Ticket Details
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Ticket ID: {ticket.id || ticket.ticketId || id}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Description</Typography>
              <Typography>{ticket.description || ticket.details || 'No description available.'}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Solutions Submitted
              </Typography>
              <List dense>
                {solutions.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No solutions submitted yet." />
                  </ListItem>
                ) : (
                  solutions.map((solution, idx) => (
                    <ListItem key={solution.id || solution._id || idx}>
                      <ListItemText
                        primary={solution.title || solution.summary || `Solution ${idx + 1}`}
                        secondary={solution.status || solution.createdAt || ''}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              <List dense>
                {comments.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No comments yet." />
                  </ListItem>
                ) : (
                  comments.map((comment, idx) => (
                    <ListItem key={comment.id || comment._id || idx} alignItems="flex-start">
                      <ListItemText
                        primary={comment.author || comment.user || `Comment ${idx + 1}`}
                        secondary={comment.message || comment.text || comment.body || ''}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Details</Typography>
              <Stack spacing={1} mt={1}>
                <Typography><strong>Category:</strong> {ticket.category || '-'}</Typography>
                <Typography><strong>Difficulty:</strong> {ticket.difficulty || '-'}</Typography>
                <Typography><strong>Assigned Engineer:</strong> {ticket.assignedEngineer || ticket.assigned || 'Unassigned'}</Typography>
                <Typography><strong>Status:</strong> {ticket.status || '-'}</Typography>
                <Typography><strong>Created Date:</strong> {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : '-'}</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attachments
              </Typography>
              <List dense>
                {attachments.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No attachments." />
                  </ListItem>
                ) : (
                  attachments.map((att, idx) => (
                    <ListItem key={att.id || att._id || idx}>
                      <ListItemText primary={att.filename || att.name || `Attachment ${idx + 1}`} secondary={att.size ? `${att.size} bytes` : ''} />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
