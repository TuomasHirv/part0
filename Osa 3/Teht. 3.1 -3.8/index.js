const cors = require('cors')
const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(cors())
app.use(express.json())
morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }

  return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
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
const amount = () => {
  return persons.length
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.get('/info', (request, response) => {
  const infoText = `
    <p>Phonebook has info for ${amount()} people</p>
    <p>${new Date().toString()}</p>
  `
  response.send(infoText)
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


app.post('/api/persons', (request, response) => {
  const person = request.body
  if(!person.name || !person.number){
    return response.status(400).json({ 
      error: 'name or number missing'
    })
  }
  const nameExists = persons.some(p => p.name === person.name);
  if (nameExists) {
        return response.status(400).json({ 
      error: 'name has to be unique'
    })
  }

  const numberExists = persons.some(p => p.number === person.number);
  if (numberExists) {
        return response.status(400).json({ 
      error: 'number has to be unique'
    })
  }
  
  const person_ = {
    id: Math.floor(Math.random() * 999999),
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