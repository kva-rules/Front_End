import { NavLink } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import BuildIcon from '@mui/icons-material/Build'
import BookIcon from '@mui/icons-material/Book'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PeopleIcon from '@mui/icons-material/People'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CategoryIcon from '@mui/icons-material/Category'

const menuItems = [
  { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { label: 'Tickets', icon: ConfirmationNumberIcon, path: '/tickets' },
  { label: 'Solutions', icon: BuildIcon, path: '/solutions' },
  { label: 'Knowledge Base', icon: BookIcon, path: '/knowledge' },
  { label: 'Leaderboard', icon: LeaderboardIcon, path: '/leaderboard' },
  { label: 'Notifications', icon: NotificationsIcon, path: '/notifications' },
  { label: 'Users', icon: PeopleIcon, path: '/users' },
  { label: 'Categories', icon: CategoryIcon, path: '/admin/categories' },
  { label: 'Admin', icon: AdminPanelSettingsIcon, path: '/admin' },
]

export function Sidebar({ open, onClose, variant = 'permanent', drawerWidth = 250 }) {
  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={onClose}
              sx={{
                '&.active': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to='/profile'
            onClick={onClose}
            sx={{
              '&.active': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
