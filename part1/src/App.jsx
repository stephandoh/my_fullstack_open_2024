import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  // Fetch all countries once
  useEffect(() => {
    countriesService.getAll().then(data => setCountries(data))
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

      {/* Case 1: too many matches */}
      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {/* Case 2: 2–10 matches with show buttons */}
      {filteredCountries.length > 1 &&
        filteredCountries.length <= 10 &&
        filteredCountries.map(country => (
          <div key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => setQuery(country.name.common)}>
              show
            </button>
          </div>
        ))
      }

      {/* Case 3: exactly 1 match → show country + weather */}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
    </div>
  )
}

// CountryDetails component now fetches weather
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  const capital = country.capital[0]

  useEffect(() => {
    const [lat, lon] = country.latlng
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`

    axios.get(url)
      .then(res => setWeather(res.data))
      .catch(err => console.error('Weather fetch failed:', err))
  }, [country])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {capital}</p>
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

      {/* Weather display */}
      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>temperature: {weather.main.temp} °C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App
