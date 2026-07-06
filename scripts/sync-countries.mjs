import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const API_URL = 'https://api.restcountries.com/countries/v5'
const FALLBACK_DATA_URL =
  'https://raw.githubusercontent.com/apilayer/restcountries/master/src/main/resources/countriesV2.json'
const CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000
const CACHE_PATH = path.resolve('public/data/countries.json')
const TEMP_CACHE_PATH = `${CACHE_PATH}.tmp`
const COUNTRY_FIELDS = [
  'names', 'codes', 'capitals', 'flag', 'population', 'region', 'subregion',
  'area', 'landlocked', 'borders', 'currencies', 'languages', 'timezones',
].join(',')

async function loadLocalEnv() {
  try {
    const envFile = await readFile(path.resolve('.env.local'), 'utf8')
    for (const line of envFile.split(/\r?\n/)) {
      const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)\s*$/)
      if (match && process.env[match[1]] === undefined) {
        process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2')
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}

async function cacheIsFresh() {
  try {
    const cacheStats = await stat(CACHE_PATH)
    return Date.now() - cacheStats.mtimeMs < CACHE_MAX_AGE_MS
  } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
}

async function fetchCountries(apiKey) {
  const countries = []
  let offset = 0
  let hasMoreCountries = true

  while (hasMoreCountries) {
    const params = new URLSearchParams({
      response_fields: COUNTRY_FIELDS,
      limit: '100',
      offset: String(offset),
    })
    const response = await fetch(`${API_URL}?${params}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'User-Agent': 'WorldExplorer/1.0',
      },
    })
    if (!response.ok) {
      const responseMessage = (await response.text()).slice(0, 300)
      throw new Error(
        `Country sync failed (${response.status} ${response.statusText})${responseMessage ? `: ${responseMessage}` : ''}`,
      )
    }

    const { data } = await response.json()
    countries.push(...data.objects)
    hasMoreCountries = Boolean(data.meta.more)
    offset += data.meta.count
  }

  return countries
}

function convertFallbackCountry(country) {
  return {
    names: {
      common: country.name,
      official: country.name,
    },
    codes: {
      alpha_2: country.alpha2Code,
      alpha_3: country.alpha3Code,
    },
    capitals: country.capital
      ? [{ name: country.capital, coordinates: country.latlng ?? null }]
      : [],
    flag: {
      url_png: '',
      url_svg: '',
      emoji: '',
    },
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    area: { kilometers: country.area ?? 0 },
    landlocked: country.landlocked,
    borders: country.borders ?? [],
    currencies: country.currencies ?? [],
    languages: country.languages ?? [],
    timezones: country.timezones ?? [],
  }
}

async function fetchFallbackCountries() {
  const response = await fetch(FALLBACK_DATA_URL, {
    headers: { Accept: 'application/json', 'User-Agent': 'WorldExplorer/1.0' },
  })

  if (!response.ok) {
    throw new Error(`Fallback country sync failed (${response.status} ${response.statusText})`)
  }

  return (await response.json()).map(convertFallbackCountry)
}

async function main() {
  const forceRefresh = process.argv.includes('--force')
  if (!forceRefresh && (await cacheIsFresh())) {
    console.log('Country cache is fresh. API sync skipped.')
    return
  }

  await loadLocalEnv()
  const apiKey = process.env.RESTCOUNTRIES_API_KEY ?? process.env.VITE_RESTCOUNTRIES_API_KEY
  console.log('Refreshing country cache from REST Countries...')
  let countries

  if (apiKey) {
    try {
      countries = await fetchCountries(apiKey)
    } catch (error) {
      console.warn(`${error.message}\nUsing the REST Countries source dataset instead.`)
    }
  }

  countries ??= await fetchFallbackCountries()
  const cache = {
    generatedAt: new Date().toISOString(),
    count: countries.length,
    countries,
  }

  await mkdir(path.dirname(CACHE_PATH), { recursive: true })
  await writeFile(TEMP_CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, 'utf8')
  await rename(TEMP_CACHE_PATH, CACHE_PATH)
  console.log(`Saved ${countries.length} countries to public/data/countries.json.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
