import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { WebSearch } from '../components/ui/search'
import componentCategories from '../data/component-categories'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'



export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 }
    }
  }

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
}

  return (
    <motion.div className="space-y-8" initial="hidden" animate="visible" variants={container}>
      <motion.div className="text-center space-y-4" variants={item}>
        <motion.h1 className="text-4xl font-bold tracking-tight text-foreground" variants={item}>
          UI Components Showcase
        </motion.h1>
        <motion.p className="text-xl text-muted-foreground mx-auto" variants={item}>
          Explore all the beautiful, accessible, and customizable components built with Radix UI and Tailwind CSS.
        </motion.p>
      </motion.div>

      <motion.div variants={item}>
        <WebSearch categories={componentCategories} />
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={item}>
        {componentCategories.map((category) => (
          <motion.div key={category.title} variants={item}>
            <Card className="transition-all hover:shadow-lg flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4 flex-1">
                  {category.components.map((component) => (
                    <Badge key={component} variant="secondary" className="text-xs">
                      {component}
                    </Badge>
                  ))}
                </div>
                <Link href={category.href} className="mt-auto">
                  <Button className="w-full">
                    View Components
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="text-center pt-8" variants={item}>
        <motion.h2 className="text-2xl font-semibold mb-4" variants={item}>About This Showcase</motion.h2>
        <motion.p className="text-muted-foreground max-w-5xl mx-auto" variants={item}>
          This showcase demonstrates all the components from the shadcn/ui library. Each component is
          implemented with proper TypeScript support, accessibility features, and consistent theming.
          The components are built on top of Radix UI primitives and styled with Tailwind CSS.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
