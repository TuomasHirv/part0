import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        createBlog({ title, author, url })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        variant="standard"
                        label="Title"
                        id="title"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        required
                        margin="normal"
                        fullWidth
                    />
                </div>

                <div>
                    <TextField
                        variant="standard"
                        label="Author"
                        id="author"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        required
                        margin="normal"
                        fullWidth
                    />
                </div>

                <div>
                    <TextField
                        variant="standard"
                        label="Url"
                        id="url"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        required
                        margin="normal"
                        fullWidth
                    />
                </div>
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    style={{ marginTop: '20px' }}
                >
                    Create
                </Button>
            </form>
        </div>
    )
}

export default BlogForm