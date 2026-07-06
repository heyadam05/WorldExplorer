import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContextObject'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') return stored
    } catch {
      // localStorage can be unavailable in privacy-restricted browsers.
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // The selected theme still works for the current session.
    }

    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
