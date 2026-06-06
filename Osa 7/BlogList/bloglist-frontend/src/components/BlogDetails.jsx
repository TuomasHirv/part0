import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useBlogs, useUser, useStoreActions } from '../BlogStore'
const BlogDetails = () => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
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
    setComment('')
  }

  const submitComment = (event) => {
    void handleComment(blog.id, comment)
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
      <h2>Comments</h2>
      {blog.comments.map((comment) => (
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          key={comment.id}
        >
          {comment.content}
        </Box>
      ))}
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

      <Box component="form" onSubmit={submitComment} sx={{ mt: 2 }}>
        <TextField
          label="Comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 1 }}
        />
        <Button type="submit" variant="contained">
          add comment
        </Button>
      </Box>
    </Box>
  )
}

export default BlogDetails
