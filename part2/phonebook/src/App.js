import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([

  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const removePersonHandler = ( id, name ) => {
    const confirmation = window.confirm(`Delete ${name} ?`)

    if (confirmation) {

    personsService
    .removePerson(id)
    .then()
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(p => p.name)

    if (names.includes(newName)) {
     
      // alert(`${newName} is already in the phonebook`)
      // setNewName('')
      const confirmation = window.confirm (`${newName} is already in the phonebook, replace the old number with a new one?`)

      if (confirmation) {
        const person = persons.find(p => p.name)
        const changedPerson = {...person, number:newNumber}

        personsService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p: returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(
            `the person cannot be found in phonebook!`
          )
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
    }
    else if (newName === '') {
      alert('You must enter a name!')
    }
    else if (newNumber === '') {
      alert('You must enter a number!')
    }
    else {
    // setPersons(persons.concat(personObject))
    // setNewName('')
    // setNewNumber('')

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
      newFilter = {newFilter}
      removePersonHandler = {removePersonHandler}/>
    </div>
  )
}

export default App
