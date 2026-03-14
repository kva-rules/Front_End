import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar onMenuClick={() => {}} />
        <Box component='main' sx={{ p: 3, bgcolor: 'background.default' }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
  )
}
