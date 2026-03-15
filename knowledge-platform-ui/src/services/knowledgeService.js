import apiClient from './apiClient'

export const getKnowledgeArticles = (params = {}) => apiClient.get('/knowledge', { params })
export const getKnowledgeArticleById = (articleId) => apiClient.get(`/knowledge/${articleId}`)
