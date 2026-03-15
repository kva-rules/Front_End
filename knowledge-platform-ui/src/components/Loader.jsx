import { Box, CircularProgress, Typography } from '@mui/material'

export function Loader({ message = 'Loading...', size = 40 }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}
