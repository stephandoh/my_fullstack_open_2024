const express = require('express')
const app = express()

app.use(express.json())
 

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//API end point to return message on homepage
app.get('/', (request, response) => {
  response.send('<h1>Welcome to persons API!</h1>')
})

//API end point to return all persons in array
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//API end point to show number of persons in array and current time
app.get('/info', (req, res) => {
  const count = persons.length
  const time = new Date().toString()

  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
  `)
})

//API endpoint to return specific person based on id
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

//API endpoint to delete a sungle phonebook entry
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

//API endpoint to add new persons
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Validate required fields
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // Generate a random id (large range to avoid collisions)
  const id = Math.floor(Math.random() * 1000000).toString()

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }

  // Add new person to the phonebook
  persons = persons.concat(person)

  // Return the created person
  response.status(201).json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
