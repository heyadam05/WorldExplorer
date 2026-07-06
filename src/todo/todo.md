# World Explorer - React Project Foundation

Use this file as your architecture guide while you build the project yourself.
The goal is a clean foundation, not a finished app.

## Recommended Folder Structure

```text
src/
  app/
    AppRouter.jsx
  assets/
  components/
    common/
    countries/
    layout/
      Layout.jsx
      Navbar.jsx
  context/
    FavoritesContext.jsx
    favoritesContextObject.js
  hooks/
    useCountries.js
    useFavorites.js
  pages/
    Home/
      HomePage.jsx
    Countries/
      CountriesPage.jsx
    CountryDetail/
      CountryDetailPage.jsx
    Compare/
      ComparePage.jsx
    Favorites/
      FavoritesPage.jsx
  services/
    countriesApi.js
  styles/
  utils/
  App.jsx
  main.jsx
  index.css
```

## Why Each Folder Exists

- `app/`: App-level setup such as routing, providers, and configuration.
- `assets/`: Static images, icons, flags, or local visual files.
- `components/common/`: Reusable generic UI such as `Button`, `Input`, `Loader`, `EmptyState`.
- `components/countries/`: Country-specific UI such as `CountryCard`, `CountryGrid`, `RegionFilter`.
- `components/layout/`: Shared layout pieces such as `Layout`, `Navbar`, and later `Footer`.
- `context/`: React Context providers for app-wide state, such as favorites.
- `hooks/`: Custom hooks that keep components clean, such as fetching countries or reading favorites.
- `pages/`: Route-level components. Each page represents a URL.
- `services/`: API calls and external data access. Components should not call API URLs directly.
- `styles/`: Optional folder for larger CSS files, variables, or theme files.
- `utils/`: Small pure helper functions, such as formatting population numbers.

## Suggested Component Architecture

Start simple:

- `Layout`: wraps every page and renders the navbar plus `<Outlet />`.
- `Navbar`: shows navigation links.
- `CountryCard`: later, renders one country preview.
- `CountryGrid`: later, maps country data into cards.
- `SearchBar`: later, receives search value and change handler.
- `RegionFilter`: later, receives selected region and change handler.
- `Loader`: later, reusable loading state.
- `ErrorMessage`: later, reusable error state.

Keep page components responsible for page composition. Keep reusable components focused and prop-driven.

## Suggested Page Structure

- `Home`: introduction and links into the app.
- `Countries`: search, filters, and country list.
- `Country Detail`: details for one country using a route param.
- `Compare`: select two countries and compare them.
- `Favorites`: show countries saved by the user.

## Recommended Routing Setup

Installed dependency:

```bash
npm install react-router-dom
```

Recommended routes:

```text
/                    -> Home
/countries           -> Countries
/countries/:countryCode -> Country Detail
/compare             -> Compare
/favorites           -> Favorites
```

The starter route setup lives in:

```text
src/app/AppRouter.jsx
```

## Recommended State Management

Use local component state first.

Good progression:

1. `useState`: search input, selected region, selected compare countries.
2. Custom hooks: reusable fetch/loading/error patterns.
3. Context API: favorites, theme, app preferences.
4. Zustand: only if state becomes more complex across many unrelated components.

For this project, Context API is enough for favorites because the state is small and app-wide.

## Example API Service Structure

Keep API logic in `src/services/countriesApi.js`.

Why:

- Pages stay easier to read.
- API URLs live in one place.
- You can change the API later without editing every component.

Example methods already started:

- `getAllCountries()`
- `getCountryByCode(countryCode)`
- `searchCountriesByName(name)`

## Suggested Custom Hooks

Create these only when you need them:

- `useCountries`: fetch and expose country list, loading, and error state.
- `useCountry(countryCode)`: fetch one country by code.
- `useCountrySearch`: manage search query and filtered results.
- `useFavorites`: add, remove, and check favorite countries.
- `useLocalStorage`: reusable localStorage state helper.
- `useCompareCountries`: manage selected countries for comparison.

## Naming Conventions

- Components: `PascalCase`, for example `CountryCard.jsx`.
- Hooks: `camelCase` starting with `use`, for example `useCountries.js`.
- Services: `camelCase`, for example `countriesApi.js`.
- Context files: `PascalCase`, for example `FavoritesContext.jsx`.
- CSS classes: readable lowercase BEM-style names, for example `navbar__link--active`.
- Route params: descriptive camelCase, for example `countryCode`.

## Starter Code Files

Created starter files:

- `src/main.jsx`
- `src/App.jsx`
- `src/app/AppRouter.jsx`
- `src/components/layout/Layout.jsx`
- `src/components/layout/Navbar.jsx`
- `src/pages/Home/HomePage.jsx`
- `src/pages/Countries/CountriesPage.jsx`
- `src/pages/CountryDetail/CountryDetailPage.jsx`
- `src/pages/Compare/ComparePage.jsx`
- `src/pages/Favorites/FavoritesPage.jsx`
- `src/services/countriesApi.js`
- `src/hooks/useCountries.js`
- `src/hooks/useFavorites.js`
- `src/hooks/useFavoritesContext.js`
- `src/context/FavoritesContext.jsx`
- `src/context/favoritesContextObject.js`

## Build Order

1. Confirm routing works.
2. Build `CountriesPage` with API fetching.
3. Add `CountryCard` and `CountryGrid`.
4. Add search and region filter.
5. Build `CountryDetailPage`.
6. Add favorites with Context API and localStorage.
7. Build compare page.
8. Add polish, loading states, error states, and responsive styling.

## Important Rule

Do not build everything at once. Make one page or feature work, then improve it.
