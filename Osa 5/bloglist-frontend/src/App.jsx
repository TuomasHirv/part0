import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogCreateForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Message'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const [errorMessage, setErrorMessage] = useState({
    content: null,
    type: false
  })
  useEffect( () => {
    const blogsAsyncFunc = async () => {
      const blogsList = await blogService.getAll()

      const sortedBlogsList = [...blogsList].sort((a, b) => b.likes - a.likes)

      setBlogs(sortedBlogsList)
    }
    blogsAsyncFunc()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
    } catch (error) {
      console.log("Error couldn't login", error)
      setErrorMessage({
        content: 'Wrong username or password',
        type: 'alert'
      })
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }

  const handleLike = async (id) => {
    const blogToUpdate = blogs.find(b => b.id === id)

    try {
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      const response = await blogService.like(id, blogToUpdate.likes)
      const updatedList = blogs.map(blog => blog.id === id ? updatedBlog : blog)
      const sortedList = [...updatedList].sort((a, b) => b.likes - a.likes)

      setBlogs(sortedList)
    } catch (error) {
      console.error('Error liking blog: ', error)

      setErrorMessage({
        content: 'Couldnt like blog',
        type: 'alert'
      })
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setErrorMessage({
        content: 'Saved blog: '+ returnedBlog.title + '. Author: ' + returnedBlog.author,
        type: 'notification'
      })
      setTimeout(() => setErrorMessage(null), 2000)

    } catch (error) {
      console.error('Error creating blog: ', error)

      setErrorMessage({
        content: 'Couldnt save blog',
        type: 'alert'
      })
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }

  const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        blogService.setToken(user.token)
        const response = await blogService.remove(id)

        const updatedList = blogs.filter(blog => blog.id !== id)
        setBlogs(updatedList)

        setErrorMessage({
          content: 'Deleted Blog',
          type: 'notification'
        })

      } catch (error) {
        console.error('Error deleting blog: ', error)

      setErrorMessage({
          content: 'Couldnt delete blog',
          type: 'alert'
        })
        setTimeout(() => setErrorMessage(null), 2000)
      }
    }
  }

  if (user == null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <LoginForm
          username = { username }
          password = { password }
          handleUsernameChange = {({ target }) => setUsername(target.value)}
          handlePasswordChange = {({ target }) => setPassword(target.value)}
          handleLogin = {handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>Logged in as: {user.name}</p>
      <button onClick={handleLogout}>
        Log out
      </button>

      <h2>create new</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} onLike={handleLike} onDelete={handleDelete} userID={user?.user}/>
        )}
      </div>
    </div>
  )
}

export default App