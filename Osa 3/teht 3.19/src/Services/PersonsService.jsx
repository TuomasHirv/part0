import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'
const getAll = () => {
    return axios.get(baseUrl)
  }
  const headers = {
    'content-type': 'multipart/form-data'
}

  const create = newObject => {
    console.log(newObject)
    const liittyjä = 
    {
      id : 0,
      name : String(newObject.name),
      number : String(newObject.number)
    }
    console.log("liittyjä", liittyjä)
    return axios.post(baseUrl, {
      "id" : 6,
      "name": liittyjä.name,
      "number": liittyjä.number
  }).catch(error => {console.log(error.response)})
  }
  
  const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }
  const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }

export default  {
    getAll,
    create,
    update,
    del
}