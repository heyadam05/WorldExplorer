import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Countries', path: '/countries' },
  { label: 'Compare', path: '/compare' },
  { label: 'Favorites', path: '/favorites' },
]

function handleResponsiveMenu() {
  const navbar = document.querySelector('.navbar');

  if (navbar.classList.contains('navbar--responsive')) {
    navbar.classList.remove('navbar--responsive');
  } else {
    navbar.classList.add('navbar--responsive');
  }
}


export function Navbar() {
  const { theme, toggle } = useTheme()
  return (
    <header className="navbar">
      <div className="navbar__top">
        <NavLink className="navbar__brand" to="/">
          <i className="fa-sharp fa-solid fa-earth-americas" aria-hidden="true"></i>
          <span>World Explorer</span>
        </NavLink>

        <button type="button" className="mobile-menu-toggle" onClick={handleResponsiveMenu} aria-label="Open mobile menu">
          <i className="fa-regular fa-bars" aria-hidden="true"></i>
        </button>
      </div>

      {/*<div className="nv navbar__menu">*/}
        <nav className="navbar__links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
              }
              key={item.path} 
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="theme-toggle"
          type="button"
          aria-label="Toggle theme"
          onClick={() => toggle()}
          aria-pressed={theme === 'dark'}
        >
          <i className='fa-solid fa-sun' aria-hidden="true"></i>
          <span className="theme-toggle__knob" aria-hidden="true"></span>
          <i className='fa-solid fa-moon' aria-hidden="true"></i>
        </button>
      {/*</div>*/}
    </header>
  )
}
