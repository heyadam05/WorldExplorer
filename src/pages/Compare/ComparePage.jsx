import './ComparePage.css'
import { useId, useMemo, useState } from 'react'
import { CompareTable } from './CompareTable'
import { useCountries } from './../../hooks/useCountries'

function CountrySearch({ placeholder, searchQuery, onSearchChange, filteredCountries, selectedCountry, onCountrySelect }) {
  const inputId = useId()
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredCountries.length > 0) {
      const exactMatch = filteredCountries.find(
        (country) => country.name.toLowerCase() === searchQuery.toLowerCase()
      )
      if (exactMatch) {
        onCountrySelect(exactMatch)
      }
    }
  }

  return (
    <div className="country-search__container">
      <label className="country-search" htmlFor={inputId}>
        <i className="fa-regular fa-magnifying-glass" aria-hidden="true"></i>
        <input
          type="search"
          id={inputId}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {selectedCountry && (
          <img 
            width="24" 
            height="18" 
            src={selectedCountry.flag} 
            alt={selectedCountry.name}
            className="country-search__flag"
          />
        )}
      </label>
      {searchQuery && filteredCountries.length > 0 && !filteredCountries.some((c) => c.name.toLowerCase() === searchQuery.toLowerCase()) && (
        <div className="country-search__results">
          {filteredCountries.map((country) => (
            <div 
              key={country.name} 
              className="country-search__result-item"
              onClick={() => onCountrySelect(country)}
            >
              <span><img width="20" height="15" src={country.flag} alt={country.name} /> {country.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function ComparePage() {
  const [searchFirstCountry, setSearchFirstCountry] = useState('')
  const [searchSecondCountry, setSearchSecondCountry] = useState('')
  const [firstCountry, setFirstCountry] = useState(null)
  const [secondCountry, setSecondCountry] = useState(null)
  const { countries, isLoading, error } = useCountries()

  const filteredFirstCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesFirstCountry = searchFirstCountry
        ? country.name.toLowerCase().includes(searchFirstCountry.toLowerCase())
        : false

      return matchesFirstCountry
    })
  }, [countries, searchFirstCountry])

  const filteredSecondCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSecondCountry = searchSecondCountry
        ? country.name.toLowerCase().includes(searchSecondCountry.toLowerCase())
        : false

      return matchesSecondCountry
    })
  }, [countries, searchSecondCountry])

  const handleSelectFirstCountry = (country) => {
    setFirstCountry(country)
    setSearchFirstCountry(country.name)
  }

  const handleSelectSecondCountry = (country) => {
    setSecondCountry(country)
    setSearchSecondCountry(country.name)
  }

  if (isLoading) {
    return <p className="page-status">Loading countries...</p>
  }

  if (error) {
    return <p className="page-status page-status--error">{error}</p>
  }

  
  return (
    <section className="page compare-page">
      <div className="page-header">
        <h1>Compare Countries</h1>
        <p>Build your country comparison workflow here.</p>
      </div>
      <div className="compare-page__container">
        <div className="compare-page__content">
          <section className="compare-page__search-countries">
            <CountrySearch
              placeholder="Search first country..."
              searchQuery={searchFirstCountry}
              onSearchChange={setSearchFirstCountry}
              filteredCountries={filteredFirstCountries}
              selectedCountry={firstCountry}
              onCountrySelect={handleSelectFirstCountry}
            />
            <i className="fa-light fa-scale-balanced" aria-hidden="true"></i>
            <CountrySearch
              placeholder="Search second country..."
              searchQuery={searchSecondCountry}
              onSearchChange={setSearchSecondCountry}
              filteredCountries={filteredSecondCountries}
              selectedCountry={secondCountry}
              onCountrySelect={handleSelectSecondCountry}
            />
          </section>
          
          {
            firstCountry && secondCountry && (
              <CompareTable 
                firstCountry={firstCountry} 
                secondCountry={secondCountry} 
              />
            )
          }
        </div>
      </div>
    </section>
  )
}
