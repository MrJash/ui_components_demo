import React, { useState } from 'react'
import { AnimatedTabs, TabsContent, TabsList, TabsTrigger } from '../animated-tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card'
import { Badge } from '../badge'
import { useTheme } from '../../../contexts/ThemeContext'
import { Monitor, Moon, Sun, Palette, Paintbrush2 } from 'lucide-react'
import '../../../styles/presets/amethyst-haze.css'

export function ThemeLayoutTabs() {
  const { theme, themeStyle, setThemeStyle, themePreset, setThemePreset } = useTheme()

  const lightStyles = [
    {
      id: 'default',
      name: 'Plain White',
      description: 'Clean white background with subtle shadows',
      preview: 'bg-white border-gray-200',
      icon: <Sun className="w-4 h-4" />
    },
    {
      id: 'gray',
      name: 'Soft Gray',
      description: 'Gentle gray background for reduced eye strain',
      preview: 'bg-gray-50 border-gray-300',
      icon: <Monitor className="w-4 h-4" />
    }
  ]

  const darkStyles = [
    {
      id: 'default',
      name: 'Dark Blue',
      description: 'Modern dark theme with blue undertones',
      preview: 'bg-slate-900 border-slate-700',
      icon: <Moon className="w-4 h-4" />
    },
    {
      id: 'oled',
      name: 'OLED Black',
      description: 'Pure black for OLED displays and battery saving',
      preview: 'bg-black border-gray-800',
      icon: <Palette className="w-4 h-4" />
    }
  ]

  const currentStyles = theme === 'dark' ? darkStyles : lightStyles

  const handleStyleChange = (styleId) => {
    setThemeStyle(styleId)
  }

  // Preset themes that will be provided by tweakcn
  const presetThemes = [
    {
      id: 'default',
      name: 'Default',
      description: 'The default shadcn/ui theme',
      colors: {
        primary: 'hsl(222.2 84% 4.9%)',
        accent: 'hsl(210 40% 96%)',
      }
    },
    {
      id: 'amethyst-haze',
      name: 'Amethyst Haze',
      description: 'Soft purple-themed colors with elegant hues',
      colors: {
        primary: 'hsl(258 29% 58%)', // #8a79ab
        accent: 'hsl(336 45% 79%)', // #e6a5b8
      }
    },
    {
      id: 'red',
      name: 'Red',
      description: 'Bold red accent theme',
      colors: {
        primary: 'hsl(0 84% 60%)',
        accent: 'hsl(0 40% 96%)',
      }
    },
    {
      id: 'blue',
      name: 'Blue',
      description: 'Cool blue accent theme',
      colors: {
        primary: 'hsl(221.2 83.2% 53.3%)',
        accent: 'hsl(210 40% 96%)',
      }
    },
    // More presets will be added from tweakcn
  ]

  const handlePresetChange = (presetId) => {
    setThemePreset(presetId)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <CardTitle>Theme Customization</CardTitle>
        </div>
        <CardDescription>
          Customize your theme colors and backgrounds
        </CardDescription>
      </CardHeader>
      <CardContent>
  <AnimatedTabs defaultValue="backgrounds" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backgrounds" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode Backgrounds</span>
              </h4>
              
              {currentStyles.map((style) => (
                <div
                  key={style.id}
                  className={`
                    relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${themeStyle === style.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => handleStyleChange(style.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-8 rounded border-2 ${style.preview}`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        {style.icon}
                        <h4 className="font-medium">{style.name}</h4>
                        {themeStyle === style.id && (
                          <Badge variant="secondary" className="text-xs">Active</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {style.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Monitor className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> {theme === 'dark' 
                    ? 'OLED Black saves battery on OLED displays and provides true black backgrounds.'
                    : 'Soft Gray reduces eye strain during extended use.'
                  }
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="presets" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center space-x-2">
                <Paintbrush2 className="w-4 h-4" />
                <span>Color Presets</span>
              </h4>
              
              {presetThemes.map((preset) => (
                <div
                  key={preset.id}
                  className={`
                    relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${themePreset === preset.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => handlePresetChange(preset.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex space-x-1">
                      <div 
                        className="w-6 h-8 rounded border-2" 
                        style={{ backgroundColor: preset.colors.primary }}
                      />
                      <div 
                        className="w-6 h-8 rounded border-2" 
                        style={{ backgroundColor: preset.colors.accent }}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{preset.name}</h4>
                        {themePreset === preset.id && (
                          <Badge variant="secondary" className="text-xs">Active</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {preset.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <Paintbrush2 className="w-4 h-4 mt-0.5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <strong>Coming Soon:</strong> More color presets from tweakcn will be available here. 
                  These will include various accent colors and theme combinations.
                </div>
              </div>
            </div>
          </TabsContent>
  </AnimatedTabs>
      </CardContent>
    </Card>
  )
}
