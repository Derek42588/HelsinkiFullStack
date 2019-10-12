import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(p => p.name)

    if (names.includes(newName)) {
      alert(`${newName} is already in the phonebook`)
      setNewName('')
    }
    else if (newName === '') {
      alert('You must enter a name!')
    }
    else if (newNumber === '') {
      alert('You must enter a number!')
    }
    else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const personsToShow = (newFilter === '')
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  const rows = () => personsToShow.map( person => 
    <li key = {person.name}>{person.name} {person.number}</li>)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
          value = {newFilter}
          onChange = {handleFilterChange}
          />
      </div>
      <form onSubmit = {addPerson}>
        <h2>add a new</h2>
        <div>
          name: 
          <input
          value = {newName} 
          onChange = {handleNameChange}
          />
        </div>
        <div>
          number: 
          <input
          value = {newNumber} 
          onChange = {handleNumberChange}
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
