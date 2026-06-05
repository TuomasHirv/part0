import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useStoreActions } from '../BlogStore'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const navigate = useNavigate()
    const { loginUser } = useStoreActions()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = (e) => {
        e.preventDefault()
        loginUser(username, password)
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
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        variant="standard"
                        label="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        fullWidth
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
