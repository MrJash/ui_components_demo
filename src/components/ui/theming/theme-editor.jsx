import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Palette, Download, Upload, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card'
import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
import { AnimatedTabs, TabsContent, TabsList, TabsTrigger } from '../animated-tabs'
import { Separator } from '../separator'
import { Badge } from '../badge'
import { ScrollArea } from '../scroll-area'
import { Alert, AlertDescription } from '../alert'

// Color picker component
const ColorPicker = ({ label, value, onChange, description }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleColorChange = (newValue) => {
    setInputValue(newValue)
    onChange(newValue)
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (newValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(newValue)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-6 h-6 rounded border border-border cursor-pointer"
            style={{ backgroundColor: value }}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-20 h-6 text-xs px-2"
            placeholder="#000000"
          />
          <input
            type="color"
            value={value}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-8 h-6 rounded border border-border cursor-pointer"
          />
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && description && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-xs text-muted-foreground overflow-hidden"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// Theme preset definitions
const defaultThemePresets = {
  default: {
    name: 'Default',
    colors: {
      primary: '#0f172a',
      secondary: '#f1f5f9',
      accent: '#3b82f6',
      muted: '#f8fafc',
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#ffffff',
      border: '#e2e8f0',
      input: '#ffffff',
      ring: '#3b82f6',
      destructive: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      primary: '#f8fafc',
      secondary: '#1e293b',
      accent: '#3b82f6',
      muted: '#0f172a',
      background: '#020817',
      foreground: '#f8fafc',
      card: '#020817',
      border: '#1e293b',
      input: '#0f172a',
      ring: '#3b82f6',
      destructive: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#0891b2',
      secondary: '#f0f9ff',
      accent: '#06b6d4',
      muted: '#ecfeff',
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#ffffff',
      border: '#e0f2fe',
      input: '#ffffff',
      ring: '#06b6d4',
      destructive: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#ea580c',
      secondary: '#fff7ed',
      accent: '#f97316',
      muted: '#fef3c7',
      background: '#ffffff',
      foreground: '#0f172a',
      card: '#ffffff',
      border: '#fed7aa',
      input: '#ffffff',
      ring: '#f97316',
      destructive: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
    }
  }
}

export function ThemeEditor({ isOpen, onClose, currentPreset = 'default' }) {
  const [activeTheme, setActiveTheme] = useState(defaultThemePresets[currentPreset])
  const [customPresets, setCustomPresets] = useState({})
  const [activeTab, setActiveTab] = useState('colors')
  const [selectedPreset, setSelectedPreset] = useState(currentPreset)
  const [lastCustomTheme, setLastCustomTheme] = useState(null)

  // Load saved custom presets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('customThemePresets')
    if (saved) {
      try {
        setCustomPresets(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to load custom presets:', error)
      }
    }

    // Load last custom theme
    const savedCustomTheme = localStorage.getItem('lastCustomTheme')
    if (savedCustomTheme) {
      try {
        setLastCustomTheme(JSON.parse(savedCustomTheme))
      } catch (error) {
        console.error('Failed to load last custom theme:', error)
      }
    }
  }, [])

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Initialize with current preset when opened
  useEffect(() => {
    if (isOpen && currentPreset && defaultThemePresets[currentPreset]) {
      setActiveTheme(defaultThemePresets[currentPreset])
      setSelectedPreset(currentPreset)
    }
    
    // Always open on Colors tab when modal opens
    if (isOpen) {
      setActiveTab('colors')
    }
  }, [isOpen, currentPreset])

  // Update selected preset when theme changes
  useEffect(() => {
    const currentPresetName = getCurrentPresetName()
    setSelectedPreset(currentPresetName)
  }, [activeTheme])

  // Check if current theme matches any built-in preset
  const isThemeCustom = () => {
    return !Object.values(defaultThemePresets).some(preset => 
      JSON.stringify(preset.colors) === JSON.stringify(activeTheme.colors)
    )
  }

  // Get current preset name (Custom if modified)
  const getCurrentPresetName = () => {
    if (isThemeCustom()) return 'Custom'
    const matchingPreset = Object.entries(defaultThemePresets).find(([key, preset]) => 
      JSON.stringify(preset.colors) === JSON.stringify(activeTheme.colors)
    )
    return matchingPreset ? matchingPreset[0] : 'Custom'
  }

  // Save custom presets to localStorage
  const saveCustomPresets = (presets) => {
    setCustomPresets(presets)
    localStorage.setItem('customThemePresets', JSON.stringify(presets))
  }

  // Update color value
  const updateColor = (colorKey, value) => {
    const newTheme = {
      ...activeTheme,
      colors: {
        ...activeTheme.colors,
        [colorKey]: value
      }
    }
    
    setActiveTheme(newTheme)
    
    // Save as last custom theme
    const customTheme = {
      name: 'Custom',
      colors: newTheme.colors
    }
    setLastCustomTheme(customTheme)
    localStorage.setItem('lastCustomTheme', JSON.stringify(customTheme))
    
    // Set to Custom when user modifies colors
    setSelectedPreset('Custom')
  }

  // Reset to default
  const resetTheme = () => {
    setActiveTheme(defaultThemePresets[currentPreset] || defaultThemePresets.default)
  }

  // Select preset
  const selectPreset = (presetKey) => {
    if (presetKey === 'Custom' && lastCustomTheme) {
      setActiveTheme(lastCustomTheme)
      setSelectedPreset('Custom')
    } else if (defaultThemePresets[presetKey]) {
      setActiveTheme(defaultThemePresets[presetKey])
      setSelectedPreset(presetKey)
    }
  }

  // Export theme
  const exportTheme = () => {
    const themeData = {
      name: activeTheme.name,
      colors: activeTheme.colors,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Import theme
  const importTheme = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target.result)
        if (themeData.colors) {
          setActiveTheme({
            name: themeData.name || 'Imported Theme',
            colors: themeData.colors
          })
        }
      } catch (error) {
        console.error('Failed to import theme:', error)
      }
    }
    reader.readAsText(file)
  }

  const colorCategories = {
    primary: {
      title: 'Primary Colors',
      colors: ['primary', 'secondary', 'accent'],
      descriptions: {
        primary: 'Main brand color used for primary buttons and key elements',
        secondary: 'Secondary brand color for subtle accents and backgrounds',
        accent: 'Accent color for highlights and interactive elements'
      }
    },
    layout: {
      title: 'Layout Colors',
      colors: ['background', 'foreground', 'card', 'muted'],
      descriptions: {
        background: 'Main background color for the entire application',
        foreground: 'Primary text color that contrasts with background',
        card: 'Background color for cards and elevated components',
        muted: 'Muted background color for subtle sections'
      }
    },
    interface: {
      title: 'Interface Colors',
      colors: ['border', 'input', 'ring'],
      descriptions: {
        border: 'Border color for dividers and component outlines',
        input: 'Background color for form inputs and text fields',
        ring: 'Focus ring color for keyboard navigation and accessibility'
      }
    },
    semantic: {
      title: 'Semantic Colors',
      colors: ['destructive', 'warning', 'success'],
      descriptions: {
        destructive: 'Color for dangerous actions like delete buttons',
        warning: 'Color for warning messages and caution states',
        success: 'Color for success messages and positive feedback'
      }
    }
  }

  // Prevent body scroll when modal is open and fix scrollbar shift
  useEffect(() => {
    if (isOpen) {
      // Get current scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      
      // Store original styles
      const originalOverflow = document.body.style.overflow
      const originalPaddingRight = document.body.style.paddingRight
      
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.pointerEvents = 'none'
      
      // Also apply to any fixed positioned elements like navbar
      const navbar = document.querySelector('[class*="sticky"], [class*="fixed"]')
     
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      document.body.style.pointerEvents = ''
      
      // Reset navbar padding
      const navbar = document.querySelector('[class*="sticky"], [class*="fixed"]')
      if (navbar) {
        navbar.style.paddingRight = ''
      }
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      document.body.style.pointerEvents = ''
      
      const navbar = document.querySelector('[class*="sticky"], [class*="fixed"]')
      if (navbar) {
        navbar.style.paddingRight = ''
      }
    }
  }, [isOpen])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999]"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            pointerEvents: 'auto'
          }}
        >
          {/* Modal container - centered */}
          <div className="flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-background border border-border rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <Palette className="h-5 w-5 text-primary" />
              <div>
                <h2 className="text-lg font-semibold">Theme Editor</h2>
                <p className="text-sm text-muted-foreground">
                  Customize your application's color scheme
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={resetTheme}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={exportTheme}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={importTheme}
                  className="hidden"
                />
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </span>
                </Button>
              </label>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
   <AnimatedTabs
    value={activeTab}
    onValueChange={setActiveTab}
    className="w-full h-full flex flex-col font-bold"
  >
    <div className="px-6 pt-4">
      <TabsList className="grid w-full py-3 grid-cols-3">
        <TabsTrigger
          value="colors"
          className="text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Colors
        </TabsTrigger>

        <TabsTrigger
          value="basic-presets"
          className="text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Basic Presets
        </TabsTrigger>

        <TabsTrigger
          value="preview"
          className="text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Preview
        </TabsTrigger>
      </TabsList>
    </div>

    <TabsContent value="colors" className="flex-1 overflow-hidden">
      <ScrollArea
        className="h-full px-6"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="space-y-6 py-6">
          <div className="flex items-center justify-between">
            <div>
                        <h3 className="text-lg font-medium">Color Configuration</h3>
                        <p className="text-sm text-muted-foreground">
                          Customize individual colors for your theme
                        </p>
                      </div>
                    </div>

                    {Object.entries(colorCategories).map(([categoryKey, category]) => (
                      <Card key={categoryKey} className="will-change-auto">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">{category.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {category.colors.map(colorKey => (
                            <div key={colorKey} className="will-change-auto">
                              <ColorPicker
                                label={colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
                                value={activeTheme.colors[colorKey]}
                                onChange={(value) => updateColor(colorKey, value)}
                                description={category.descriptions[colorKey]}
                              />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                    
                    {/* Bottom spacer to ensure last content is fully visible */}
                  
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="basic-presets" className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-6">
                  <div className="space-y-6 py-6">
                    <div>
                      <h3 className="text-lg font-medium">Theme Presets</h3>
                      <p className="text-sm text-muted-foreground">
                        Choose from basic built-in presets or manage your custom themes
                      </p>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Built-in Presets</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Custom preset option - always visible */}
                          <Card 
                            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                              selectedPreset === 'Custom' ? 'ring-2 ring-primary' : ''
                            } ${!lastCustomTheme ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => lastCustomTheme && selectPreset('Custom')}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium">Custom</h4>
                                  {selectedPreset === 'Custom' && (
                                    <Badge variant="secondary" className="text-xs">Active</Badge>
                                  )}
                                  {!lastCustomTheme && (
                                    <Badge variant="outline" className="text-xs">Empty</Badge>
                                  )}
                                </div>
                                <div className="flex space-x-1">
                                  {lastCustomTheme ? (
                                    ['primary', 'secondary', 'accent'].map(color => (
                                      <div
                                        key={color}
                                        className="w-4 h-4 rounded-full border border-border"
                                        style={{ backgroundColor: lastCustomTheme.colors[color] }}
                                      />
                                    ))
                                  ) : (
                                    ['primary', 'secondary', 'accent'].map(color => (
                                      <div
                                        key={color}
                                        className="w-4 h-4 rounded-full border border-border bg-muted"
                                      />
                                    ))
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* Built-in presets */}
                          {Object.entries(defaultThemePresets).map(([key, preset]) => (
                            <Card 
                              key={key}
                              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                                selectedPreset === key ? 'ring-2 ring-primary' : ''
                              }`}
                              onClick={() => selectPreset(key)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium">{preset.name}</h4>
                                    {selectedPreset === key && (
                                      <Badge variant="secondary" className="text-xs">Active</Badge>
                                    )}
                                  </div>
                                  <div className="flex space-x-1">
                                    {['primary', 'secondary', 'accent'].map(color => (
                                      <div
                                        key={color}
                                        className="w-4 h-4 rounded-full border border-border"
                                        style={{ backgroundColor: preset.colors[color] }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                   
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="preview" className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-6">
                  <div className="space-y-6 py-6">
                    <div>
                      <h3 className="text-lg font-medium">Theme Preview</h3>
                      <p className="text-sm text-muted-foreground">
                        Preview how your theme colors will look in components
                      </p>
                    </div>

                    {/* Current theme colors display */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Color Palette</CardTitle>
                        <CardDescription>
                          Current theme: {activeTheme.name}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(activeTheme.colors).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <div 
                                className="w-full h-12 rounded border border-border"
                                style={{ backgroundColor: value }}
                              />
                              <div className="text-center">
                                <p className="text-xs font-medium capitalize">{key}</p>
                                <p className="text-xs text-muted-foreground">{value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sample components for preview with theme applied */}
                    <div className="space-y-4">
                      <div className="theme-preview space-y-4">
                        {/* Sample Card */}
                        <div 
                          className="rounded-lg border p-6 shadow-sm"
                          style={{
                            backgroundColor: activeTheme.colors.card,
                            borderColor: activeTheme.colors.border,
                            color: activeTheme.colors.foreground
                          }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-lg font-semibold" style={{ color: activeTheme.colors.foreground }}>
                                Sample Card
                              </h3>
                              <p className="text-sm" style={{ color: activeTheme.colors.foreground + '99' }}>
                                This is how cards will look with your theme
                              </p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button 
                                className="px-4 py-2 rounded-md font-medium transition-colors hover:opacity-90"
                                style={{
                                  backgroundColor: activeTheme.colors.primary,
                                  color: activeTheme.colors.background
                                }}
                              >
                                Primary Button
                              </button>
                              <button 
                                className="px-4 py-2 rounded-md font-medium transition-colors hover:opacity-90"
                                style={{
                                  backgroundColor: activeTheme.colors.secondary,
                                  color: activeTheme.colors.foreground
                                }}
                              >
                                Secondary
                              </button>
                              <button 
                                className="px-4 py-2 rounded-md font-medium border transition-colors hover:opacity-90"
                                style={{
                                  borderColor: activeTheme.colors.border,
                                  color: activeTheme.colors.foreground,
                                  backgroundColor: 'transparent'
                                }}
                              >
                                Outline
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Alerts and Form */}
                        <div 
                          className="rounded-lg border p-6 shadow-sm space-y-4"
                          style={{
                            backgroundColor: activeTheme.colors.card,
                            borderColor: activeTheme.colors.border
                          }}
                        >
                          {/* Destructive Alert */}
                          <div 
                            className="p-4 rounded-md border"
                            style={{
                              backgroundColor: activeTheme.colors.destructive + '20',
                              borderColor: activeTheme.colors.destructive,
                              color: activeTheme.colors.destructive
                            }}
                          >
                            <p className="text-sm">
                              This is a destructive alert using your custom theme colors.
                            </p>
                          </div>
                          
                          {/* Warning Alert */}
                          <div 
                            className="p-4 rounded-md border"
                            style={{
                              backgroundColor: activeTheme.colors.warning + '20',
                              borderColor: activeTheme.colors.warning,
                              color: activeTheme.colors.warning
                            }}
                          >
                            <p className="text-sm">
                              This is a warning alert using your custom theme colors.
                            </p>
                          </div>
                          
                          {/* Success Alert */}
                          <div 
                            className="p-4 rounded-md border"
                            style={{
                              backgroundColor: activeTheme.colors.success + '20',
                              borderColor: activeTheme.colors.success,
                              color: activeTheme.colors.success
                            }}
                          >
                            <p className="text-sm">
                              This is a success alert using your custom theme colors.
                            </p>
                          </div>
                          
                          {/* Separator */}
                          <div 
                            className="h-px w-full"
                            style={{ backgroundColor: activeTheme.colors.border }}
                          />
                          
                          {/* Form Elements */}
                          <div className="flex space-x-2">
                            <input 
                              type="text"
                              placeholder="Sample input field"
                              className="flex-1 px-3 py-2 rounded-md border text-sm"
                              style={{
                                backgroundColor: activeTheme.colors.input,
                                borderColor: activeTheme.colors.border,
                                color: activeTheme.colors.foreground
                              }}
                            />
                            <button 
                              className="px-4 py-2 rounded-md font-medium text-sm transition-colors hover:opacity-90"
                              style={{
                                backgroundColor: activeTheme.colors.accent,
                                color: activeTheme.colors.background
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </ScrollArea>
              </TabsContent>
            </AnimatedTabs>
          </div>
        </motion.div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ThemeEditor
