import React from 'react'
import Country from './Country'



const Countries = (props) => {



const countriesToShow = props.countries.filter(country => country.name.toLowerCase().includes(props.newFilter.toLowerCase()))

const rowsOfCountries = () => countriesToShow.map( country => 
    <li style = {{listStyle: 'none'}} key = {country.name} >{country.name} <button onClick={() => props.countryClickHandler(country.name)}>show</button></li>
    )


const filterList = () => {
    if (props.newFilter === '') {
        return ''
    }
    else if (countriesToShow.length >= 10) {
        return 'Too many matches, specify another filter'
    }
    else if (countriesToShow.length === 1 ) {
        return <Country country = {countriesToShow[0]}/>
    }
    else {
        return rowsOfCountries()
    }
}
      

    return (
        <div>
            {filterList()}
        </div>
    )
}

export default Countries