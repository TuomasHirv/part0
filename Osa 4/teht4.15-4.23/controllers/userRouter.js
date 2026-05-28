const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')


userRouter.post('/', async (request, response) => {
    try {
        const {username, name, password} = request.body
        if (!password || password.length < 3) {
            return response.status(400).json({ errors: ['Password must be atleast 3 characters'] })
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return response.status(400).json({ errors: errorMessages })
        }
        if (error.code === 11000) {
            return response.status(400).json({ errors: ['Username is taken']})
        }
    }
})


userRouter.get('/', async (request, response) => {
    const users = await User.find({})
        .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})

    
    return response.json(users)
})
module.exports = userRouter