import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService'

const blankCategory = { name: '', description: '' }

export function CategoryManagementPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [newCategory, setNewCategory] = useState(blankCategory)
  const [editId, setEditId] = useState(null)
  const [editedCategory, setEditedCategory] = useState(blankCategory)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const loadCategories = async () => {
    setLoading(true)
    try {
      const response = await getCategories()
      setCategories(response.data || [])
    } catch (err) {
      console.error('Failed to load categories', err)
      setSnackbar({ open: true, message: err.message || 'Could not load categories.', severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleCreate = async () => {
    if (!newCategory.name.trim()) {
      setSnackbar({ open: true, message: 'Category name is required.', severity: 'warning' })
      return
    }
    setSavingId('new')
    try {
      await createCategory(newCategory)
      setSnackbar({ open: true, message: 'Category created.', severity: 'success' })
      setNewCategory(blankCategory)
      await loadCategories()
    } catch (err) {
      console.error(err)
      setSnackbar({ open: true, message: err.message || 'Could not create category.', severity: 'error' })
    } finally {
      setSavingId(null)
    }
  }

  const handleEdit = (category) => {
    setEditId(category.id)
    setEditedCategory({ name: category.name || '', description: category.description || '' })
  }

  const handleSaveEdit = async (categoryId) => {
    if (!editedCategory.name.trim()) {
      setSnackbar({ open: true, message: 'Category name cannot be empty.', severity: 'warning' })
      return
    }
    setSavingId(categoryId)
    try {
      await updateCategory(categoryId, editedCategory)
      setSnackbar({ open: true, message: 'Category updated.', severity: 'success' })
      setEditId(null)
      await loadCategories()
    } catch (err) {
      console.error(err)
      setSnackbar({ open: true, message: err.message || 'Could not update category.', severity: 'error' })
    } finally {
      setSavingId(null)
    }
  }

  const handleDelete = async (categoryId) => {
    setSavingId(categoryId)
    try {
      await deleteCategory(categoryId)
      setSnackbar({ open: true, message: 'Category deleted.', severity: 'success' })
      await loadCategories()
    } catch (err) {
      console.error(err)
      setSnackbar({ open: true, message: err.message || 'Could not delete category.', severity: 'error' })
    } finally {
      setSavingId(null)
    }
  }

  const rows = useMemo(() => categories || [], [categories])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Category Management
      </Typography>
      <Typography mb={2}>Create, update, and delete categories.</Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Create Category</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end" mt={1}>
          <TextField
            label="Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
            fullWidth
            sx={{ maxWidth: 320 }}
          />
          <TextField
            label="Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))}
            fullWidth
            sx={{ maxWidth: 360 }}
          />
          <Button variant="contained" onClick={handleCreate} disabled={savingId === 'new'}>
            {savingId === 'new' ? 'Creating...' : 'Create'}
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {editId === category.id ? (
                        <TextField
                          value={editedCategory.name}
                          onChange={(e) => setEditedCategory((prev) => ({ ...prev, name: e.target.value }))}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        category.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editId === category.id ? (
                        <TextField
                          value={editedCategory.description}
                          onChange={(e) => setEditedCategory((prev) => ({ ...prev, description: e.target.value }))}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        category.description || '—'
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        {editId === category.id ? (
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<SaveIcon />}
                            onClick={() => handleSaveEdit(category.id)}
                            disabled={savingId === category.id}
                          >
                            Save
                          </Button>
                        ) : (
                          <IconButton size="small" onClick={() => handleEdit(category)}>
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(category.id)}
                          disabled={savingId === category.id}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
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
