import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, onLike, onDelete, userID }) => {
    const [minimized, setBlogMinimized] = useState(true)

    const minimal = { display: minimized ? '' : 'none' }
    const verbose = { display: minimized ? 'none' : '' }

    return (
        <div className="blog-card" data-testid="blog-card">
            <div>
                <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>{' '}
                {blog.author}
            </div>
        </div>
    )
}

export default Blog
