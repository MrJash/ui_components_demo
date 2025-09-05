import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Link, useLocation } from 'wouter'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { ThemeToggle } from './ui/theming/theme-toggle'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Menu, ChevronDown, ChevronUp, X, Navigation as NavigationIcon, Layers, BarChart3, Palette } from 'lucide-react'

// Create context for navbar expansion state
export const NavbarContext = createContext({
  isExpanded: false,
  expandedHeight: 0
})

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Buttons', href: '/buttons' },
  { name: 'Forms', href: '/forms' },
  { name: 'Data Display', href: '/data-display' },
  { name: 'Layout', href: '/layout' },
]

const moreNavigation = [
  { name: 'Navigation', href: '/navigation', icon: NavigationIcon },
  { name: 'Overlays & Feedback', href: '/overlays', icon: Layers },
  { name: 'Charts & Data Viz', href: '/charts', icon: BarChart3 },
  { name: 'Theme Showcase', href: '/theme-toggles', icon: Palette },
]

export default function Navbar() {
  const [location] = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef(null)

  // Handle click outside to close expanded menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <nav ref={navRef} className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-bold text-foreground">UI Showcase</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={location === item.href ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'text-sm font-medium transition-colors',
                    location === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            
            {/* Expand/Collapse Toggle with Animated Icon */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <motion.div
                animate={{ 
                  scale: isExpanded ? 1.1 : 1,
                  rotate: isExpanded ? 180 : 0
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
              <span className="sr-only">{isExpanded ? 'Collapse menu' : 'Expand menu'}</span>
            </Button>
          </div>

          {/* Right side - Theme toggle and Mobile menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-2">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <Button
                          variant={location === item.href ? 'default' : 'ghost'}
                          className={cn(
                            'w-full justify-start text-base font-medium',
                            location === item.href
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                    <div className="border-t pt-2 mt-4">
                      <p className="text-sm font-medium text-muted-foreground mb-2 px-3">More</p>
                      {moreNavigation.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link key={item.name} href={item.href}>
                            <Button
                              variant={location === item.href ? 'default' : 'ghost'}
                              className={cn(
                                'w-full justify-start text-base font-medium',
                                location === item.href
                                  ? 'bg-primary text-primary-foreground'
                                  : 'hover:bg-accent hover:text-accent-foreground'
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Icon className="mr-2 h-4 w-4" />
                              {item.name}
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        
        {/* Expandable Second Row Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="hidden md:flex items-center justify-center space-x-1 py-3">
            {moreNavigation.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={location === item.href ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      'text-sm font-medium transition-colors',
                      location === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                    onClick={() => setIsExpanded(false)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
