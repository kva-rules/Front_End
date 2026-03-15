import apiClient from './apiClient'

export const getCategories = () => apiClient.get('/categories')
export const createCategory = (payload) => apiClient.post('/categories', payload)
export const updateCategory = (categoryId, payload) => apiClient.put(`/categories/${categoryId}`, payload)
export const deleteCategory = (categoryId) => apiClient.delete(`/categories/${categoryId}`)
