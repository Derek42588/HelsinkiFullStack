import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    const names = persons.map(p => p.name)

    if (names.includes(newName)) {
      alert(`${newName} is already in the phonebook`)
      setNewName('')
    }
    else {
    setPersons(persons.concat(personObject))
    setNewName('')
    }
  }

  const rows = () => persons.map( person => 
    <li key = {person.name}>{person.name}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
        <div>
          name: 
          <input
          value = {newName} 
          onChange = {handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

export default App
