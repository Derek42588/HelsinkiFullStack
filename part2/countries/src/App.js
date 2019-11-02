import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countryClickHandler = (country) => {
    setNewFilter(country)
}


  return (
    <div>
      find countries <input 
        value = {newFilter}
        onChange = {handleFilterChange}
        />
      
      <Countries 
      countryClickHandler = {countryClickHandler}
      countries = {countries}
      newFilter = {newFilter}
        />

    </div>
  )
}

export default App
