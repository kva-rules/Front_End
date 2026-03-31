import apiClient from '../../services/apiClient'
import { getKnowledgeArticles, getKnowledgeArticleById } from '../../services/knowledgeService'

jest.mock('../../services/apiClient', () => ({ get: jest.fn() }))

describe('knowledgeService', () => {
  beforeEach(() => jest.clearAllMocks())

  it('fetches knowledge articles with params', () => {
    getKnowledgeArticles({ category: 'JavaScript' })
    expect(apiClient.get).toHaveBeenCalledWith('/knowledge', { params: { category: 'JavaScript' } })
  })

  it('fetches knowledge article by id', () => {
    getKnowledgeArticleById('abc')
    expect(apiClient.get).toHaveBeenCalledWith('/knowledge/abc')
  })
})
