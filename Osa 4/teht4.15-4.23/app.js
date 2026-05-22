const express = require('express')
const app = express()
const cors = require('cors')

const config = require('./utils/config.js')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

const blogRouter = require('./controllers/blogRouter.js')
const userRouter = require('./controllers/userRouter.js')
const loginRouter = require('./controllers/loginRouter.js')
const middleware = require('./middleware.js')

app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)

module.exports = app
