import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage] = useState(null)
  const [ messageType, setMessageType] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

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
    .then(() => {
      setMessageType('success')
      setMessage(
          `Removed ${name} from phonebook`
        )
      setTimeout(() => {
            setMessage(null)
        }, 5000)
      setPersons(persons.filter(p => p.id !== id))
      setNewName('')
      setNewNumber('')

    })
    .catch(error => {
      setMessage(`Information of ${name} has already been removed from server`)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
    }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })
    
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
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number:newNumber}

        personsService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setMessageType('success')
          setMessage(
          `Changed ${changedPerson.name}'s number to ${changedPerson.number}`
        )
          setTimeout(() => {
            setMessage(null)
        }, 5000)
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
            setMessage(`Information of ${changedPerson.name} has already been removed from server`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== changedPerson.name))
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
        setMessageType('success')
        setMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} messageType = {messageType}/>

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
