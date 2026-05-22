const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')


blogRouter.get('/', (request, response, next) => {
    
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log(blog)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
    })
    .catch((error) => {if (error.name === 'ValidationError') {
      response.status(400).json({ error: error.message})
    } else {
      response.status(500).json({ error: error.message})
    }})
})

blogRouter.delete('/:id', (request, response) => {
  const id = request.params.id

  Blog.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        response.status(204).json(result)
      } else {
        response.status(404).json({ error: 'Not found'})
      }
    })
    .catch(error => {
      response.status(400).json({ error: error})
    })
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likes: likes},
    { new: true }
  )
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).json({ error: 'not found' })
  }
})
module.exports = blogRouter