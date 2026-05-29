import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

import { useAnecdotes, useAnecdoteActions } from './store'

const App = () => {
  return (
    <div>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App