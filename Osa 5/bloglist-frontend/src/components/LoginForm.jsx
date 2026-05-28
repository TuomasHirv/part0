import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginForm = (props) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={props.handleLogin}>
                <div>
                    <TextField
                        variant="standard"
                        label="username"
                        type="text"
                        value={props.username}
                        onChange={props.handleUsernameChange}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        variant="standard"
                        label="password"
                        type="password"
                        value={props.password}
                        onChange={props.handlePasswordChange}
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