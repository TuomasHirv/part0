import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote, setNotification, deleteById } = useAnecdoteActions()
    const handleVote = (anecdote) => {
        try {
            vote(anecdote.id)
            setNotification('You voted on: '+ anecdote.content)
        } catch (error) {
            console.log("Error when voting", error)
            setNotification('Error when voting')
        }
    }
    const handleDelete = (anecdote) => {
        try {
            deleteById(anecdote.id)
            setNotification('You deleted: '+ anecdote.content)
        } catch (error) {
            console.log("Error when deleting", error)
            setNotification('Error when deleting')
        }
    }
    

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                    {anecdote.votes == 0 && (
                        <button onClick={() => handleDelete(anecdote)}>delete</button>
                    )}
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList