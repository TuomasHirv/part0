import { create } from 'zustand'

import blogService from './services/blogs'
import loginService from './services/login'

const useBlogStore = create((set, get) => ({
  blogs: [],
  user: null,
  notification: '',
  notificationType: '',
  timeOutId: null,
  actions: {
    initialize: async () => {
      const initialBlogs = await blogService.getAll()
      set(() => ({ blogs: initialBlogs }))
    },
    deleteBlog: async (id) => {
      try {
        await blogService.remove(id)
        set((state) => ({
          blogs: state.blogs.filter((b) => b.id !== id),
        }))
      } catch (error) {
        console.error('Delete failed:', error)
      }
    },
    likeBlog: async (id) => {
      try {
        const blogToUpdate = get().blogs.find((b) => b.id === id)
        const updatedBlog = {
          ...blogToUpdate,
          likes: blogToUpdate.likes + 1,
        }
        await blogService.like(id, updatedBlog.likes)

        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id === id ? updatedBlog : blog
          ),
        }))
      } catch (error) {
        console.error('Like failed:', error)
      }
    },
    createBlog: async (blog) => {
      try {
        blogService.setToken(get().user.token)
        const returnedBlog = await blogService.create(blog)

        set((state) => ({ blogs: state.blogs.concat(returnedBlog) }))
      } catch (error) {
        console.error('Creating failed:', error)
      }
    },
    loginUser: async (username, password) => {
      const loggedUser = await loginService.login({ username, password })
      set(() => ({ used: loggedUser }))

      blogService.setToken(loggedUser.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    },
    checkExistingSession: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        set(() => ({ user: loggedUser }))
        blogService.setToken(loggedUser.token)
      }
    },
    logoutUser: () => {
      window.localStorage.clear()
      set(() => ({ used: null }))
    },
    setNotification: (value, type) => {
      const preExisting = get().timeOutId
      if (preExisting) {
        clearTimeout(preExisting)
      }
      set(() => ({ notification: value }))
      set(() => ({ notificationType: type }))
      const newTimeOut = setTimeout(() => {
        set({ notification: '' })
        set(() => ({ notificationType: '' }))
      }, 5000)
      set({ timeoutId: newTimeOut })
    },
  },
}))

export default useBlogStore

export const useBlogs = () => useBlogStore((state) => state.blogs)

export const useUser = () => useBlogStore((state) => state.user)

export const useStoreActions = () => useBlogStore((state) => state.actions)

export const useNotification = () => useBlogStore((state) => state.notification)

export const useNotificationType = () =>
  useBlogStore((state) => state.notificationType)
