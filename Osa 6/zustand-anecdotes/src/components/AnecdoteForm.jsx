import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
    const { add, setNotification } = useAnecdoteActions()
    const handlesubmit = async (event) => {
        event.preventDefault()

        const content = event.target.content.value
        try {
            add(content)
            event.target.content.value = ''
            setNotification('You added: '+ content)
        } catch (error) {
            console.log("Error when creating anecdote:", error)
            setNotification('Failed to create anecdote')
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handlesubmit}>
                <input type="text" id="content"/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm