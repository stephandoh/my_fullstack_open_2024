import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('fetching persons...')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('data received!')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} — {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
