const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title: "Test title 1",
    author: "Test user",
    url: "https://fullstackopen.com",
    likes: 0,
  },
  {
    title: "Really useful blog",
    author: "Second user",
    url: "https://www.youtube.com/",
    likes: 5,
  },
]

const newUser = {
    username: 'Test user',
    name: 'tester',
    password: 'testPassword'
}
let token

const postBlog = (blogData, authorization) => {
    return api.post('/api/blogs')
            .set('Authorization', `Bearer ${authorization}`)
            .send(blogData)
            .expect(201)
}


beforeEach(async () => {
    await blog.deleteMany({})
    await User.deleteMany({})
    await api.post('/api/user')
            .send(newUser)
            .expect(201)
    const loginToken = await api.post('/api/login')
            .send({username: newUser.username, password: newUser.password})
            .expect(200)
    token = loginToken.body.token
    await postBlog(initialBlogs[0], token)
    await postBlog(initialBlogs[1], token)
})

after(async () => {
  await mongoose.connection.close()
})


test('blogs are returned correctly', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs have a valid id', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    response.body.forEach(res => {
        assert.ok(res.id)
        assert.ok(!('_id' in res))
    })
})

test('blogs can be added', async () => {
    const newBlog = {
        title: "new blog",
        author: "in test",
        url: "http://localhost:3003/",
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    assert(titles.includes('new blog'))
})

test('likes defaults to 0', async () => {
    const newBlog = {
        title: "like test",
        author: "in test",
        url: "http://localhost:3003/",
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const testable = response.body.find(b => b.title === 'like test')

    assert.strictEqual(testable.likes, 0)
})

test('missing title results in status 400', async () => {
    const newBlog = {
        author: "in test",
        url: "http://localhost:3003/",
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)


    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs can be deleted', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const startingLength = response.body.length
    const ids = response.body.map(r => r.id)
    await api
        .delete(`/api/blogs/${ids[0]}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)


    const secondResponse = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(startingLength, secondResponse.body.length + 1)

    const updatedIds = secondResponse.body.map(r => r.id)

    assert.ok(!(updatedIds.includes(ids[0])))
})

test('likes can be updated', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const ids = response.body.map(r => r.id)
    const likes = response.body.map(r => r.likes)

    await api
        .put(`/api/blogs/${ids[0]}`)
        .send({ likes:likes[0]+1 })
    
    const updated = await blog.findById(ids[0])

    assert.strictEqual(updated.likes, likes[0] + 1)
})

test('returned blogs are populated', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    console.log('FIRST BLOG IS THIS', response.body[0])
    assert.ok(response.body[0].user && 'username' in response.body[0].user && 'id' in response.body[0].user)
})