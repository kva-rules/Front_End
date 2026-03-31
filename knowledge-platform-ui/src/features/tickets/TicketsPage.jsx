import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid,
  Stack,
} from '@mui/material'
import { getTickets } from '../../services/ticketService'
import { useNavigate } from 'react-router-dom'
import { PaginationControls } from '../../components/PaginationControls'

export function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [assignedFilter, setAssignedFilter] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loadTickets = async () => {
      setLoading(true)
      try {
        const response = await getTickets()
        setTickets(response.data || [])
      } catch (err) {
        console.error('Failed to load tickets', err)
      } finally {
        setLoading(false)
      }
    }
    loadTickets()
  }, [])

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const text = `${ticket.title || ''} ${ticket.category || ''} ${ticket.assignedEngineer || ticket.assigned || ''}`.toLowerCase()
      if (search && !text.includes(search.toLowerCase())) return false
      if (statusFilter && ticket.status !== statusFilter) return false
      if (difficultyFilter && ticket.difficulty !== difficultyFilter) return false
      if (categoryFilter && ticket.category !== categoryFilter) return false
      const assigned = ticket.assignedEngineer || ticket.assigned || ''
      if (assignedFilter && assigned !== assignedFilter) return false
      return true
    })
  }, [tickets, search, statusFilter, difficultyFilter, categoryFilter, assignedFilter])

  const allStatuses = [...new Set(tickets.map((t) => t.status).filter(Boolean))]
  const allDifficulties = [...new Set(tickets.map((t) => t.difficulty).filter(Boolean))]
  const allCategories = [...new Set(tickets.map((t) => t.category).filter(Boolean))]
  const allAssigned = [...new Set(tickets.map((t) => t.assignedEngineer || t.assigned).filter(Boolean))]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const paginatedTickets = useMemo(() => {
    const start = page * rowsPerPage
    return filteredTickets.slice(start, start + rowsPerPage)
  }, [filteredTickets, page, rowsPerPage])

  const handlePageChange = (_, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Tickets
          </Typography>
          <Typography color="textSecondary">View and filter all support tickets.</Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={() => navigate('/create-ticket')}>
          Create Ticket
        </Button>
      </Stack>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title/category/engineer"
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {allStatuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                <Select
                  labelId="difficulty-label"
                  id="difficulty-select"
                  value={difficultyFilter}
                  label="Difficulty"
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {allDifficulties.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {allCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <FormControl fullWidth>
                <InputLabel id="assigned-label">Assigned Engineer</InputLabel>
                <Select
                  labelId="assigned-label"
                  id="assigned-select"
                  value={assignedFilter}
                  label="Assigned Engineer"
                  onChange={(e) => setAssignedFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  {allAssigned.map((a) => (
                    <MenuItem key={a} value={a}>{a}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticket ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned Engineer</TableCell>
              <TableCell>Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No tickets found.</TableCell>
              </TableRow>
            ) : paginatedTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No tickets found for this page.</TableCell>
              </TableRow>
            ) : (
              paginatedTickets.map((ticket) => (
                <TableRow key={ticket.id || ticket.ticketId || ticket._id} hover onClick={() => navigate(`/tickets/${ticket.id || ticket.ticketId || ticket._id}`)} sx={{ cursor: 'pointer' }}>
                  <TableCell>{ticket.id || ticket.ticketId || '-'} </TableCell>
                  <TableCell>{ticket.title || ticket.subject || '-'}</TableCell>
                  <TableCell>{ticket.category || '-'}</TableCell>
                  <TableCell>{ticket.difficulty || '-'}</TableCell>
                  <TableCell>{ticket.status || '-'}</TableCell>
                  <TableCell>{ticket.assignedEngineer || ticket.assigned || 'Unassigned'}</TableCell>
                  <TableCell>{new Date(ticket.createdAt || ticket.createdDate || Date.now()).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
        <PaginationControls
          count={filteredTickets.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Box>
    </Box>
  )
}
