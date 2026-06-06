import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useStoreActions } from '../BlogStore'
import { useNavigate } from 'react-router-dom'
import { UseField } from '../hooks'
const BlogForm = () => {
  const navigate = useNavigate()
  const { createBlog, setNotification } = useStoreActions()
  const { reset: resetTitle, ...title } = UseField('text')
  const { reset: resetAuthor, ...author } = UseField('text')
  const { reset: resetUrl, ...url } = UseField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const submittedTitle = title.value

    await createBlog({
      title: submittedTitle,
      author: author.value,
      url: url.value,
    })

    setNotification('Succesfully created blog: ' + submittedTitle, 'notification')
    resetTitle()
    resetAuthor()
    resetUrl()
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            variant="standard"
            label="Title"
            id="title"
            name="Title"
            required
            margin="normal"
            fullWidth
            {...title}
          />
        </div>

        <div>
          <TextField
            variant="standard"
            label="Author"
            id="author"
            name="Author"
            required
            margin="normal"
            fullWidth
            {...author}
          />
        </div>

        <div>
          <TextField
            variant="standard"
            label="Url"
            id="url"
            name="Url"
            required
            margin="normal"
            fullWidth
            {...url}
          />
        </div>

        <Button type="submit" variant="contained" style={{ marginTop: '20px' }}>
          Create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
