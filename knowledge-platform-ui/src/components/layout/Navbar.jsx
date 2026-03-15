import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useThemeToggle } from '../../providers/ThemeProvider'
import { NotificationBell } from '../NotificationBell'

export function Navbar({ onMenuClick }) {
  const { toggleTheme, mode } = useThemeToggle()

  return (
    <AppBar position='sticky' color='primary' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color='inherit' edge='start' onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Knowledge Collaboration Platform
        </Typography>
        <NotificationBell />
        <IconButton color='inherit' onClick={toggleTheme}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
