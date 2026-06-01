const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await response.json()
}

const createNew = async (content) => {
    const newId = getId()
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ content: content, id: newId, votes: 0 })
    }
    const response = await fetch(baseUrl, options)

    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}

const vote = async (id, anecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(anecdote)
    }
    const response = await fetch(`${baseUrl}/${id}`, options)

    if (!response.ok) {
        throw new Error('Failed to update anecdote')
    }

    return await response.json()
}

const deleteById = async (id) => {
    const options = {
        method: 'DELETE',
    }
    const response = await fetch(`${baseUrl}/${id}`, options)

    if (!response.ok) {
        throw new Error('Failed to update anecdote')
    }

    return null
}


export default { getAll, createNew, vote, deleteById }