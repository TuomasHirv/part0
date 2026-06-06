import { useParams } from 'react-router-dom'
import { useUsers, useStoreActions } from '../BlogStore'
import Typography from '@mui/material/Typography'
import { styled, Stack, Box } from '@mui/system'
import { Link } from 'react-router-dom'
const UserDetails = () => {
  const { id } = useParams()
  const users = useUsers()

  const currentUser = users.find((user) => user.id === id)
  if (!currentUser) {
    return (
      <Box>
        <Typography variant="h5">User</Typography>
        <Typography>User not found for id: {id}</Typography>
      </Box>
    )
  }

  return (
    <div>
      <h2>{currentUser.name}</h2>
      <p>added blogs</p>
      <li>
        {currentUser.blogs.map((blog) => (
          <p>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
          </p>
        ))}
      </li>
    </div>
  )
}

export default UserDetails
