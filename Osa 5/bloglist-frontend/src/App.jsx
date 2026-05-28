import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import { styled, Stack, Box } from '@mui/system';

import Button from '@mui/material/Button';

import Notification from './components/Message'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogCreateForm'
import Togglable from './components/Togglable'
import Navbar from './components/Navbar'
import blogService from './services/blogs'
import loginService from './services/login'

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  ...theme.applyStyles('dark', {
    backgroundColor: '#262B32',
  }),
}));



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogDetailsId, setBlogDetailsId] = useState('')
  const navigate = useNavigate()


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
      navigate('/')
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
      await blogService.like(id, updatedBlog.likes)
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
      navigate('/')
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
        await blogService.remove(id)

        const updatedList = blogs.filter(blog => blog.id !== id)
        setBlogs(updatedList)

        setErrorMessage({
          content: 'Deleted Blog',
          type: 'notification'
        })
        navigate('/')
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
  const padding = {
    padding: 5
  }

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <Stack>
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          <div>
            <h2>blogs</h2>
            {user != null  ? (
              <p>Logged in as: {user?.name}</p>
            ) : (
              null
            )}
            
            <Notification message={errorMessage} />
            
                {blogs.map(blog =>
                <Box sx={{ width: '30%', border: 1 }}>
                  <Stack spacing={2}>
                    <Item> <Blog key={blog.id} blog={blog} onLike={handleLike} onDelete={handleDelete} userID={user?.user}/> </Item>
                  </Stack>
                </Box>
                )}

          </div>
        } />
        <Route path="/create" element={
          <div>
            <h2>create new</h2>
            {user != null ? (
              <p>Logged in as: {user?.name}</p>
            ) : (
              null
            )}
            <Notification message={errorMessage} />
            <BlogForm createBlog={addBlog}/>
          </div>
        } />
        <Route path="/login" element={
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
        } />
        <Route path="/blogs/:id" element={
          <div>
            <BlogDetails blog={blog} onLike={handleLike} onDelete={handleDelete} userID={user?.user}/>
          </div>
        } />
      </Routes>
    </div>
    </Stack>
  )
}

export default App