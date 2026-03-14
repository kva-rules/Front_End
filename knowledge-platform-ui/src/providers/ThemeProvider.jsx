import { useMemo, useState, createContext, useContext } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { darkTheme, lightTheme } from '../theme'

const ThemeToggleContext = createContext({ toggleTheme: () => {}, mode: 'light' })

export function useThemeToggle() {
  return useContext(ThemeToggleContext)
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light')
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode])

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeToggleContext.Provider>
  )
}
