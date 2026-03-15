import { useEffect, useMemo, useState } from 'react'
import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { getLeaderboard } from '../../services/leaderboardService'
import { PaginationControls } from '../../components/PaginationControls'
import { Loader } from '../../components/Loader'

export function LeaderboardPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await getLeaderboard()
        setRows(res.data || [])
      } catch (err) {
        console.error('Failed to load leaderboard', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage
    return rows.slice(start, start + rowsPerPage)
  }, [rows, page, rowsPerPage])

  const handlePageChange = (_, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Track top users by points and contributions.
      </Typography>

      {loading ? (
        <Loader message="Loading leaderboard..." />
      ) : (
        <TableContainer component={Card}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Badges</TableCell>
                  <TableCell>Solutions Contributed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No leaderboard data available</TableCell>
                  </TableRow>
                ) : paginatedRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No leaderboard entries for this page</TableCell>
                  </TableRow>
                ) : (
                  paginatedRows.map((r, idx) => (
                    <TableRow key={r.userId || idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{r.username || r.name || 'Unknown'}</TableCell>
                      <TableCell>{r.points ?? 0}</TableCell>
                      <TableCell>{(r.badges || []).join(', ') || 'None'}</TableCell>
                      <TableCell>{r.solutionsContributed ?? r.contributions ?? 0}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <PaginationControls
                count={rows.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Box>
          </CardContent>
        </TableContainer>
      )}
    </Box>
  )
}
