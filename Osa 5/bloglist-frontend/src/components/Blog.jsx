import { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog, onLike, onDelete, userID }) => {

  const [minimized, setBlogMinimized] = useState(true)

  const minimal = { display: minimized ? '' : 'none' }
  const verbose = { display: minimized ? 'none' : '' }

  return (
    <div className="blog-card" data-testid="blog-card">
      {minimized ? (
        <div>
          <Link to={`/blogs/${blog.id}`}> {blog.title} </Link> {blog.author}
        </div>
      ) : (
        <div>
          <p style={{ margin: 0 }}> <Link to={`/blogs/${blog.id}`}>Title: {blog.title} </Link></p>
          <p style={{ margin: 0 }}>URL: {blog.url}</p>
          <p style={{ margin: 0 }}>Likes: {blog.likes} {userID != null && (<button onClick={() => onLike(blog.id)}> Like </button>)}</p>
          <p style={{ margin: 0 }}>Author: {blog.author}</p>
          {userID === blog.user?.id && (
          <button onClick={() => onDelete(blog.id)}> Delete </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog