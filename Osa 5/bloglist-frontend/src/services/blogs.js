import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch (error) {
    console.log('Couldnt save blog', error.data)

    throw error
  }
}


const like = async (id, likes) => {
  try {
    await axios.put(baseUrl+'/'+id.toString(), likes+1)
  } catch (error) {
    console.log('Couldnt like blog', error.data)

    throw error
  }
}

const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token }
    }

    await axios.delete(baseUrl+'/'+id.toString(), config)
  } catch (error) {
    console.log('Couldnt delete blog', error.data)

    throw error
  }
}
export default { getAll, create, setToken, like, remove}