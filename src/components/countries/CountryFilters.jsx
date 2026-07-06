import './CountryFilters.css'

const populationOptions = [
  { label: 'Any population', value: 'all' },
  { label: 'Under 1M', value: 'under-1m' },
  { label: '1M - 10M', value: '1m-10m' },
  { label: '10M - 50M', value: '10m-50m' },
  { label: '50M - 100M', value: '50m-100m' },
  { label: 'Over 100M', value: 'over-100m' },
]

const areaOptions = [
  { label: 'Any area', value: 'all' },
  { label: 'Under 10k km2', value: 'under-10k' },
  { label: '10k - 100k km2', value: '10k-100k' },
  { label: '100k - 1M km2', value: '100k-1m' },
  { label: 'Over 1M km2', value: 'over-1m' },
]

const geographyOptions = [
  { label: 'Any geography', value: 'all' },
  { label: 'Landlocked', value: 'landlocked' },
  { label: 'Has coastline', value: 'coastal' },
]

const sortOptions = [
  { label: 'Name A-Z', value: 'name-asc' },
  { label: 'Name Z-A', value: 'name-desc' },
  { label: 'Population high-low', value: 'population-desc' },
  { label: 'Population low-high', value: 'population-asc' },
  { label: 'Area high-low', value: 'area-desc' },
  { label: 'Area low-high', value: 'area-asc' },
]

function FilterSelect({ id, label, value, onChange, options }) {
  return (
    <label className="country-filter" htmlFor={id}>
      <span>{label}</span>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function CountryFilters({
  filters,
  onFilterChange,
  onResetFilters,
  regions,
  subregions,
  totalCount,
  resultCount,
}) {
  const resultText = resultCount === 1 ? 'country' : 'countries'

  return (
    <section className="country-filters" aria-label="Country filters">
      <div className="country-filters__top">
        <label className="country-search first-country-search" htmlFor="first-country-search">
          <i className="fa-regular fa-magnifying-glass" aria-hidden="true"></i>
          <input
            id="first-country-search"
            type="search"
            placeholder="Search countries..."
            value={filters.searchQuery}
            onChange={(event) => onFilterChange('searchQuery', event.target.value)}
          />
        </label>

        <div className="country-results-summary" aria-live="polite">
          <strong>{resultCount.toLocaleString()}</strong> {resultText} shown
          <span>from {totalCount.toLocaleString()} total</span>
        </div>
      </div>

      <div className="country-filters__grid">
        <FilterSelect
          id="region-filter"
          label="Region"
          value={filters.region}
          onChange={(value) => onFilterChange('region', value)}
          options={[
            { label: 'All regions', value: 'all' },
            ...regions.map((region) => ({ label: region, value: region })),
          ]}
        />

        <FilterSelect
          id="subregion-filter"
          label="Subregion"
          value={filters.subregion}
          onChange={(value) => onFilterChange('subregion', value)}
          options={[
            { label: 'All subregions', value: 'all' },
            ...subregions.map((subregion) => ({ label: subregion, value: subregion })),
          ]}
        />

        <FilterSelect
          id="population-filter"
          label="Population"
          value={filters.population}
          onChange={(value) => onFilterChange('population', value)}
          options={populationOptions}
        />

        <FilterSelect
          id="area-filter"
          label="Area"
          value={filters.area}
          onChange={(value) => onFilterChange('area', value)}
          options={areaOptions}
        />

        <FilterSelect
          id="geography-filter"
          label="Geography"
          value={filters.geography}
          onChange={(value) => onFilterChange('geography', value)}
          options={geographyOptions}
        />

        <FilterSelect
          id="sort-filter"
          label="Sort by"
          value={filters.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
          options={sortOptions}
        />
      </div>

      <div className="country-filters__footer">
        <button type="button" onClick={onResetFilters}>
          Reset filters
        </button>
      </div>
    </section>
  )
}
