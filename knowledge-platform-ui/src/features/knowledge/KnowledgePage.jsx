import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Autocomplete,
  Paper,
} from '@mui/material'
import { getKnowledgeArticles } from '../../services/knowledgeService'
import { PaginationControls } from '../../components/PaginationControls'
import { Loader } from '../../components/Loader'

const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced']

export function KnowledgePage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)

  const loadArticles = async (filters = {}) => {
    setLoading(true)
    try {
      const response = await getKnowledgeArticles(filters)
      setArticles(response.data || [])
    } catch (err) {
      console.error('Failed to load knowledge articles', err)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const categories = useMemo(() => {
    const set = new Set()
    articles.forEach((article) => {
      if (article.category) set.add(article.category)
    })
    return Array.from(set)
  }, [articles])

  const tags = useMemo(() => {
    const set = new Set()
    articles.forEach((article) => {
      const tagsList = article.tags || article.topics || []
      if (Array.isArray(tagsList)) {
        tagsList.forEach((tag) => set.add(tag))
      } else if (typeof tagsList === 'string' && tagsList.trim()) {
        tagsList.split(',').forEach((tag) => set.add(tag.trim()))
      }
    })
    return Array.from(set)
  }, [articles])

  const applyFilters = async () => {
    await loadArticles({
      category: categoryFilter || undefined,
      difficulty: difficultyFilter || undefined,
      tag: tagFilter || undefined,
      q: searchText || undefined,
    })
  }

  const clearFilters = async () => {
    setCategoryFilter('')
    setDifficultyFilter('')
    setTagFilter('')
    setSearchText('')
    setPage(0)
    await loadArticles()
  }

  const handlePageChange = (_, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedArticles = useMemo(() => {
    const start = page * rowsPerPage
    return articles.slice(start, start + rowsPerPage)
  }, [articles, page, rowsPerPage])

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Knowledge Base
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Search articles by category, difficulty, and tags.
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Difficulty</InputLabel>
              <Select
                label="Difficulty"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {difficultyOptions.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8} md={3}>
            <Autocomplete
              freeSolo
              options={tags}
              value={tagFilter}
              onChange={(event, value) => setTagFilter(value || '')}
              onInputChange={(event, value) => setTagFilter(value)}
              renderInput={(params) => <TextField {...params} label="Tag" size="small" />}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" onClick={applyFilters}>Apply</Button>
              <Button variant="outlined" onClick={clearFilters}>Clear</Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Loader message="Loading knowledge articles..." />
      ) : (
        <Grid container spacing={2}>
          {articles.length === 0 ? (
            <Grid item xs={12}><Card><CardContent><Typography>No articles found.</Typography></CardContent></Card></Grid>
          ) : (
            paginatedArticles.map((article) => (
              <Grid item xs={12} md={6} key={article.id || article._id || article.articleId}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="h6">{article.title || article.name || 'Untitled'}</Typography>
                      <Chip label={article.category || 'General'} size="small" />
                    </Stack>
                    <List disablePadding>
                      <ListItem disableGutters>
                        <ListItemText primary="Difficulty" secondary={article.difficulty || 'N/A'} />
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText primary="Tags" secondary={Array.isArray(article.tags) ? article.tags.join(', ') : article.tags || '-'} />
                      </ListItem>
                      <ListItem disableGutters>
                        <ListItemText primary="Author" secondary={article.author || article.createdBy || 'Unknown'} />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
      {!loading && articles.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <PaginationControls
            count={articles.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Box>
      )}
    </Box>
  )
}
