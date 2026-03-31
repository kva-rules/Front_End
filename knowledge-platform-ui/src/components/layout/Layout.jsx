import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

const drawerWidth = 250

export function Layout({ children }) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        open={isDesktop ? true : mobileOpen}
        variant={isDesktop ? 'permanent' : 'temporary'}
        onClose={() => setMobileOpen(false)}
        drawerWidth={drawerWidth}
      />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Navbar onMenuClick={handleDrawerToggle} />
        <Toolbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  )
}
