import { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { subscribeGlobalError } from '../utils/errorBus'

export function GlobalErrorNotifier() {
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeGlobalError((message) => {
      setError(message)
    })
    return unsubscribe
  }, [])

  const handleClose = () => {
    setError(null)
  }

  return (
    <Snackbar open={Boolean(error)} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
