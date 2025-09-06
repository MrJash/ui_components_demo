import React, { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { ThemeToggle } from '../components/ui/theming/theme-toggle'
import { ThemeLayoutTabs } from '../components/ui/theming/theme-layout-tabs'
import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun, Palette, Zap, Settings, Sparkles } from 'lucide-react'

// Lazy load the animation-heavy components
const ThemeToggleFramer = React.lazy(() => 
  import('../components/ui/theming/theme-toggle-framer').then(module => ({ default: module.ThemeToggleFramer }))
)
const ThemeToggleSpring = React.lazy(() => 
  import('../components/ui/theming/theme-toggle-spring').then(module => ({ default: module.ThemeToggleSpring }))
)

// Simple fallback component
function LoadingToggle() {
  return (
    <div className="w-9 h-9 bg-muted rounded-full animate-pulse flex items-center justify-center">
      <div className="w-4 h-4 bg-muted-foreground/20 rounded-full"></div>
    </div>
  )
}

export default function ThemeToggleShowcase() {
  const { theme, toggleTheme } = useTheme()
  const [customToggleActive, setCustomToggleActive] = useState(false)
  
  // Sync custom toggle with current theme
  React.useEffect(() => {
    setCustomToggleActive(theme === 'dark')
  }, [theme])
  
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
  }

  // Slightly less intense than your suggested values
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 18 }
    }
  }

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight">Theme Showcase</h1>
        <p className="text-muted-foreground">
          Explore a comprehensive showcase of theme-switching components and customization options. Discover interactive toggle animations, background colors, and pre-defined presets to create modern dark and light mode experiences for your website.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Separator />
      </motion.div>

      {/* Theme Toggle Animations Section */}
      <motion.div variants={item}>
        <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle>Theme Toggle Animations</CardTitle>
          </div>
          <CardDescription>
            Interactive theme toggles with various animation libraries and styles
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6 md:grid-cols-2 h-full">
              <motion.div variants={item} className="h-full">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <CardTitle className="text-base">react-toggle-dark-mode</CardTitle>
                    </div>
                    <CardDescription>
                      Popular library with smooth flip animations and customizable colors.
                      Lightweight and battle-tested.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8 flex-1">
                    <ThemeToggle />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item} className="h-full">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <CardTitle className="text-base">Framer Motion</CardTitle>
                    </div>
                    <CardDescription>
                      Smooth spring-based toggle animation with fluid motion physics.
                      Clean design with animated icon transitions and hover effects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8 flex-1">
                    <Suspense fallback={<LoadingToggle />}>
                      <ThemeToggleFramer />
                    </Suspense>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item} className="h-full">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <CardTitle className="text-base">React Spring</CardTitle>
                    </div>
                    <CardDescription>
                      Physics-based animations with full-page ripple effects.
                      Fluid and natural motion with spring physics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8 flex-1">
                    <Suspense fallback={<LoadingToggle />}>
                      <ThemeToggleSpring />
                    </Suspense>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item} className="h-full">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <CardTitle className="text-base">Custom CSS Animations</CardTitle>
                    </div>
                    <CardDescription>
                      Custom CSS toggle with smooth transitions and icon animations.
                      Lightweight solution using only CSS animations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8 flex-1">
                    <div className="custom-toggle-demo">
                      <button
                        className={`btn ${customToggleActive ? 'darkmode' : ''}`}
                        onClick={(e) => {
                          toggleTheme();
                          const icon = e.currentTarget.querySelector('.btn__icon');
                          icon.classList.add('animated');
                          setTimeout(() => icon.classList.remove('animated'), 500);
                        }}
                        aria-label="Toggle theme"
                      >
                        <div className="btn__indicator">
                          <div className="btn__icon-container">
                            <div className="btn__icon">{customToggleActive ? '🌙' : '☀️'}</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
        </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <ThemeLayoutTabs />
      </motion.div>
    </motion.div>
  )
}
