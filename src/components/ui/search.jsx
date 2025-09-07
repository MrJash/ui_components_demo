import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Button } from './button'
import { Search } from 'lucide-react'
import defaultCategories from '../../data/component-categories'
import { useLocation } from 'wouter'

export function WebSearch({ categories = defaultCategories, onSearch }) {
  const [, setLocation] = useLocation()
  const [q, setQ] = React.useState('')
  const [results, setResults] = React.useState([])

  function doSearch(queryRaw) {
    const query = (queryRaw || '').trim().toLowerCase()
    if (!query) {
      setResults([])
      return
    }

    const matches = []
    for (const cat of categories) {
      const matched = (cat.components || [])
        .map((name) => ({ 
          name, 
          category: cat.title, 
          href: cat.href,
          // Generate stable ID from component name
          id: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }))
        .filter((c) => c.name.toLowerCase().includes(query))
      if (matched.length) matches.push(...matched)
    }

    const out = {
      query: queryRaw,
      results: matches.map((m) => ({ 
        title: m.name, 
        url: m.href || '#', 
        snippet: undefined, 
        source: m.category,
        id: m.id
      })),
    }

    setResults(out.results)
    if (onSearch) onSearch(out)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Search Components</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); doSearch(q) }} className="flex gap-2 mb-4">
          <label className="sr-only">Search</label>
          <Input
            value={q}
            onChange={(e) => { setQ(e.target.value); doSearch(e.target.value) }}
            placeholder="Type component name (e.g. Button, Tabs)..."
            className="flex-1"
          />
          <Button type="submit" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {results && results.length > 0 ? (
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              <AnimatePresence>
                {results.map((r, index) => (
                  <motion.li 
                    key={`${r.title}-${r.source}`} 
                    className="w-full"
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 20 },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Button asChild className="w-full justify-start bg-muted p-3 rounded-md" variant="ghost" size="default">
                      <a
                        href={r.url + `#${encodeURIComponent(r.title)}`}
                        className="w-full block text-left"
                        onClick={(e) => {
                          e.preventDefault()
                          setLocation(r.url + `#${encodeURIComponent(r.title)}`)
                        }}
                      >
                        <div className="font-medium">{r.title}</div>
                      </a>
                    </Button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </motion.div>
        ) : q ? (
          <motion.div 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            No components found.
          </motion.div>
        ) : null}
      </CardContent>
    </Card>
  )
}
