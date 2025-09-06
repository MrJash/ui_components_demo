import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card'
import { Button } from '../button'
import { Badge } from '../badge'
import { useTheme } from '../../../contexts/ThemeContext'

export function ThemeStyleSelector() {
  const { theme, themeStyle, setThemeStyle } = useTheme()

 
  const currentStyles = theme === 'dark' ? darkStyles : lightStyles

  const handleStyleChange = (styleId) => {
    setThemeStyle(styleId)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <CardTitle>Theme Style</CardTitle>
        </div>
        <CardDescription>
          Customize your {theme} mode appearance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
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
                <div 
                  className={`w-12 h-8 rounded border-2 ${style.preview}`}
                  style={style.style || {}}
                />
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
                ? themeStyle === 'oled' 
                  ? 'OLED Black saves battery on OLED displays and provides true black backgrounds.'
                  : themeStyle === 'orchid'
                  ? 'Orchid Depths provides a rich, elegant purple gradient perfect for creative work.'
                  : 'Dark Blue offers a modern professional look with comfortable blue undertones.'
                : 'Soft Gray reduces eye strain in bright environments while maintaining readability.'
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
