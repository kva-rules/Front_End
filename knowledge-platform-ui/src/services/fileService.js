import apiClient from './apiClient'

export const uploadFile = (formData) => apiClient.post('/files/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
