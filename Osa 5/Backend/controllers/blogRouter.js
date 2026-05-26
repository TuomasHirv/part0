const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', {username: 1, id: 1})

  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body
    if (!request.token) {
      return response.status(401).json({ error: 'no token' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'not authorized' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(404).json({ error: 'No user found' })
    }
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id
    })
    try {
      const result = await blog.save()

      user.blogs = user.blogs ? 
        user.blogs.concat(result.id)
        : [result.id]

      await user.save()
      const populatedBlog = await result.populate('user')

      response.status(201).json(populatedBlog)
    }catch (error) {
      if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message})
      } else {
        response.status(500).json({ error: error.message})
      }
    }
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

    if (!request.token) {
      return response.status(401).json({ error: 'no token' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'no id' })
    }
  try {
    const result = await Blog.findById(id)
    if (!result) {
      return response.status(404).json({ error: 'Not found'})
    }
    if (!result.user || result.user.toString() != decodedToken.id.toString()) {
      return response.status(401).json({ error: "not authorized" })
    }
    const done = await Blog.deleteOne({ _id:id })
    return response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: error})
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes: likes },
  )
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).json({ error: 'not found' })
  }
})
module.exports = blogRouter