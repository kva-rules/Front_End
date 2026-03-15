import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from '@mui/material'
import { getKnowledgeArticleById } from '../../services/knowledgeService'

export function KnowledgeArticlePage() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true)
      try {
        const response = await getKnowledgeArticleById(id)
        setArticle(response.data)
      } catch (err) {
        console.error('Failed to load article', err)
      } finally {
        setLoading(false)
      }
    }
    if (id) loadArticle()
  }, [id])

  if (loading) return <LinearProgress />
  if (!article) return <Typography variant="h6">Article not found.</Typography>

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{article.title || 'Article'}</Typography>
      <Stack direction="row" spacing={1} mb={2}>
        <Chip label={article.category || 'General'} size="small" />
        <Chip label={`Author: ${article.author || article.createdBy || 'Unknown'}`} size="small" />
        <Chip label={`Rating: ${article.rating ?? 'N/A'}`} size="small" />
        <Chip label={`Views: ${article.views ?? 0}`} size="small" />
      </Stack>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {article.content || article.body || 'No content available.'}
          </Typography>
        </CardContent>
      </Card>
      {article.codeSnippets?.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>Code Snippets</Typography>
          {article.codeSnippets.map((snippet, idx) => (
            <Card key={idx} sx={{ mb: 1, backgroundColor: '#1e1e1e', color: '#f5f5f5' }}>
              <CardContent>
                <Typography variant="subtitle2" color="secondary">{snippet.title || `Snippet ${idx + 1}`}</Typography>
                <Box component="pre" sx={{ whiteSpace: 'pre-wrap', fontSize: 12, mt: 1 }}>{snippet.code || snippet}</Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
