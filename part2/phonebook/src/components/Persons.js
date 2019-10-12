import React from 'react'

const Person = ({person}) => {
    return (
    <li> {person.name} {person.number}</li>
    )

}


const Persons = (props) => {

    const personsToShow = (props.newFilter === '')
? props.persons
: props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))

const rows = () => personsToShow.map( person => 
  <Person key = {person.name} person = {person} />
  )

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Persons