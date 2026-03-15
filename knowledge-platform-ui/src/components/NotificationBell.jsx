import { useEffect, useState } from 'react'
import { Badge, IconButton, Menu, MenuItem, ListItemText, ListItemSecondaryAction, IconButton as MUIIconButton } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import { getUserNotifications, markNotificationRead, deleteNotification } from '../services/notificationService'

export function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState(null)
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

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id)
      await loadNotifications()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id)
      await loadNotifications()
    } catch (err) {
      console.error(err)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <>
      <IconButton color='inherit' onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color='error'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ mt: '45px' }}>
        {loading && <MenuItem>Loading...</MenuItem>}
        {!loading && notifications.length === 0 && <MenuItem>No notifications</MenuItem>}
        {!loading && notifications.map((notification) => (
          <MenuItem key={notification.id || notification.notificationId || notification._id}>
            <ListItemText
              primary={notification.title || notification.message || 'Alert'}
              secondary={notification.read ? 'Read' : 'Unread'}
            />
            <ListItemSecondaryAction>
              <MUIIconButton edge="end" size="small" color="success" onClick={() => handleMarkRead(notification.id || notification.notificationId || notification._id)}>
                <CheckIcon fontSize="small" />
              </MUIIconButton>
              <MUIIconButton edge="end" size="small" color="error" onClick={() => handleDelete(notification.id || notification.notificationId || notification._id)}>
                <DeleteIcon fontSize="small" />
              </MUIIconButton>
            </ListItemSecondaryAction>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
