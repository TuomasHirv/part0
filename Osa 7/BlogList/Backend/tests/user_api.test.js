const assert = require('node:assert')
const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})
})

after(async () => {
    await mongoose.connection.close();
});

const postUser = (userData) => {
    return api
        .post('/api/user')
        .send(userData)
}

describe('user creation', () => {

    test('create a user', async () => {
        const newUser = {
            username: 'test user',
            name: 'tester',
            password: 'testPassword'
        }

        const response = await postUser(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        assert.ok('id' in response.body)
        assert.ok(!('passwordHash' in response.body))
    })

    test('no duplicate usernames', async () => {
        const newUser = {
            username: 'test user',
            name: 'tester',
            password: 'testPassword'
        }
        
        const response =  await postUser(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        const duplicateUsername = {
            username: 'test user',
            name: 'duplicate',
            password: 'wasdasd'
        }

        const failedResponse = await postUser(duplicateUsername)
            .expect(400)
        
        assert.deepStrictEqual(failedResponse.body.errors, ['Username is taken'])
    })

    test('short password not allowed', async () => {
        const shortPassword = {
            username: 'test user',
            name: 'tester',
            password: 'te'
        }

        const failedResponse = await postUser(shortPassword)
            .expect(400)
        
        assert.deepStrictEqual(failedResponse.body.errors, ['Password must be atleast 3 characters'])
    })

    test('name and username required', async () => {
        const missingFields = {
            password: 'testPassword'
        }

        const failedResponse = await postUser(missingFields)
            .expect(400)

        assert.deepStrictEqual(failedResponse.body.errors, ['Username required', 'Name required'])
    })
})