import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import { Button } from '../components/ui/button'
import { ThemeToggle } from '../components/ui/theming/theme-toggle'
import { ThemeLayoutTabs } from '../components/ui/theming/theme-layout-tabs'
import { ThemeEditor } from '../components/ui/theming/theme-editor'
import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun, Palette, Zap, Settings, Sparkles, Edit, Share2 } from 'lucide-react'
import BasicSwitch from '../components/ui/external/switch-toggle'
import SparkleSwitch from '../components/ui/external/switch-toggle2'
import { ThemeToggleFramer } from '../components/ui/theming/theme-toggle-framer'
import { ThemeToggleSpring } from '../components/ui/theming/theme-toggle-spring'

// Lazy load the animation-heavy components - keeping as backup
// const ThemeToggleFramer = React.lazy(() => 
//   import('../components/ui/theming/theme-toggle-framer').then(module => ({ default: module.ThemeToggleFramer }))
// )
// const ThemeToggleSpring = React.lazy(() => 
//   import('../components/ui/theming/theme-toggle-spring').then(module => ({ default: module.ThemeToggleSpring }))
// )

// Simple fallback component - keeping for potential future use
// function LoadingToggle() {
//   return (
//     <div className="w-9 h-9 bg-muted rounded-full animate-pulse flex items-center justify-center">
//       <div className="w-4 h-4 bg-muted-foreground/20 rounded-full"></div>
//     </div>
//   )
// }

export default function ThemeToggleShowcase() {
  const { theme, toggleTheme } = useTheme()
  const [customToggleActive, setCustomToggleActive] = useState(false)
  const [selectedCustomToggle, setSelectedCustomToggle] = useState('basic')
  const [isThemeEditorOpen, setIsThemeEditorOpen] = useState(false)
  const [currentThemePreset, setCurrentThemePreset] = useState('default')
  
  // Sync custom toggle with current theme
  React.useEffect(() => {
    setCustomToggleActive(theme === 'dark')
  }, [theme])

  // Handle theme editor actions
  const handleCustomizeTheme = () => {
    setIsThemeEditorOpen(true)
  }

  const handleShareTheme = () => {
    // TODO: Implement theme sharing functionality
    console.log('Share theme functionality to be implemented')
  }
  
  // Custom toggle configurations
  const customToggles = {
    basic: {
      name: 'Basic CSS Toggle',
      description: 'Beautiful sun/moon toggle with animated SVG icons and smooth slider transitions. Features rotating sun and tilting moon animations.'
    },
    sparkle: {
      name: 'Sparkle Magic Toggle',
      description: 'Mesmerizing toggle with animated sparkles and magical transformation effects. Features container style queries and dynamic sparkle animations.'
    }
  }

  const renderCustomToggle = () => {
    switch (selectedCustomToggle) {
      case 'sparkle':
        return (
          <SparkleSwitch 
            checked={customToggleActive}
            onChange={() => {
              toggleTheme();
            }}
          />
        )
      case 'basic':
      default:
        return (
          <BasicSwitch 
            checked={customToggleActive}
            onChange={() => {
              toggleTheme();
            }}
          />
        )
    }
  }
  
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
                    <ThemeToggleFramer />
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
                    <ThemeToggleSpring />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item} className="h-full">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4" />
                        <CardTitle className="text-base">Custom CSS Animations</CardTitle>
                      </div>
                      <Select value={selectedCustomToggle} onValueChange={setSelectedCustomToggle}>
                        <SelectTrigger className="w-[220px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic CSS Toggle</SelectItem>
                          <SelectItem value="sparkle">Sparkle Magic Toggle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <CardDescription>
                      {customToggles[selectedCustomToggle].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8 flex-1">
                    {renderCustomToggle()}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
        </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <ThemeLayoutTabs 
          onCustomizeTheme={handleCustomizeTheme}
          onShareTheme={handleShareTheme}
        />
      </motion.div>

      {/* Theme Editor Modal */}
      <ThemeEditor 
        isOpen={isThemeEditorOpen}
        onClose={() => setIsThemeEditorOpen(false)}
        currentPreset={currentThemePreset}
      />
    </motion.div>
  )
}
