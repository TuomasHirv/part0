import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useStoreActions, useUsers } from '../BlogStore'

const Users = () => {
  const users = useUsers()
  const { getAllUsers } = useStoreActions()
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        await getAllUsers()
      } catch (fetchError) {
        console.error('Failed to load users', fetchError)
        setError('Failed to load users')
      }
    }

    loadUsers()
  }, [getAllUsers])

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h2>Users</h2>
      <table
        style={{
          width: '100%',
          maxWidth: '900px',
          fontSize: '1.1rem',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Username</th>
            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: '0.75rem' }}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>{' '}
              </td>
              <td style={{ padding: '0.75rem' }}>{user.username}</td>
              <td style={{ padding: '0.75rem' }}>
                {Array.isArray(user.blogs) ? user.blogs.length : 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
