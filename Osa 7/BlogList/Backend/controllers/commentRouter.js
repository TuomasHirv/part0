const commentRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user')
const Comment = require('../models/comment.js')
const jwt = require('jsonwebtoken')

commentRouter.post('/:id/comment', async (request, response) => {
  const id = request.params.id
  const { content } = request.body
  const hostBlog = await Blog.findById(id)
  if (!hostBlog) {
    return response.status(404).json({ error: 'Failed to find blog' })
  }
  const comment = new Comment({
    content: content,
    blog: hostBlog.id,
  })
  try {
    const result = await comment.save()
    hostBlog.comments = hostBlog.comments
      ? hostBlog.comments.concat(result.id)
      : [result.id]
    await hostBlog.save()
    response.status(201).json(result)
  } catch (error) {
    if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message })
    } else {
      response.status(500).json({ error: error.message })
    }
  }
})
