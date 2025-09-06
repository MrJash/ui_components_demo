import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })
  
  const [themeStyle, setThemeStyle] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('themeStyle') || 'default'
    }
    return 'default'
  })

  const [themePreset, setThemePreset] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('themePreset') || 'default'
    }
    return 'default'
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Temporarily disable transitions during theme change
    root.classList.remove('theme-transition')
    
    // Apply theme changes
    root.classList.remove('light', 'dark', 'oled', 'gray', 'amethyst-haze', 'sunset-horizon')
    root.classList.add(theme)
    
    // Add theme style classes
    if (theme === 'dark' && themeStyle === 'oled') {
      root.classList.add('oled')
    } else if (theme === 'light' && themeStyle === 'gray') {
      root.classList.add('gray')
    }

    // Add preset classes
    if (themePreset === 'amethyst-haze') {
      root.classList.add('amethyst-haze')
    } else if (themePreset === 'sunset-horizon') {
      root.classList.add('sunset-horizon')
    }
    
    // Re-enable transitions after a brief delay
    requestAnimationFrame(() => {
      root.classList.add('theme-transition')
    })
    
    localStorage.setItem('theme', theme)
    localStorage.setItem('themeStyle', themeStyle)
    localStorage.setItem('themePreset', themePreset)
  }, [theme, themeStyle, themePreset])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      // Reset theme style to default when switching themes
      setThemeStyle('default')
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyle, setThemeStyle, themePreset, setThemePreset }}>
      {children}
    </ThemeContext.Provider>
  )
}
