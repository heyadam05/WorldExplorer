import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { HomePage } from '../pages/Home/HomePage'
import { CountriesPage } from '../pages/Countries/CountriesPage'
import { CountryDetailPage } from '../pages/CountryDetail/CountryDetailPage'
import { ComparePage } from '../pages/Compare/ComparePage'
import { FavoritesPage } from '../pages/Favorites/FavoritesPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'countries',
        element: <CountriesPage />,
      },
      {
        path: 'country/:countryName',
        element: <CountryDetailPage />,
      },
      {
        path: 'countries/:countryName',
        element: <CountryDetailPage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
