import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogCreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Message'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState({
    content: null,
    type: false
  })
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        content: 'Couldnt save blog:',
        type: 'alert'
      })
      setTimeout(() => setErrorMessage(null), 2000)
    }
  }

  if (user == null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
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
        <BlogForm createBlog={addBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App