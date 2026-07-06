import { useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from './favoritesContextObject'

const STORAGE_KEY = 'world-explorer-favorites'

function getStoredFavorites() {
  try {
    const storedFavorites = localStorage.getItem(STORAGE_KEY)

    return storedFavorites ? JSON.parse(storedFavorites) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getStoredFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const value = useMemo(() => {
    function addFavorite(country) {
      setFavorites((currentFavorites) => {
        const alreadyExists = currentFavorites.some((favorite) => favorite.id === country.id)

        return alreadyExists ? currentFavorites : [...currentFavorites, country]
      })
    }

    function removeFavorite(country) {
      setFavorites((currentFavorites) =>
        currentFavorites.filter((favorite) => favorite.id !== country.id),
      )
    }

    function containsFavorite(country) {
      return favorites.some((favorite) => favorite.id === country.id)
    }

    return {
      favorites,
      addFavorite,
      removeFavorite,
      containsFavorite,
    }
  }, [favorites])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
