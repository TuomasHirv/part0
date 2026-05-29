import { useAnecdoteActions } from '../store'


const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()
    const handlesubmit = (event) => {
        event.preventDefault()

        const content = event.target.content.value

        add(content)
        event.target.content.value = ''
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