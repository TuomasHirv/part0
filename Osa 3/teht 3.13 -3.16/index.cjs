
require('dotenv').config()
const cors = require('cors')
const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const Person = require('./models/person.cjs')

let persons = [
]

let amount = persons.length
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(list => {
    response.json(list)
  })
})


app.get('/info', (request, response) => {
  response.send("<p> Phonebook has info for <p>" + amount)
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person =>{
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}


app.post('/api/persons', (request, response) => {
  const person = request.body
  console.log(request.body)
  if(!person.name){
    return response.status(400).json({ 
      error: 'name missing'+ request.body 
    })
  }
  if(!person.number){
    return response.status(400).json({ 
      error: 'number missing'+ request.body 
    })
  }

  const person_ = new Person({
    id: generateId(),
    name: person.name,
    number: person.number,
  })
  person_.save().then(result => {
    response.json(result)
    console.log(result, ' saved!')
  })
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}


app.use(errorHandler)

console.log(persons)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})