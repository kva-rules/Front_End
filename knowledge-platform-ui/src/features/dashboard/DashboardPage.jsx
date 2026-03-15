import { useEffect, useState } from 'react'
import { Box, Card, CardContent, CircularProgress, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { getAssignedTickets, getRecentKnowledge, getLeaderboard, getNotifications } from '../../services/dashboardService'

export function DashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState([])
  const [knowledge, setKnowledge] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const userId = user?.id || localStorage.getItem('user_id')
      try {
        if (userId) {
          const [ticketsRes, notesRes] = await Promise.all([
            getAssignedTickets(userId),
            getNotifications(userId),
          ])
          setTickets(ticketsRes.data || [])
          setNotifications(notesRes.data || [])
        }
        const [knowledgeRes, leaderboardRes] = await Promise.all([
          getRecentKnowledge(),
          getLeaderboard(),
        ])
        setKnowledge(knowledgeRes.data || [])
        setLeaderboard(leaderboardRes.data || [])
      } catch (err) {
        console.error('Dashboard fetch error', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [user])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Assigned Tickets</Typography>
              <List dense>
                {tickets.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No assigned tickets" />
                  </ListItem>
                ) : (
                  tickets.slice(0, 3).map((t) => (
                    <ListItem key={t.id || t.ticketId || t._id}>
                      <ListItemText primary={t.title || t.subject || `Ticket ${t.id}`} secondary={t.status || 'Open'} />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Recent Solutions</Typography>
              <List dense>
                {knowledge.slice(0, 3).length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No recent solutions" />
                  </ListItem>
                ) : (
                  knowledge.slice(0, 3).map((item) => (
                    <ListItem key={item.id || item._id || item.title}>
                      <ListItemText primary={item.title || item.name} secondary={item.summary || 'Solution article'} />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Knowledge Articles</Typography>
              <List dense>
                {knowledge.slice(0, 3).length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No recent knowledge articles" />
                  </ListItem>
                ) : (
                  knowledge.slice(0, 3).map((article) => (
                    <ListItem key={article.id || article._id || article.title}>
                      <ListItemText primary={article.title || article.name} secondary={article.category || 'Article'} />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Leaderboard</Typography>
              <List dense>
                {leaderboard.slice(0, 4).length === 0 ? (
                  <ListItem>
                    <ListItemText primary="Leaderboard not available" />
                  </ListItem>
                ) : (
                  leaderboard.slice(0, 4).map((row, idx) => (
                    <ListItem key={row.id || row.userId || idx}>
                      <ListItemText
                        primary={`${idx + 1}. ${row.name || row.username || 'User'}`}
                        secondary={`Points: ${row.points || row.score || 0}`}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Notifications</Typography>
              <List dense>
                {notifications.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No notifications" />
                  </ListItem>
                ) : (
                  notifications.slice(0, 5).map((note) => (
                    <ListItem key={note.id || note.notificationId || note._id}>
                      <ListItemText primary={note.title || note.message || 'Notification'} secondary={note.createdAt || note.date || ''} />
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
