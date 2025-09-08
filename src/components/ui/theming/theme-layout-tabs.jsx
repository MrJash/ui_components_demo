import React, { useState } from 'react'
import { AnimatedTabs, TabsContent, TabsList, TabsTrigger } from '../animated-tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu'
import { Badge } from '../badge'
import { Button } from '../button'
import { useTheme } from '../../../contexts/ThemeContext'
import { Monitor, Moon, Sun, Palette, Paintbrush2, Info, Zap, Heart, Sparkles, Edit, Share2 } from 'lucide-react'
import '../../../styles/presets/amethyst-haze.css'
import '../../../styles/presets/sunset-horizon.css'
import '../../../styles/presets/bold-tech.css'
import '../../../styles/presets/elegant-luxury.css'
import '../../../styles/presets/nature.css'

export function ThemeLayoutTabs({ onCustomizeTheme, onShareTheme }) {
  const { theme, themeStyle, setThemeStyle, themePreset, setThemePreset } = useTheme()
  
  // State to remember the last selected background style before switching to presets
  const [lastSelectedStyle, setLastSelectedStyle] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastSelectedStyle') || 'default'
    }
    return 'default'
  })

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
    ,
    {
      id: 'bottom-slate',
      name: 'Bottom Slate Radial',
      description: 'Soft white to slate radial from bottom',
      preview: 'bg-white border-gray-200',
  style: { background: 'radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)' },
      icon: <Monitor className="w-4 h-4" />
    },
    {
      id: 'bottom-violet',
      name: 'Bottom Violet Radial',
      description: 'White to violet radial from bottom',
      preview: 'bg-white border-violet-700',
      style: { background: 'radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)' },
      icon: <Sun className="w-4 h-4" />
    },
    {
      id: 'aurora-dream',
      name: 'Aurora Dream Corner Whispers',
      description: 'Subtle multi-radial aurora on a soft background',
      preview: 'bg-gradient-to-br from-pink-50 to-yellow-50 border-gray-200',
      style: { background: `radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175,109,255,0.42), transparent 60%), radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255,235,170,0.55), transparent 62%), radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255,100,180,0.40), transparent 62%), radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120,190,255,0.45), transparent 62%), linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)` },
      icon: <Sun className="w-4 h-4" />
    },
    {
      id: 'diagonal-grid',
      name: 'Diagonal Grid - Light',
      description: 'Subtle diagonal grid on a light background',
      preview: 'bg-[#fafafa] border-gray-200',
      style: {
        backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px)`,
        backgroundSize: '40px 40px'
      },
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
    },
    {
      id: 'orchid',
      name: 'Orchid Depths',
      description: 'Deep purple gradient background with mystical vibes',
      preview: 'bg-gradient-to-t from-purple-900 to-black border-purple-700',
      style: { background: 'radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 100%' },
      icon: <Paintbrush2 className="w-4 h-4" />
    },
    {
      id: 'aurora',
      name: 'Aurora Midnight Glow',
      description: 'Black background with blue aurora glow from top',
  preview: 'bg-black border-blue-800 relative overflow-hidden',
  style: { background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120,180,255,0.25), transparent 70%), linear-gradient(#000000,#000000)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 0%' },
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'crimson',
      name: 'Crimson Shadow Glow',
      description: 'Black background with crimson red glow from top',
  preview: 'bg-black border-red-800 relative overflow-hidden',
  style: { background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,80,120,0.25), transparent 70%), linear-gradient(#000000,#000000)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 0%' },
      icon: <Heart className="w-4 h-4" />
    },
    {
      id: 'pearl',
      name: 'Pearl Mist Glow',
      description: 'Black background with pearl white glow from top',
  preview: 'bg-black border-gray-600 relative overflow-hidden',
  style: { background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226,232,240,0.15), transparent 70%), linear-gradient(#000000,#000000)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 0%' },
      icon: <Sparkles className="w-4 h-4" />
    }
    ,
    {
      id: 'dark-dot-matrix',
      name: 'Dark Dot Matrix',
      description: 'Subtle pixelated dot matrix on near-black background',
      preview: 'bg-[#0a0a0a] border-gray-800',
      style: { backgroundColor: '#0a0a0a', backgroundImage: 'radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px), radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)', backgroundSize: '10px 10px', imageRendering: 'pixelated' },
      icon: <Monitor className="w-4 h-4" />
    },
    {
      id: 'dark-noise-colored',
      name: 'Dark Noise Colored',
      description: 'Colorful noise pattern with purple, blue, and pink dots',
      preview: 'bg-black border-purple-500',
      style: { 
        backgroundColor: '#000000', 
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0), radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0), radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)`,
        backgroundSize: '20px 20px, 30px 30px, 25px 25px',
        backgroundPosition: '0 0, 10px 10px, 15px 5px'
      },
      icon: <Sparkles className="w-4 h-4" />
    }
  ]

  const currentStyles = theme === 'dark' ? darkStyles : lightStyles

  const handleStyleChange = (styleId) => {
    setThemeStyle(styleId)
    // Remember the last selected style
    setLastSelectedStyle(styleId)
    localStorage.setItem('lastSelectedStyle', styleId)
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
      id: 'sunset-horizon',
      name: 'Sunset Horizon',
      description: 'Warm orange and coral sunset-inspired theme',
      colors: {
        primary: 'hsl(11.6250 100% 68.6275%)',
        accent: 'hsl(26.1069 98.4962% 73.9216%)',
      }
    }
    ,
    {
      id: 'bold-tech',
      name: 'Bold Tech',
      description: 'High-contrast tech preset with vivid accents',
      colors: {
        primary: 'hsl(258.3117 89.5349% 66.2745%)',
        accent: 'hsl(214.2857 94.5946% 92.7451%)'
      }
    },
    {
      id: 'elegant-luxury',
      name: 'Elegant Luxury',
      description: 'Sophisticated luxury theme with gold and wine accents',
      colors: {
        primary: 'hsl(0 56% 39%)',
        accent: 'hsl(45 100% 89%)'
      }
    },
    {
      id: 'nature',
      name: 'Nature',
      description: 'Earthy green theme inspired by natural landscapes',
      colors: {
        primary: 'hsl(122 39% 33%)',
        accent: 'hsl(123 30% 84%)'
      }
    }
    
  ]

  const handlePresetChange = (presetId) => {
    setThemePreset(presetId)
    // When switching to a non-default preset, reset background style to default
    if (presetId !== 'default') {
      setThemeStyle('default')
    } else {
      // When switching back to default preset, restore the last selected style
      setThemeStyle(lastSelectedStyle)
    }
  }

  const handleSwitchToDefault = () => {
    setThemePreset('default')
    setThemeStyle(lastSelectedStyle)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <CardTitle>Theme Customization</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onCustomizeTheme}>
                <Palette className="mr-2 h-4 w-4" />
                Customize Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onShareTheme}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Theme
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>
          Customize your theme colors and backgrounds
        </CardDescription>
      </CardHeader>
      <CardContent>
  <AnimatedTabs defaultValue="backgrounds" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="text-sm sm:text-base md:text-lg lg:text-xl" value="backgrounds">Backgrounds</TabsTrigger>
            <TabsTrigger className="text-sm sm:text-base md:text-lg lg:text-xl" value="presets">Presets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backgrounds" className="space-y-4">
            {themePreset !== 'default' && (
              <div className="p-2 bg-muted/50 rounded-lg border border-muted">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2 text-muted-foreground min-w-0 flex-1">
                    <Info className="w-4 h-4 shrink-0" />
                    <p className="text-xs sm:text-sm">
                      Background customization is disabled when using color presets or wallpapers. 
                      <span className="hidden sm:inline"> Switch to "Default" preset to customize backgrounds.</span>
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSwitchToDefault}
                    className="shrink-0 text-xs rounded-full"
                  >
                    <span className="hidden sm:inline">Switch to Default</span>
                  </Button>
                </div>
              </div>
            )}
            
            <div className={`space-y-3 ${themePreset !== 'default' ? 'opacity-50 pointer-events-none' : ''}`}>
              <h4 className="font-medium text-sm flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode Backgrounds</span>
              </h4>
              
              {currentStyles.map((style) => (
                <div
                  key={style.id}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all duration-200
                    ${themePreset === 'default' ? 'cursor-pointer' : 'cursor-not-allowed'}
                    ${themeStyle === style.id && themePreset === 'default'
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => themePreset === 'default' && handleStyleChange(style.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-8 rounded border-2 ${style.preview}`} style={style.style} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        {style.icon}
                        <h4 className="font-medium">{style.name}</h4>
                        {themeStyle === style.id && themePreset === 'default' && (
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
