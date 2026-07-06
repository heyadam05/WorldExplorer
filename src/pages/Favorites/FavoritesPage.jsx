import { Link } from 'react-router-dom'
import { CountryList } from '../../components/countries/CountryList'
import { useFavorites } from '../../hooks/useFavorites'
import favoritesEmptyImage from '../../assets/images/favorites-empty-transparent.png'
import './FavoritesPage.css'

export function FavoritesPage() {
  const { favorites } = useFavorites()
  const hasFavorites = favorites.length > 0

  return (
    <section className="page favorites-page">
      <div className="favorites-page__header">
          <h1>Saved Favorites</h1>
          <p>
            {hasFavorites
              ? `${favorites.length} saved ${favorites.length === 1 ? 'country' : 'countries'}`
              : 'Your saved countries will appear here.'}
          </p>
      </div>

      {hasFavorites ? (
        <CountryList countries={favorites} />
      ) : (
        <div className="favorites-empty">
          <img src={favoritesEmptyImage} alt="" />

          <h2>No favorites yet.</h2>
          <p>Save countries you love and they will appear here for quick access.</p>
          <Link className="button button--primary" to="/countries">
            Discover Countries
          </Link>
        </div>
      )}
    </section>
  )
}
