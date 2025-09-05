import React from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import { useTheme } from '../../../contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <DarkModeSwitch
      checked={theme === 'dark'}
      onChange={toggleTheme}
      size={20}
      animationProperties={{
        flip: {
          duration: 1000,
          timingFunction: 'ease-in-out',
        },
        circle: {
          duration: 500,
          timingFunction: 'ease-in-out',
        },
      }}
      moonColor="#ffffff"
      sunColor="#374151"
      style={{ cursor: 'pointer' }}
    />
  )
}
