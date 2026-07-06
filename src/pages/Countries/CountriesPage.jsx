import { useMemo, useState } from 'react'
import { CountryFilters } from '../../components/countries/CountryFilters'
import { CountryList } from '../../components/countries/CountryList'
import { useCountries } from '../../hooks/useCountries'
import './CountriesPage.css'

const defaultFilters = {
  searchQuery: '',
  region: 'all',
  subregion: 'all',
  population: 'all',
  area: 'all',
  geography: 'all',
  sortBy: 'name-asc',
}

function matchesPopulationRange(population, selectedRange) {
  if (selectedRange === 'under-1m') return population < 1_000_000
  if (selectedRange === '1m-10m') return population >= 1_000_000 && population < 10_000_000
  if (selectedRange === '10m-50m') return population >= 10_000_000 && population < 50_000_000
  if (selectedRange === '50m-100m') return population >= 50_000_000 && population < 100_000_000
  if (selectedRange === 'over-100m') return population >= 100_000_000

  return true
}

function matchesAreaRange(area, selectedRange) {
  if (selectedRange === 'under-10k') return area > 0 && area < 10_000
  if (selectedRange === '10k-100k') return area >= 10_000 && area < 100_000
  if (selectedRange === '100k-1m') return area >= 100_000 && area < 1_000_000
  if (selectedRange === 'over-1m') return area >= 1_000_000

  return true
}

function sortCountries(countries, sortBy) {
  return [...countries].sort((countryA, countryB) => {
    if (sortBy === 'name-desc') return countryB.name.localeCompare(countryA.name)
    if (sortBy === 'population-desc') return countryB.population - countryA.population
    if (sortBy === 'population-asc') return countryA.population - countryB.population
    if (sortBy === 'area-desc') return countryB.area - countryA.area
    if (sortBy === 'area-asc') return countryA.area - countryB.area

    return countryA.name.localeCompare(countryB.name)
  })
}

export function CountriesPage() {
  const { countries, isLoading, error } = useCountries()
  const [filters, setFilters] = useState(defaultFilters)

  const regions = useMemo(() => {
    return [...new Set(countries.map((country) => country.region).filter(Boolean))].sort()
  }, [countries])

  const subregions = useMemo(() => {
    return [
      ...new Set(
        countries
          .filter((country) => filters.region === 'all' || country.region === filters.region)
          .map((country) => country.subregion)
          .filter((subregion) => subregion && subregion !== 'N/A'),
      ),
    ].sort()
  }, [countries, filters.region])

  const filteredCountries = useMemo(() => {
    const filtered = countries.filter((country) => {
      const matchesSearch = country.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      const matchesRegion = filters.region === 'all' || country.region === filters.region
      const matchesSubregion = filters.subregion === 'all' || country.subregion === filters.subregion
      const matchesPopulation = matchesPopulationRange(country.population, filters.population)
      const matchesArea = matchesAreaRange(country.area, filters.area)
      const matchesGeography =
        filters.geography === 'all' ||
        (filters.geography === 'landlocked' && country.landlocked) ||
        (filters.geography === 'coastal' && !country.landlocked)

      return (
        matchesSearch &&
        matchesRegion &&
        matchesSubregion &&
        matchesPopulation &&
        matchesArea &&
        matchesGeography
      )
    })

    return sortCountries(filtered, filters.sortBy)
  }, [countries, filters])

  function handleFilterChange(filterName, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterName]: value,
      ...(filterName === 'region' ? { subregion: 'all' } : {}),
    }))
  }

  return (
    <section className="page">
      <div className="page-header">
        <h1>Countries</h1>
      </div>

      <CountryFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={() => setFilters(defaultFilters)}
        regions={regions}
        subregions={subregions}
        resultCount={filteredCountries.length}
        totalCount={countries.length}
      />

      {isLoading && <p className="countries-status">Loading countries...</p>}
      {error && <p className="countries-status countries-status--error">{error}</p>}
      {!isLoading && !error && <CountryList countries={filteredCountries} />}
    </section>
  )
}
