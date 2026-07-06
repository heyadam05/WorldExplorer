import { CountryCard } from './CountryCard'
import './CountryList.css'

export function CountryList({ countries }) {
  if (countries.length === 0) {
    return <p className="country-list__empty">No countries found.</p>
  }

  return (
    <div className="country-list">
      {countries.map((country) => (
        <CountryCard country={country} key={country.name} />
      ))}
    </div>
  )
}
