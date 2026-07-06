import './AppLayout.css'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'

export function AppLayout() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  return (
    <div className={isHomePage ? 'app-shell app-shell--home' : 'app-shell'}>
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  )
}
