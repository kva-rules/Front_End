import React from 'react'
import { Box, Button, Typography } from '@mui/material'

export class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Global render error caught:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" gutterBottom>
            An unexpected error occurred and the page cannot be displayed.
          </Typography>
          <Button variant="contained" onClick={this.handleReload}>
            Reload page
          </Button>
        </Box>
      )
    }
    return this.props.children
  }
}
