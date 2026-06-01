import { create } from 'zustand'

import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  notification: '',
  timeOutId: null,
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      try {
        const updated = await anecdoteService.vote(id, { ...anecdote, votes: anecdote.votes + 1 })
        set(state => ({
          anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
        }))
      } catch (error) {
        console.log('Error when voting:', error)
      }
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)

      set((state) => ({ anecdotes: [...state.anecdotes, newAnecdote] }))
    },
    deleteById: async (id) => {
      await anecdoteService.deleteById(id)

      set((state) => ({ 
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    setFilter: value => set(() => ({ filter: value })),
    setNotification: value => {
      const preExisting = useAnecdoteStore.getState().timeOutId
      if (preExisting) {
        clearTimeout(preExisting)
      }
      set(() => ({ notification: value}))

      const newTimeOut = setTimeout(() => {
        set({ notification: '' })
      }, 5000)
      set({ timeoutId: newTimeOut })
    },
    initialize: async () => {
      const initialAnecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: initialAnecdotes }))
    }
  },
}))

export default useAnecdoteStore

export const useNotification = () => useAnecdoteStore((state) => state.notification)

export const useAnecdotes = () => {
  const returnable = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter === '') {
    return returnable.toSorted((a, b) => b.votes - a.votes)
  }
  const filteredAnecdotes = returnable.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
  return filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
