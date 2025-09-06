import React, { createContext, useContext, useRef, useEffect, useState } from 'react'

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

    // Clear any previously-applied inline background fallbacks immediately
    try {
      root.style.background = ''
      root.style.backgroundAttachment = ''
      root.style.backgroundRepeat = ''
      root.style.backgroundPosition = ''
      const existingWrapper = document.querySelector('.min-h-screen.bg-background')
      if (existingWrapper) {
        existingWrapper.style.background = ''
        existingWrapper.style.backgroundAttachment = ''
        existingWrapper.style.backgroundRepeat = ''
        existingWrapper.style.backgroundPosition = ''
      }
    } catch (e) {
      // ignore
    }

    // Apply theme changes
    // remove previous theme and any previously applied style classes
    const styleClasses = [
      'oled', 'orchid', 'aurora', 'crimson', 'pearl', 'gray',
      'bottom-slate', 'bottom-violet', 'aurora-dream', 'diagonal-grid',
      'dark-dot-matrix', 'dark-noise-colored',
      'amethyst-haze', 'sunset-horizon', 'bold-tech', 'elegant-luxury', 'nature'
    ]
    // remove theme and all style classes to start clean
    root.classList.remove('light', 'dark', ...styleClasses)
    root.classList.add(theme)
    
    // Add theme style class (apply the style class when it's not 'default')
    if (themeStyle && themeStyle !== 'default') {
      root.classList.add(themeStyle)
    }

    // Add preset classes
    if (themePreset === 'amethyst-haze') {
      root.classList.add('amethyst-haze')
    } else if (themePreset === 'sunset-horizon') {
      root.classList.add('sunset-horizon')
    } else if (themePreset === 'bold-tech') {
      root.classList.add('bold-tech')
    } else if (themePreset === 'elegant-luxury') {
      root.classList.add('elegant-luxury')
    } else if (themePreset === 'nature') {
      root.classList.add('nature')
    }
    
    // Re-enable transitions after a brief delay
    requestAnimationFrame(() => {
      root.classList.add('theme-transition')
    })

    // Debug: Log theme application for troubleshooting (remove in production if noisy)
    try {
      // eslint-disable-next-line no-console
      console.debug('[ThemeContext] applied classes ->', {
        theme,
        themeStyle,
        themePreset,
        htmlClassList: root.className
      })
    } catch (e) {
      // ignore
    }

    // Fallback inline background (temporary) to ensure selected background is visible
    // This helps when CSS specificity/layering prevents stylesheet rules from showing.
    try {
      if (theme === 'dark' && themeStyle && themeStyle !== 'default' && themePreset === 'default') {
        let bg = ''
        switch (themeStyle) {
          case 'orchid':
            bg = 'radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)'
            break
          case 'aurora':
            bg = 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,180,255,0.25), transparent 70%), #000000'
            break
          case 'crimson':
            bg = 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,80,120,0.25), transparent 70%), #000000'
            break
          case 'pearl':
            bg = 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226,232,240,0.15), transparent 70%), #000000'
            break
          default:
            bg = ''
        }
        if (bg) {
          // apply fallback to :root
          root.style.background = bg
          root.style.backgroundAttachment = 'fixed'
          root.style.backgroundRepeat = 'no-repeat'
          root.style.backgroundPosition = themeStyle === 'orchid' ? '50% 100%' : '50% 0%'
          // robust fallback: also apply to visible wrapper if present
          const wrapper = document.querySelector('.min-h-screen.bg-background')
          if (wrapper) {
            wrapper.style.background = bg
            wrapper.style.backgroundAttachment = 'fixed'
            wrapper.style.backgroundRepeat = 'no-repeat'
            wrapper.style.backgroundPosition = themeStyle === 'orchid' ? '50% 100%' : '50% 0%'
          }
        } else {
          // clear any previous fallback if this style has no mapping
          root.style.background = ''
          root.style.backgroundAttachment = ''
          root.style.backgroundRepeat = ''
          root.style.backgroundPosition = ''
          const wrapper = document.querySelector('.min-h-screen.bg-background')
          if (wrapper) {
            wrapper.style.background = ''
            wrapper.style.backgroundAttachment = ''
            wrapper.style.backgroundRepeat = ''
            wrapper.style.backgroundPosition = ''
          }
        }
      } else if (theme === 'light' && themeStyle && themeStyle !== 'default' && themePreset === 'default') {
        let bg = ''
        switch (themeStyle) {
          case 'bottom-slate':
            bg = 'radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #475569 100%)'
            break
          case 'bottom-violet':
            bg = 'radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #7c3aed 100%)'
            break
          case 'aurora-dream':
            bg = 'radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175,109,255,0.42), transparent 60%), radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255,235,170,0.55), transparent 62%), linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)'
            break
          case 'diagonal-stripes':
            bg = 'repeating-linear-gradient(45deg, transparent, transparent 2px, #f3f4f6 2px, #f3f4f6 4px)'
            break
          default:
            bg = ''
        }
        if (bg) {
          root.style.background = bg
          root.style.backgroundAttachment = 'fixed'
          root.style.backgroundRepeat = 'repeat'
          root.style.backgroundPosition = themeStyle === 'aurora-dream' ? '0% 0%' : '50% 90%'
          const wrapper = document.querySelector('.min-h-screen.bg-background')
          if (wrapper) {
            wrapper.style.background = bg
            wrapper.style.backgroundAttachment = 'fixed'
            wrapper.style.backgroundRepeat = 'repeat'
            wrapper.style.backgroundPosition = themeStyle === 'aurora-dream' ? '0% 0%' : '50% 90%'
          }
        } else {
          // clear any previous fallback if this light style has no mapping
          root.style.background = ''
          root.style.backgroundAttachment = ''
          root.style.backgroundRepeat = ''
          root.style.backgroundPosition = ''
          const wrapper = document.querySelector('.min-h-screen.bg-background')
          if (wrapper) {
            wrapper.style.background = ''
            wrapper.style.backgroundAttachment = ''
            wrapper.style.backgroundRepeat = ''
            wrapper.style.backgroundPosition = ''
          }
        }
      } else {
        // Clear fallback when not applicable
        root.style.background = ''
        root.style.backgroundAttachment = ''
        root.style.backgroundRepeat = ''
        root.style.backgroundPosition = ''
        const wrapper = document.querySelector('.min-h-screen.bg-background')
        if (wrapper) {
          wrapper.style.background = ''
          wrapper.style.backgroundAttachment = ''
          wrapper.style.backgroundRepeat = ''
          wrapper.style.backgroundPosition = ''
        }
      }
    } catch (e) {
      // ignore
    }
    
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
