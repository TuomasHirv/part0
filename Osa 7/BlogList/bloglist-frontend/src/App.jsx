import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import { styled, Stack, Box } from '@mui/system'

import Notification from './components/Message'
import BlogDetails from './components/BlogDetails'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogCreateForm'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import BlogList from './components/BlogList'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import {
  useBlogs,
  useUser,
  useNotification,
  useStoreActions,
} from './BlogStore'

const App = () => {
  const { initialize, checkExistingSession } = useStoreActions()
  const blogs = useBlogs()
  const user = useUser()

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    checkExistingSession()
  }, [])

  return (
    <Stack>
      <div>
        <NavBar />
        <Notification message={useNotification()} />
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <h2>blogs</h2>
                {user != null ? <p>Logged in as: {user?.name}</p> : null}
                <BlogList />
              </ErrorBoundary>
            }
          />
          <Route
            path="/users"
            element={
              <ErrorBoundary>
                <Users />
              </ErrorBoundary>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ErrorBoundary>
                <UserDetails />
              </ErrorBoundary>
            }
          />
          <Route
            path="/create"
            element={
              <ErrorBoundary>
                <h2>create new</h2>
                {user != null ? <p>Logged in as: {user?.name}</p> : null}
                <BlogForm />
              </ErrorBoundary>
            }
          />
          <Route
            path="/login"
            element={
              <ErrorBoundary>
                <LoginForm />
              </ErrorBoundary>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ErrorBoundary>
                <BlogDetails />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Stack>
  )
}

export default App
