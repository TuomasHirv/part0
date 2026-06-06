import { create } from 'zustand'

import blogService from './services/blogs'
import loginService from './services/login'
import commentService from './services/comments'
import persistentUser from './services/persistentUser'
const useBlogStore = create((set, get) => ({
  blogs: [],
  users: [],
  user: null,
  notification: '',
  notificationType: '',
  timeOutId: null,
  actions: {
    initialize: async () => {
      const initialBlogs = await blogService.getAll()
      set(() => ({ blogs: initialBlogs }))
      const allUsers = await loginService.getAllUsers()
      set(() => ({ users: allUsers }))
    },
    getAllUsers: async () => {
      const allUsers = await loginService.getAllUsers()
      set(() => ({ users: allUsers }))
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
      persistentUser.setUser(loggedUser)
    },
    checkExistingSession: () => {
      const loggedUserJSON = persistentUser.getUser()
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        set(() => ({ user: loggedUser }))
        blogService.setToken(loggedUser.token)
      }
    },
    logoutUser: () => {
      persistentUser.removeUser()
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
    createComment: async (id, text) => {
      console.log('sent')
      return commentService.addComment(id, text)
    },
  },
}))

export default useBlogStore

export const useBlogs = () => useBlogStore((state) => state.blogs)

export const useUsers = () => useBlogStore((state) => state.users)

export const useUser = () => useBlogStore((state) => state.user)

export const useStoreActions = () => useBlogStore((state) => state.actions)

export const useNotification = () => useBlogStore((state) => state.notification)

export const useNotificationType = () =>
  useBlogStore((state) => state.notificationType)
