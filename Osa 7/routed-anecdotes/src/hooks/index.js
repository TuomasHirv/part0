import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])
    useEffect(() => {
        const fetchAnecdotes = async () => {
            try {
                const data = await anecdoteService.getAll()
                setAnecdotes(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchAnecdotes();
    }, [])
    
    const addAnecdote = async (details) => {
        const fullAnecdote = {
            ...details,
            votes: 0,
        }
        try {
            const response = await anecdoteService.createNew(fullAnecdote)
            setAnecdotes(prevAnecdotes => prevAnecdotes.concat(response))
        } catch (error) {
            console.log(error.message)
        }
    }

    const deleteAnecdote = async (id) => {
        try {
            await anecdoteService.deleteById(id)
            setAnecdotes(prevAnecdotes => prevAnecdotes.filter(anecdote => anecdote.id.toString() !== id.toString()))
        } catch (error) {
            console.log(error.message)
        }
    }
    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    };
}