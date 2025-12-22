const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Morgan logging
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// In-memory persons data
let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

// Root endpoint
app.get('/', (req, res) => {
  res.send('<h1>Welcome to persons API!</h1>')
})

// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Info endpoint
app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `)
})

// Get one person by id
app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)
  if (person) res.json(person)
  else res.status(404).json({ error: 'person not found' })
})

// Add new person
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'name or number is missing' })
  }

  if (persons.find(p => p.name === name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const id = Math.floor(Math.random() * 1000000).toString()
  const person = { id, name, number }

  persons = persons.concat(person)
  res.status(201).json(person)
})

// Delete person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

// Update person (for toggleFavorite / future updates)
app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (!person) return res.status(404).json({ error: 'person not found' })

  const updatedPerson = { ...person, ...req.body }
  persons = persons.map(p => (p.id !== id ? p : updatedPerson))
  res.json(updatedPerson)
})

// Unknown endpoint handler
app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
