import { useState } from 'react'
import { Button, Card, CardContent, TextField, Typography, Box } from '@mui/material'
import { useAuth } from '../../context/AuthContext'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login({ username, password })
    } catch {
      setError('Login failed. Please check credentials.')
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
      <Card sx={{ width: 380 }}>
        <CardContent>
          <Typography component="h1" variant="h5" gutterBottom>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
