import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useBlogs, useUser, useStoreActions } from '../BlogStore'
import { UseField } from '../hooks'

const BlogDetails = () => {
  const navigate = useNavigate()
  const { reset: resetComment, ...comment } = UseField('text')
  const blogsList = useBlogs()
  const { deleteBlog, createComment, likeBlog, setNotification } =
    useStoreActions()
  const { id } = useParams()
  const user = useUser()
  const userID = user?.user

  const blog = blogsList.find((blog) => blog.id === id)
  if (!blog) {
    return (
      <Box>
        <Typography variant="h5">Blog</Typography>
        <Typography>Blog not found for id: {id}</Typography>
      </Box>
    )
  }
  const handleDelete = (id) => {
    deleteBlog(id)
    setNotification('Succesfully deleted', 'notification')
    navigate('/')
  }
  const handleComment = async (id, text) => {
    await createComment(id, text)
    setNotification('Succesfully created comment', 'notification')
    resetComment()
  }

  const submitComment = (event) => {
    void handleComment(blog.id, comment.value)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4">
        {blog.title} {blog.author}
      </Typography>

      <Typography variant="body1">URL: {blog.url}</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body1">Likes: {blog.likes}</Typography>
        {userID && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => likeBlog(blog.id)}
          >
            Like
          </Button>
        )}
      </Box>

      <Typography variant="body1">Author: {blog.author}</Typography>
      {userID === blog.user?.id && (
        <Box sx={{ mt: 1 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(blog.id)}
          >
            Delete
          </Button>
        </Box>
      )}

      <Box
        sx={{
          mt: 2,
          p: 2,
          borderRadius: 2,
          bgcolor: 'primary.50',
          border: 1,
          borderColor: 'primary.100',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark' }}>
          Comments
        </Typography>

        <Box
          component="ul"
          sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1 }}
        >
          {blog.comments.map((comment) => (
            <Box
              component="li"
              key={comment.id}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1.5,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'primary.100',
              }}
            >
              {comment.content}
            </Box>
          ))}
        </Box>

        <Box component="form" onSubmit={submitComment} sx={{ mt: 2 }}>
          <TextField
            label="Comment"
            fullWidth
            size="small"
            sx={{ mb: 1, bgcolor: 'background.paper' }}
            {...comment}
          />
          <Button type="submit" variant="contained">
            add comment
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default BlogDetails
