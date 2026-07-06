import { Link } from 'react-router-dom'
import './CountryCard.css'
import { useFavorites } from '../../hooks/useFavorites'

export function CountryCard({ country }) {
  const { addFavorite, removeFavorite, containsFavorite } = useFavorites()
  const isFavorite = containsFavorite(country)

  return (
    <article className="country-card">
      <Link className="country-card__link" to={`/country/${country.slug}`}>
        {country.flag ? (
          <img className="country-card__flag" src={country.flag} alt={`${country.name} flag`} />
        ) : (
          <div className="country-card__flag-placeholder">
            <i className="fa-regular fa-flag" aria-hidden="true"></i>
          </div>
        )}

        <div className="country-card__body">
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <p>Subregion: {country.subregion}</p>
          <p>Area: {country.area.toLocaleString()} km2</p>
        </div>
      </Link>

      <div className="country-card__footer">
        <span>Favorite</span>
        <button 
          className={'country-card__favorite' + (isFavorite ? ' country-card__favorite--active' : '')}
          type="button" 
          aria-label={isFavorite ? `Remove ${country.name} from favorites` : `Add ${country.name} to favorites`}
          onClick={() => isFavorite ? removeFavorite(country) : addFavorite(country)}
        >
          <i className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart`} aria-hidden="true"></i>
        </button>
      </div>
    </article>
  )
}
