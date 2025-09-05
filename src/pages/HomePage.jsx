import React from 'react'
import { Link } from 'wouter'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const componentCategories = [
  {
    title: 'Buttons & Actions',
    description: 'Interactive elements and action triggers',
    href: '/buttons',
    components: ['Button', 'Toggle', 'Toggle Group'],
  },
  {
    title: 'Forms & Input',
    description: 'Form controls and input components',
    href: '/forms',
    components: ['Input', 'Textarea', 'Select', 'Checkbox', 'Radio Group', 'Switch'],
  },
  {
    title: 'Data Display',
    description: 'Components for displaying data and content',
    href: '/data-display',
    components: ['Table', 'Card', 'Avatar', 'Badge', 'Skeleton'],
  },
  {
    title: 'Layout',
    description: 'Components for page layout and structure',
    href: '/layout',
    components: ['Separator', 'Tabs', 'Accordion', 'Collapsible', 'Sidebar'],
  },
  {
    title: 'Navigation',
    description: 'Navigation and menu components',
    href: '/navigation',
    components: ['Navigation Menu', 'Breadcrumb', 'Pagination', 'Menubar'],
  },
  {
    title: 'Overlays & Feedback',
    description: 'Modal dialogs, overlay components, and user feedback notifications',
    href: '/overlays',
    components: ['Dialog', 'Sheet', 'Drawer', 'Popover', 'Tooltip', 'Alert', 'Progress', 'Toast'],
  },
  {
    title: 'Charts & Data Viz',
    description: 'Data visualization and chart components',
    href: '/charts',
    components: ['Charts', 'Area Chart', 'Bar Chart', 'Line Chart', 'Pie Chart'],
  },
  {
    title: 'Theme Toggles',
    description: 'Animated dark mode toggles using different animation libraries',
    href: '/theme-toggles',
    components: ['react-toggle-dark-mode', 'Framer Motion', 'React Spring'],
  },
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          UI Components Showcase
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore all the beautiful, accessible, and customizable components built with Radix UI and Tailwind CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {componentCategories.map((category) => (
          <Card key={category.title} className="transition-all hover:shadow-lg flex flex-col h-full">
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
        ))}
      </div>

      <div className="text-center pt-8">
        <h2 className="text-2xl font-semibold mb-4">About This Showcase</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          This showcase demonstrates all the components from the shadcn/ui library. Each component is
          implemented with proper TypeScript support, accessibility features, and consistent theming.
          The components are built on top of Radix UI primitives and styled with Tailwind CSS.
        </p>
      </div>
    </div>
  )
}
