import React from 'react'

const Person = ({person, removePersonHandler}) => {
    return (
    <li> {person.name} {person.number} <button onClick = {removePersonHandler}>delete</button></li>
    )

}


const Persons = (props) => {

    const personsToShow = (props.newFilter === '')
? props.persons
: props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))

const rows = () => personsToShow.map( person => 
  <Person key = {person.name} person = {person} removePersonHandler = {() => props.removePersonHandler(person.id, person.name)} />
  )

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Persons