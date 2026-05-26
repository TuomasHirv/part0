import { useState } from 'react';

const Blog = ({ blog, onLike, onDelete, userID }) => {

  const [minimized, setBlogMinimized] = useState(true)

  const minimal = { display: minimized ? '' : 'none' }
  const verbose = { display: minimized ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    border: 'solid',
    width: 'fit-content',
    borderWidth: 1,
    marginBottom: 5,
    fontSize: '1.25rem'
  }

  return (
    <div style={blogStyle}>
      {minimized ? (
        <div>
        {blog.title} {blog.author} <button onClick={() => setBlogMinimized(false)}> show </button>
        </div>
      ) : (
        <div>
          <p style={{ margin: 0 }}>Title: {blog.title} <button onClick={() => setBlogMinimized(true)}> hide </button></p>
          <p style={{ margin: 0 }}>URL: {blog.url}</p>
          <p style={{ margin: 0 }}>Likes: {blog.likes} <button onClick={() => onLike(blog.id)}> Like </button></p>
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