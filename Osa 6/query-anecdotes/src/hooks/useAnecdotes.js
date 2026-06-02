import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from '../requests'

export const useAnecdotes = () => {
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
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
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