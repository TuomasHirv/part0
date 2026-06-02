import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from '../requests'
import { useNotify } from '../NotificationContext'

export const useAnecdotes = () => {
    const { createNotification } = useNotify()
    const queryClient = useQueryClient()

    const queryAnecdotes = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1
    })
    const voteAnecdoteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })
    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            createNotification("Succesfully created: "+variables.content)
        },
        onError: (error) => {
            console.log(error.message)
            createNotification(error.message)
        }
    })

    const create = (content) => {
        const uniqueId = String(Math.floor(Math.random() * 1000000))
        newAnecdoteMutation.mutate({ content, id: uniqueId, votes: 0 })
    }

    const handleVote = (anecdote) => {
        voteAnecdoteMutation.mutate(anecdote)
    }

    return {
        anecdotes: queryAnecdotes.data ?? [],
        isPending: queryAnecdotes.isPending,
        isError: queryAnecdotes.isError,
        vote: handleVote,
        create: create,
    }
}