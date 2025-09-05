import React, { useEffect } from 'react'
import useDarkMode from 'use-dark-mode'
import { Moon, Sun } from 'lucide-react'
import { Button } from '../button'

export function ThemeToggleUseDarkMode() {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
  })

  // Sync with our theme context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(darkMode.value ? 'dark' : 'light')
    }
  }, [darkMode.value])

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={darkMode.toggle}
      className="relative w-9 h-9 p-0 transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 transition-transform duration-500">
        {darkMode.value ? (
          <Sun className="h-4 w-4 transition-all duration-500 rotate-0 scale-100" />
        ) : (
          <Moon className="h-4 w-4 transition-all duration-500 rotate-0 scale-100" />
        )}
      </div>
      
      {/* Animated background */}
      <div 
        className={`
          absolute inset-0 rounded-full transition-all duration-500 opacity-20
          ${darkMode.value 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-110' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 scale-90'
          }
        `}
      />
    </Button>
  )
}
