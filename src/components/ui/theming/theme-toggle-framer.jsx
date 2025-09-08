import React, { useState, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../../contexts/ThemeContext'

export function ThemeToggleFramer() {
  const { theme, toggleTheme } = useTheme()
  const controls = useAnimation()
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize the component once the theme is properly loaded
  useEffect(() => {
    // Small delay to ensure theme context is fully loaded
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const handleToggle = () => {
    // Toggle theme immediately
    toggleTheme()
    
    // Trigger bounce animation after theme change
    controls.start({
      scale: [1, 1.2, 0.9, 1],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    })
  }

  // Advanced spring configuration
  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  }

  // Icon animation variants
  const iconVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      }
    },
    exit: {
      scale: 0,
      rotate: 180,
      opacity: 0,
      transition: {
        duration: 0.2,
      }
    }
  }

  // Button hover and tap animations
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15,
      }
    }
  }
 

  return (
    <motion.button
      onClick={handleToggle}
      className="relative w-16 h-9 bg-gray-200 dark:bg-gray-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary/50 overflow-hidden"
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      animate={controls}
      aria-label="Toggle theme"
      style={{
        opacity: isInitialized ? 1 : 0,
      }}
      disabled={!isInitialized}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={theme}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      />

      {/* Moving knob with enhanced physics */}
      <motion.div
        className="relative w-7 h-7 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center z-10"
        animate={{
          x: theme === 'dark' ? 28 : 0,
        }}
        transition={springConfig}
        whileHover={{
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        {/* Enhanced icon container with AnimatePresence */}
        <div className="w-4 h-4 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div
                key="sun"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute"
              >
                {/* Enhanced sun icon with rays animation */}
                <div className="relative">
                  <motion.div 
                    className="w-2.5 h-2.5 bg-gray-800 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Simplified sun rays */}
                  <div className="absolute inset-0">
                    <div className="absolute w-0.5 h-1 bg-gray-800 -top-1.5 left-1/2 transform -translate-x-1/2"></div>
                    <div className="absolute w-0.5 h-1 bg-gray-800 -bottom-1.5 left-1/2 transform -translate-x-1/2"></div>
                    <div className="absolute w-1 h-0.5 bg-gray-800 -left-1.5 top-1/2 transform -translate-y-1/2"></div>
                    <div className="absolute w-1 h-0.5 bg-gray-800 -right-1.5 top-1/2 transform -translate-y-1/2"></div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute"
              >
                {/* Enhanced moon icon */}
                <div className="relative w-3 h-3">
                  <motion.div 
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(255,255,255,0.3)",
                        "0 0 8px rgba(255,255,255,0.5)",
                        "0 0 0 rgba(255,255,255,0.3)"
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div 
                    className="absolute w-2 h-2 bg-gray-800 rounded-full top-0 right-0"
                    style={{
                      transform: 'translate(25%, -25%)'
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ripple effect on toggle */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
          key={theme} // Re-trigger animation on theme change
        />
      </motion.div>
    </motion.button>
  )
}
