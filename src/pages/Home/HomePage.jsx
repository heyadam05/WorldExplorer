import './HomePage.css'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <h1>Explore Every Country On Earth</h1>
          <p>
            Discover countries, cultures, capitals, populations, currencies and more.
          </p>

          <div className="home-hero__actions">
            <Link className="button button--primary" to="/countries">
              Explore Countries
            </Link>
            <Link className="button button--secondary" to="/compare">
              Compare Countries
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
