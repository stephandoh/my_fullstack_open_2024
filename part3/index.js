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

// Root endpoint
app.get('/', (req, res) => {
  res.send('<h1>Welcome to persons API!</h1>')
})

// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Get info: count + current time
app.get('/info', (req, res) => {
  const count = persons.length
  const time = new Date().toString()
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
  `)
})

// Get one person by id (optional but useful)
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// Add a new person (POST)
app.post('/api/persons', (req, res) => {
  const body = req.body

  // Validate required fields
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  // Check for duplicate name
  const nameExists = persons.find(p => p.name === body.name)
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  // Generate a random ID
  const id = Math.floor(Math.random() * 1000000).toString()

  const person = {
    id: id,
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.status(201).json(person)
})

// Delete a person by id
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

// Start the server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})