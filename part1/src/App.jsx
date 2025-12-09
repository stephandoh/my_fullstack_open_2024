import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {alert(`${newName} is already added to phonebook`) 
      return
    }

    const personObject = {name: newName, number: newPhone}

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
         <div>
          number: <input value = {newPhone} onChange = {handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} - {person.number}</li>
        ))} 
      </ul>
    </div>
  )
}

export default App