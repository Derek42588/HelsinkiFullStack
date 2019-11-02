import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {

    const [weatherData, setWeatherData] = (useState([]))

    const hook = () => {
        axios
        .get('http://api.weatherstack.com/current?access_key=de1d6f8348ceeb47826c519b74f7b4e4&query='+`${country.capital}`)
        .then(response => {
            setWeatherData(response.data.current)
        })
      }

      useEffect(hook, [])

      

    const languages = () => country.languages.map( language => 
        <li key = {language.name}>{language.name}</li>
        )
    
    
        return (
        <div>
        <h1>{country.name}</h1>
    
        <p>capital {country.capital} <br/>
        population {country.population}</p>
    
        <h2>languages</h2>
        <ul>
            {languages()}
        </ul>
        <img src = {country.flag } alt = "country flag" style = {{width:'100px'}}/>

        <h2>Weather in {country.capital}</h2>

        <p>temperature: {weatherData.temperature}</p>
        <p>wind: {weatherData.wind_speed} kph direction {weatherData.wind_direction}</p>
    
        </div>
        
        )
    
    }

export default Country