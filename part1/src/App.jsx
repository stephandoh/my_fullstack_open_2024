import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    countriesService.getAll().then(data => {
      setCountries(data)
    })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div>
        find countries{' '}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* CASE 1: too many matches */}
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {/* CASE 2: between 2 and 10 matches */}
      {filteredCountries.length > 1 &&
        filteredCountries.length <= 10 &&
        filteredCountries.map(country => (
          <p key={country.cca3}>
            {country.name.common}
          </p>
        ))
      }

      {/* CASE 3: exactly 1 match */}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
    </div>
  )
}

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    </div>
  )
}

export default App
