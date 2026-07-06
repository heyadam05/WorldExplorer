# World Explorer

A React portfolio application for discovering, filtering, comparing, and saving countries.

## Live Demo

[Open World Explorer](https://heyworldexplorer.netlify.app/)

## Development

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and add your REST Countries API key. The key is used only by the Node synchronization script and is not included in the browser bundle.

## Country data cache

Country data is stored in `public/data/countries.json`. Before `npm run dev` and `npm run build`, the sync script checks the file age:

- A cache younger than 7 days is used without an API request.
- An older or missing cache is refreshed from REST Countries v5.
- If the v5 account is unavailable, the script uses the REST Countries source dataset as a fallback.
- The file is written through a temporary file so an interrupted update cannot corrupt the existing cache.

Run a normal check:

```bash
npm run sync:countries
```

Force an immediate refresh:

```bash
npm run sync:countries:force
```

The GitHub Actions workflow in `.github/workflows/update-country-cache.yml` also refreshes and commits the dataset every Monday. Add `RESTCOUNTRIES_API_KEY` as a repository secret when the v5 account is active.

## Quality checks

```bash
npm run lint
npm run build
```
