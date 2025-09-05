import React, { Suspense, useState } from 'react'
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Theme Showcase</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive showcase of theme switching components and customization options. Features interactive toggle animations, theme layouts, and styling controls for building modern dark/light mode experiences.
        </p>
      </div>

      <Separator />

      {/* Theme Toggle Animations Section */}
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
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
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
              <CardContent className="flex items-center justify-center py-8">
                <ThemeToggle />
              </CardContent>
            </Card>

            <Card>
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
              <CardContent className="flex items-center justify-center py-8">
                <Suspense fallback={<LoadingToggle />}>
                  <ThemeToggleFramer />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
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
              <CardContent className="flex items-center justify-center py-8">
                <Suspense fallback={<LoadingToggle />}>
                  <ThemeToggleSpring />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4" />
                  <CardTitle className="text-base">Custom CSS Animations</CardTitle>
                </div>
                <CardDescription>
                  More animation variations coming soon. Stay tuned for additional custom CSS animations and transitions.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center space-y-2">
                  <div className="text-muted-foreground text-sm">🚧 Coming Soon</div>
                  <p className="text-xs text-muted-foreground">More animations adding soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <ThemeLayoutTabs />
    </div>
  )
}
