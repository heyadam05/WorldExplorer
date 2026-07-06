const CACHE_URL = `${import.meta.env.BASE_URL}data/countries.json`
const FALLBACK_FLAGS_BY_COUNTRY_NAME = {
  Abkhazia: 'https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Abkhazia.svg',
}

let countriesPromise

function getField(country, path) {
  return country[path] ?? path.split('.').reduce((value, key) => value?.[key], country)
}

function getValidValue(...values) {
  return values.find((value) => typeof value === 'string' && value.trim().length > 0)
}

function normalizeCoordinates(coordinates) {
  if (Array.isArray(coordinates) && coordinates.length >= 2) {
    return { lat: Number(coordinates[0]), lng: Number(coordinates[1]) }
  }

  if (coordinates && Number.isFinite(Number(coordinates.lat)) && Number.isFinite(Number(coordinates.lng))) {
    return { lat: Number(coordinates.lat), lng: Number(coordinates.lng) }
  }

  return null
}

function normalizeCountry(country) {
  const name = getField(country, 'names.common') ?? 'Unknown country'
  const officialName = getField(country, 'names.official') ?? name
  const alpha2Code = getValidValue(getField(country, 'codes.alpha_2'))
  const alpha3Code = getValidValue(getField(country, 'codes.alpha_3'))
  const code = alpha3Code ?? alpha2Code ?? name
  const flagFromCode = alpha2Code ? `https://flagcdn.com/${alpha2Code.toLowerCase()}.svg` : null
  const flag = getValidValue(
    getField(country, 'flag.url_svg'),
    getField(country, 'flag.url_png'),
    flagFromCode,
    FALLBACK_FLAGS_BY_COUNTRY_NAME[name],
    getField(country, 'flag.emoji'),
  ) ?? null

  return {
    id: code,
    name,
    officialName,
    slug: name.toLowerCase().trim().replace(/\s+/g, '-'),
    capital: getField(country, 'capitals')?.[0]?.name ?? 'N/A',
    capitalCoordinates: normalizeCoordinates(getField(country, 'capitals')?.[0]?.coordinates),
    population: Number(getField(country, 'population') ?? 0),
    region: getField(country, 'region') ?? 'N/A',
    subregion: getField(country, 'subregion') ?? 'N/A',
    area: Number(getField(country, 'area.kilometers') ?? 0),
    landlocked: Boolean(getField(country, 'landlocked')),
    borders: getField(country, 'borders') ?? [],
    currencies: (getField(country, 'currencies') ?? []).map((currency) => currency.name),
    languages: (getField(country, 'languages') ?? []).map((language) => language.name),
    timezones: getField(country, 'timezones') ?? [],
    flag,
  }
}

async function loadCountries() {
  if (!countriesPromise) {
    countriesPromise = fetch(CACHE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load cached country data (${response.status})`)
        }
        return response.json()
      })
      .then((cache) => cache.countries
        .map(normalizeCountry)
        .sort((countryA, countryB) => countryA.name.localeCompare(countryB.name)))
      .catch((error) => {
        countriesPromise = undefined
        throw error
      })
  }
  return countriesPromise
}

export const countriesApi = {
  getAllCountries() {
    return loadCountries()
  },

  async getCountryByCode(countryCode) {
    const countries = await loadCountries()
    return countries.find((country) => country.id.toUpperCase() === countryCode.toUpperCase()) ?? null
  },

  async searchCountriesByName(name) {
    const countries = await loadCountries()
    const query = name.toLowerCase()
    return countries.filter((country) =>
      country.name.toLowerCase().includes(query) ||
      country.officialName.toLowerCase().includes(query))
  },

  async getCountryByIdentifier(identifier) {
    const countries = await loadCountries()
    const value = identifier.toLowerCase()
    const name = identifier.replaceAll('-', ' ').toLowerCase()
    return countries.find((country) => country.id.toLowerCase() === value) ??
      countries.find((country) => country.slug === value) ??
      countries.find((country) => country.name.toLowerCase() === name) ??
      null
  },
}
