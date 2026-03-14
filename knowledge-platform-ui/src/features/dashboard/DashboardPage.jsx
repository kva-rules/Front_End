import { Typography, Card, CardContent, Grid } from '@mui/material'

export function DashboardPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Knowledge Collaboration Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Team Workspace</Typography>
              <Typography variant="body2">View shared knowledge projects and documentation.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Real-time Collaboration</Typography>
              <Typography variant="body2">Live WebSocket updates for activities and notifications.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
