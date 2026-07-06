import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CountryMap } from '../../components/countries/CountryMap'
import { useFavorites } from '../../hooks/useFavorites'
import { countriesApi } from '../../services/countriesApi'
import './CountryDetailPage.css'

function formatList(items) {
  return items.length > 0 ? items.join(', ') : 'N/A'
}

export function CountryDetailPage() {
  const { countryName } = useParams()
  const { addFavorite, removeFavorite, containsFavorite } = useFavorites()
  const [country, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let shouldUpdateState = true

    async function loadCountry() {
      try {
        setIsLoading(true)
        setError(null)

        const countryData = await countriesApi.getCountryByIdentifier(countryName)

        if (shouldUpdateState) {
          setCountry(countryData)
        }
      } catch (requestError) {
        if (shouldUpdateState) {
          setError(requestError.message)
        }
      } finally {
        if (shouldUpdateState) {
          setIsLoading(false)
        }
      }
    }

    loadCountry()

    return () => {
      shouldUpdateState = false
    }
  }, [countryName])

  if (isLoading) {
    return <p className="country-detail-status">Loading country...</p>
  }

  if (error) {
    return <p className="country-detail-status country-detail-status--error">{error}</p>
  }

  if (!country) {
    return <p className="country-detail-status">Country was not found.</p>
  }

  const stats = [
    { label: 'Capital', value: country.capital },
    { label: 'Population', value: country.population.toLocaleString() },
    { label: 'Area', value: `${country.area.toLocaleString()} km2` },
    { label: 'Region', value: country.region },
    { label: 'Currency', value: formatList(country.currencies) },
    { label: 'Languages', value: formatList(country.languages) },
    { label: 'Timezones', value: formatList(country.timezones) },
    { label: 'Subregion', value: country.subregion },
  ]
  const isFavorite = containsFavorite(country)

  return (
    <section className="country-detail">
      <Link className="country-detail__back" to="/countries">
        <i className="fa-regular fa-arrow-left" aria-hidden="true"></i>
        Back to countries
      </Link>

      <div className="country-detail__panel">
        <div
          className="country-detail__banner"
          style={country.flag ? { '--country-flag-image': `url(${country.flag})` } : undefined}
        >
          {country.flag ? (
            <span className="country-detail__flag-alt" role="img" aria-label={`${country.name} flag`} />
          ) : (
            <div className="country-detail__flag-placeholder">
              <i className="fa-regular fa-flag" aria-hidden="true"></i>
            </div>
          )}
        </div>

        <div className="country-detail__title-row">
          <div>
            <h1>{country.name}</h1>
            <p>{country.officialName}</p>
          </div>

          <button
            className={'country-detail__favorite' + (isFavorite ? ' country-detail__favorite--active' : '')}
            type="button"
            aria-label={isFavorite ? `Remove ${country.name} from favorites` : `Save ${country.name}`}
            onClick={() => (isFavorite ? removeFavorite(country) : addFavorite(country))}
          >
            <i className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart`} aria-hidden="true"></i>
          </button>
        </div>

        <div className="country-detail__stats">
          {stats.map((stat) => (
            <article className="country-detail__stat" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>

        <section className="country-detail__map-card" aria-label={`${country.name} map`}>
          <CountryMap country={country} />
        </section>

        <section className="country-detail__borders">
          <h2>Border Countries</h2>
          <div className="country-detail__border-list">
            {country.borders.length > 0 ? (
              country.borders.map((border) => (
                <Link key={border} to={`/country/${border.toLowerCase()}`}>
                  {border}
                </Link>
              ))
            ) : (
              <span>No border countries</span>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}
