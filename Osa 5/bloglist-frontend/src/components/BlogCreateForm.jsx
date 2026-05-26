import { useState } from 'react'

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
                    <label htmlFor="title"> Title: </label>
                    <input
                    id="title"
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                    required
                    />
                </div>

                <div>
                    <label htmlFor="author"> Author: </label>
                    <input
                    id="author"
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                    required
                    />
                </div>

                <div>
                    <label htmlFor="url"> Url: </label>
                    <input
                    id="url"
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                    required
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm