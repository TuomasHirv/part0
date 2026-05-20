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

module.exports = blogRouter