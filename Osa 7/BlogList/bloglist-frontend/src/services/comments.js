import axios from 'axios'
const baseUrl = '/api/blogs'

const addComment = async (id, content) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/comment`, { content })
    return response.data
  } catch (error) {
    console.log('Couldnt save comment', error.data)

    throw error
  }
}

export default { addComment }
