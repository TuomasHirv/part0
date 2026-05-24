import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import './App.css'

function App() {
  const [countries, setCountries] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('') 
  const fetchCountries = () => {
    countryService
          .getAll()
            .then(response=> {
              setCountries(response.data)
            }
          )
  }
  useEffect(fetchCountries, [])

  const filter = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const onCountryButtonPress = (countryName) => {
    setSearchTerm(countryName)
  }
  return (
    <div>
      <h2>Countries</h2>
      <form onSubmit={(e) => e.preventDefault()}>
          <div>
          name: <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      </form>
      {filter.length > 10 ? (
        <p>Narrow Your search...</p>
      ) : (
        filter.length > 1 ? (
          <ul>
              {filter.map(country => (
                <li key={country.cca3}>
                  {country.name.common}
                  <button onClick={() => onCountryButtonPress(country.name.common)} color="#841584">
                    Show
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          filter.length === 1 ? (
            <ul>
              <h1>{filter[0].name.common}</h1>
              <p>{filter[0].capital[0]}</p>
              <p>area {filter[0].area}</p>
              <h1>Languages</h1>
              {Object.values(filter[0].languages).map(lang => (
                <li key={lang}>
                  {lang}
                </li>
              ))}
              <img
                src={filter[0].flags.png}
                alt={filter[0].name.common}
                style={{
                  width: '150px',
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.15)',
                  marginTop: '15px'
                }}
              />
            </ul>
          ) : (
            <p>No countries found...</p>
          )
        )
      )}
    </div>
  )
}

export default App
