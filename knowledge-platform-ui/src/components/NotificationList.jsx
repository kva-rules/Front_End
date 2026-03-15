import { useEffect, useState } from 'react'
import { Box, Card, CardContent, List, ListItem, ListItemText, IconButton, Typography, Chip } from '@mui/material'
import { getUserNotifications, markNotificationRead, deleteNotification } from '../services/notificationService'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'

export function NotificationList() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const userId = localStorage.getItem('user_id') || '1'

  const loadNotifications = async () => {
    setLoading(true)
    try {
      const res = await getUserNotifications(userId)
      setNotifications(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  const markRead = async (id) => {
    try {
      await markNotificationRead(id)
      await loadNotifications()
    } catch (err) {
      console.error(err)
    }
  }

  const remove = async (id) => {
    try {
      await deleteNotification(id)
      await loadNotifications()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Notifications</Typography>
        <List>
          {loading && <ListItem><ListItemText primary="Loading..." /></ListItem>}
          {!loading && notifications.length === 0 && <ListItem><ListItemText primary="No notifications" /></ListItem>}
          {!loading && notifications.map((n) => {
            const id = n.id || n.notificationId || n._id
            return (
              <ListItem key={id} divider alignItems="flex-start" secondaryAction={
                <>
                  <IconButton edge="end" size="small" onClick={() => markRead(id)}><CheckIcon fontSize="small" /></IconButton>
                  <IconButton edge="end" size="small" onClick={() => remove(id)}><DeleteIcon fontSize="small" /></IconButton>
                </>
              }>
                <ListItemText
                  primary={<><Typography component="span" variant="subtitle1">{n.title || n.message || 'Notification'}</Typography> {n.read ? <Chip label="Read" size="small" sx={{ ml: 1 }} /> : <Chip label="Unread" size="small" color="warning" sx={{ ml: 1 }} />}</>}
                  secondary={n.body || n.message || n.detail || ''}
                />
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}
