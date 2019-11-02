import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([

  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

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

  
 

  return (
    <div>
      <h2>Phonebook</h2>
     <Filter 
      newFilter = {newFilter}
      handleFilterChange = {handleFilterChange}
     />
      <h3>add a new</h3>

      <PersonForm 
        addPerson = {addPerson}
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />
        
      <h2>Numbers</h2>
      <Persons 
      persons = {persons}
      newFilter = {newFilter}/>
    </div>
  )
}

export default App
