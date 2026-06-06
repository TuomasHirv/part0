import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { useUser, useStoreActions } from '../BlogStore'
const NavBar = () => {
  const navigate = useNavigate()
  const user = useUser()
  const { logoutUser, setNotification } = useStoreActions()
  const handleLogout = () => {
    logoutUser()
    setNotification('Logged out', 'notification')
    navigate('/')
  }
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          BlogApp
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button component={Link} to="/" color="inherit">
            home
          </Button>

          <Button component={Link} to="/users" color="inherit">
            users
          </Button>

          {user !== null && (
            <Button component={Link} to="/create" color="inherit">
              new blog
            </Button>
          )}

          {user === null ? (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="primary"
              size="small"
            >
              login
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleLogout}
            >
              Log out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
