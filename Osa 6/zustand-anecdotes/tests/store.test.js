import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import AnecdoteList from '../src/components/AnecdoteList'

vi.mock('../src/services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    vote: vi.fn(),
  }
}))

import anecdoteService from '../src/services/anecdotes'
import useAnecdoteStore, { useNotification, useAnecdotes, useAnecdoteActions, useFilter } from '../src/store'

beforeEach(() => {
  useAnecdoteStore.setState({ notes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
    it('initialize loads notes from service', async () => {
        const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0}]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(mockAnecdotes)
    })

    it('anecdotes are given sorted', async () => {
    const mockAnecdotes = [
        { id: 1, content: 'Test', votes: 0 },
        { id: 2, content: 'Test', votes: 3 },
        { id: 3, content: 'Test', votes: 2 },
        { id: 4, content: 'Test', votes: 5 },
    ]

    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: '' })


    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    
    expect(anecdotesResult.current).toEqual([
        { id: 4, content: 'Test', votes: 5 },
        { id: 2, content: 'Test', votes: 3 },
        { id: 3, content: 'Test', votes: 2 },
        { id: 1, content: 'Test', votes: 0 },
    ])
    })

    it('filter works', () => {
        const mockAnecdotes = [
          { id: '1', content: 'React', votes: 0 },
          { id: '2', content: 'Zustand', votes: 0 },
          { id: '3', content: 'Redux', votes: 0 }
        ]

        useAnecdoteStore.setState({ 
          anecdotes: mockAnecdotes, 
          filter: 'STand' 
        })

        const { result } = renderHook(() => useAnecdotes())

        expect(result.current).toEqual([
            { id: '2', content: 'Zustand', votes: 0 }
        ])

        expect(result.current).toHaveLength(1)
    })


    it('increases the vote count of the correct anecdote', async () => {
        const mockAnecdotes = [
          { id: '1', content: 'Zustand', votes: 0 },
        ]
        useAnecdoteStore.setState({ anecdotes: mockAnecdotes })
        const updated = { id: '1', content: 'Zustand', votes: 1 }
        anecdoteService.vote.mockResolvedValue(updated)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.vote('1')
        })

        const currentAnecdotes = useAnecdoteStore.getState().anecdotes
        console.log(currentAnecdotes)
        expect(currentAnecdotes[0].votes).toBe(1)
    })
})