import { useState, useEffect } from 'react'
import personsService from './services/persons' 
import Notification from './Notification'  
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  const notify = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 3000)
  }

  // Fetch persons once
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(err => {
        console.error("Failed to fetch persons:", err)
        alert("Could not fetch phonebook data from server")
      })
  }, [])

  // Add or update person
  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook. Replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            notify(`Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`, "update")
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            console.error("Failed to update number:", err)
            notify(`Could not update ${existingPerson.name}. They may have been removed.`, "error")
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })

        return
      }
      return
    }

    // If name does NOT exist → normal create
    const newPersonObject = { name: newName, number: newNumber, favorite: false }

    personsService
      .create(newPersonObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notify(`Added ${returnedPerson.name} (${returnedPerson.number})`, "success")
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        console.error("Failed to add person:", err)
        notify("Could not add person. Try again later.", "error")
      })
  }

  // Toggle favorite
  const toggleFavorite = (id) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, favorite: !person.favorite }

    personsService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
      })
      .catch(err => {
        console.error("Failed to update person:", err)
        notify(`${updatedPerson.name} could not be updated. It might have been removed.`, "error")
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  // Delete person
const deletePerson = (id) => {
  const person = persons.find(p => p.id === id)

  if (window.confirm(`Delete ${person.name}?`)) {
    personsService
      .remove(id)
      .then(() => {
        // Remove person from state
        setPersons(persons.filter(p => p.id !== id))
        // Show success notification
        notify(`${person.name} has been deleted`, "delete")
      })
      .catch(err => {
        console.error("Failed to delete person:", err)
        // Show error notification
        notify(`${person.name} was already removed from the server.`, "error")
        setPersons(persons.filter(p => p.id !== id))
      })
  }
}


  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <ul>
        {persons.map(person => (
          <li className='note' key={person.id}>
            {person.name} — {person.number}

            <button onClick={() => toggleFavorite(person.id)}>
              {person.favorite ? 'Unfavorite' : 'Favorite'}
            </button>

            <button onClick={() => deletePerson(person.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
