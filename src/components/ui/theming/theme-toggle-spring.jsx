import React, { useState } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../../contexts/ThemeContext'

export function ThemeToggleSpring() {
  const { theme, toggleTheme } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)

  // Spring animation for the toggle button
  const buttonSpring = useSpring({
    scale: isAnimating ? 1.1 : 1,
    rotate: theme === 'dark' ? 360 : 0,
    config: config.wobbly,
  })

  // Spring animation for the icon
  const iconSpring = useSpring({
    opacity: 1,
    transform: `rotate(${theme === 'dark' ? 360 : 0}deg) scale(${isAnimating ? 1.2 : 1})`,
    config: { tension: 300, friction: 10 },
  })

  const handleClick = (event) => {
    setIsAnimating(true)
    
    // Create full-page ripple effect
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: fixed;
      top: ${centerY}px;
      left: ${centerX}px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${theme === 'dark' 
        ? 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
      };
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      animation: ripple-expand 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    `
    
    // Add CSS animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes ripple-expand {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0.6;
        }
        100% {
          transform: translate(-50%, -50%) scale(50);
          opacity: 0;
        }
      }
    `
    
    document.head.appendChild(style)
    document.body.appendChild(ripple)
    
    // Toggle theme with delay
    setTimeout(() => {
      toggleTheme()
    }, 200)
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(ripple)
      document.head.removeChild(style)
      setIsAnimating(false)
    }, 800)
  }

  return (
    <animated.button
      onClick={handleClick}
      style={buttonSpring}
      className="relative w-9 h-9 p-0 bg-transparent border-0 cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      aria-label="Toggle theme"
      disabled={isAnimating}
    >
      <animated.div style={iconSpring} className="flex items-center justify-center w-full h-full">
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-white" />
        ) : (
          <Moon className="w-4 h-4 text-gray-700" />
        )}
      </animated.div>
    </animated.button>
  )
}
