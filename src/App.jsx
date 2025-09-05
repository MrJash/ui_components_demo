import React, { useEffect } from 'react'
import { Router, Route, Switch, useLocation } from 'wouter'
import { Toaster } from './components/ui/sonner'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ButtonsPage from './pages/ButtonsPage'
import FormsPage from './pages/FormsPage'
import DataDisplayPage from './pages/DataDisplayPage'
import OverlaysPage from './pages/OverlaysPage'
import LayoutPage from './pages/LayoutPage'
import NavigationPage from './pages/NavigationPage'
import ChartsPage from './pages/ChartsPage'
import ThemeToggleShowcase from './pages/ThemeToggleShowcase'

function AppContent() {
  const [location] = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/buttons" component={ButtonsPage} />
          <Route path="/forms" component={FormsPage} />
          <Route path="/data-display" component={DataDisplayPage} />
          <Route path="/overlays" component={OverlaysPage} />
          <Route path="/layout" component={LayoutPage} />
          <Route path="/navigation" component={NavigationPage} />
          <Route path="/charts" component={ChartsPage} />
          <Route path="/theme-toggles" component={ThemeToggleShowcase} />
          <Route>
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold text-foreground mb-4">404 - Page Not Found</h1>
              <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
            </div>
          </Route>
        </Switch>
      </main>
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
