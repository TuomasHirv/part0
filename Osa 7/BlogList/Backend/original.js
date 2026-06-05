const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog.js')
const config = require('./utils/config.js')
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
const blogRouter = require('./controllers/blogRouter.js')
app.use('/api/blogs', blogRouter)

/**app.get('/api/blogs', (request, response) => {
    
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log(blog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})