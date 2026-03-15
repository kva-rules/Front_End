import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Button,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import { getUsers, updateUser } from '../../services/userService'

const roleOptions = ['USER', 'ADMIN', 'MANAGER']

export function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingIds, setSavingIds] = useState([])
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const loadUsers = async () => {
    setLoading(true)
    try {
      const response = await getUsers()
      setUsers(response.data || [])
    } catch (err) {
      console.error('Failed to load users', err)
      setSnackbar({ open: true, message: err.message || 'Could not load users.', severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const saveUser = async (user) => {
    setSavingIds((prev) => [...prev, user.id])
    try {
      await updateUser(user.id, user)
      setSnackbar({ open: true, message: `${user.name || 'User'} updated successfully.`, severity: 'success' })
      await loadUsers()
    } catch (err) {
      console.error('Failed to update user', err)
      setSnackbar({ open: true, message: err.message || 'Could not update user.', severity: 'error' })
    } finally {
      setSavingIds((prev) => prev.filter((id) => id !== user.id))
    }
  }

  const handleRoleChange = (userId, value) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: value } : u)))
  }

  const handleActiveToggle = (userId, value) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, active: value } : u)))
  }

  const handleDeactivate = async (user) => {
    const updatedUser = { ...user, active: false }
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)))
    await saveUser(updatedUser)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Panel — User Management
      </Typography>
      <Typography mb={2}>View and manage users, assign roles, and deactivate accounts.</Typography>

      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  const isSaving = savingIds.includes(user.id)
                  const statusText = user.active ? 'Active' : 'Inactive'
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.name || 'Unnamed'}</TableCell>
                      <TableCell>{user.email || '-'}</TableCell>
                      <TableCell>
                        <FormControl fullWidth size="small">
                          <InputLabel>Role</InputLabel>
                          <Select
                            label="Role"
                            value={user.role || 'USER'}
                            onChange={(event) => handleRoleChange(user.id, event.target.value)}
                          >
                            {roleOptions.map((role) => (
                              <MenuItem key={role} value={role}>
                                {role}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        {statusText}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button variant="contained" size="small" onClick={() => saveUser(user)} disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save'}
                          </Button>
                          <Button variant="outlined" color="error" size="small" onClick={() => handleDeactivate(user)}>
                            Deactivate
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
