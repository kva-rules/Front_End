import { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, Paper, Grid, Stack, Snackbar, Alert } from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { getProfile, updateProfile } from '../../services/userService'

export function ProfilePage() {
  const { user, fetchUser } = useAuth()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    experience: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState('success')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile()
        const current = response.data
        setProfile({
          name: current.name || '',
          email: current.email || '',
          department: current.department || '',
          skills: current.skills || '',
          experience: current.experience || '',
        })
      } catch (err) {
        console.error('Failed to load profile', err)
        if (user) {
          setProfile({
            name: user.name || '',
            email: user.email || '',
            department: user.department || '',
            skills: user.skills || '',
            experience: user.experience || '',
          })
        }
      }
    }
    loadProfile()
  }, [user])

  const handleChange = (key) => (event) => {
    setProfile((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateProfile(profile)
      setStatusMessage('Profile updated successfully.')
      setStatusType('success')
      setOpenSnackbar(true)
      if (user?.id) {
        fetchUser(user.id)
      }
    } catch (err) {
      console.error('Update profile failed', err)
      setStatusMessage(err.message || 'Could not update profile.')
      setStatusType('error')
      setOpenSnackbar(true)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography mb={2}>Manage your user profile details</Typography>

      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              value={profile.name}
              onChange={handleChange('name')}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              value={profile.email}
              onChange={handleChange('email')}
              fullWidth
              margin="normal"
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              value={profile.department}
              onChange={handleChange('department')}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Skills"
              value={profile.skills}
              onChange={handleChange('skills')}
              fullWidth
              margin="normal"
              helperText="Comma-separated skills"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Experience"
              value={profile.experience}
              onChange={handleChange('experience')}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              helperText="A short summary of your experience"
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Profile'}
          </Button>
        </Stack>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={statusType} sx={{ width: '100%' }}>
          {statusMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
