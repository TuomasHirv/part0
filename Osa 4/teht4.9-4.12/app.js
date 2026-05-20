const express = require('express')
const app = express()
const cors = require('cors')

const config = require('./utils/config.js')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
const blogRouter = require('./controllers/blogRouter.js')
app.use('/api/blogs', blogRouter)

module.exports = app
