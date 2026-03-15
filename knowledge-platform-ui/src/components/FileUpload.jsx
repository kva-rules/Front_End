import { useState } from 'react'
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import { uploadFile } from '../services/fileService'

const acceptedMime = '.pdf,image/*,text/plain,application/json,application/javascript,application/x-typescript,.ts,.js,.jsx,.py,.java,.c,.cpp,.md'

export function FileUpload({ onUploadComplete, label = 'Upload file', buttonText = 'Upload', disabled = false }) {
  const [progress, setProgress] = useState(0)
  const [uploadError, setUploadError] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleFile = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await uploadFile(formData, {
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total)),
      })

      onUploadComplete?.(res.data, file)
    } catch (error) {
      console.error('File upload failed', error)
      setUploadError('Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Button variant="outlined" component="label" disabled={disabled || uploading}>
        {buttonText}
        <input type="file" hidden accept={acceptedMime} onChange={handleFile} />
      </Button>
      {uploading && (
        <Box sx={{ mt: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption">Uploading: {progress}%</Typography>
        </Box>
      )}
      {uploadError && (
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
          {uploadError}
        </Typography>
      )}
    </Box>
  )
}
