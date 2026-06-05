import { useField, useAnecdotes } from '../hooks/index'
import { useNavigate } from 'react-router-dom'

const CreateNew = () => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const { addAnecdote } = useAnecdotes()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    await addAnecdote(data)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={() => {content.onReset(); author.onReset(); info.onReset();}}>reset</button>
    </div>
  )
}

export default CreateNew
