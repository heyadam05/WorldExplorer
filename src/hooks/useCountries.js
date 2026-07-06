import { useEffect, useState } from 'react'
import { countriesApi } from '../services/countriesApi'

export function useCountries() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let shouldUpdateState = true

    async function loadCountries() {
      try {
        setIsLoading(true)
        setError(null)

        const countriesData = await countriesApi.getAllCountries()

        if (shouldUpdateState) {
          setCountries(countriesData)
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

    loadCountries()

    return () => {
      shouldUpdateState = false
    }
  }, [])

  return {
    countries,
    isLoading,
    error,
  }
}
