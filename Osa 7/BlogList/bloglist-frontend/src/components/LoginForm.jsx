import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useStoreActions } from '../BlogStore'
import { useNavigate } from 'react-router-dom'
import { UseField } from '../hooks'

const LoginForm = () => {
    const navigate = useNavigate()
    const { loginUser } = useStoreActions()
    const { reset: resetUsername, ...username } = UseField('text')
    const { reset: resetPassword, ...password } = UseField('password')
    const handleLogin = (e) => {
        e.preventDefault()
        loginUser(username.value, password.value)
        resetUsername()
        resetPassword()
        navigate('/')
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <TextField
                        variant="standard"
                        label="username"
                        margin="normal"
                        fullWidth
                        {...username}
                    />
                </div>
                <div>
                    <TextField
                        variant="standard"
                        label="password"
                        margin="normal"
                        fullWidth
                        {...password}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: '20px' }}
                >
                    login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
