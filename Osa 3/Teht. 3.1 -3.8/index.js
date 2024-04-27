const cors = require('cors')
const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(cors())
app.use(express.json())
const http = require('http')

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "3923-1231545276"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-231521"
  },
  {
    id: 4,
    name: "Mary poppendick",
    number: "39-23-6423122"
  }
]
let amount = persons.length
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.get('/info', (request, response) => {
  response.send("<p> Phonebook has info for <p>" + amount)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person_ = persons.find(person => person.id === id)
  if (person_) {
    response.json(person_)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
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
  const person_ = {
    id: generateId(),
    name: person.name,
    number: person.number,
  }
  persons = persons.concat(person_)
  response.json(person_)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})