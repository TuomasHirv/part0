import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    console.log('Login call failed', error.response.data)

    throw error
  }
}

const getAllUsers = async () => {
  try {
    const response = await axios.get('/api/user')
    return response.data
  } catch (error) {
    console.log('failed to get all users', error.response.data)

    throw error
  }
}
export default { login, getAllUsers }
