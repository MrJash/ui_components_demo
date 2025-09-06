import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { AnimatedTabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/animated-tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { ChevronDown } from 'lucide-react'

export default function LayoutPage() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
  }

  const item = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight">Layout Components</h1>
        <p className="mt-0.5 text-muted-foreground">
          Components for organizing content, structuring layouts, and creating hierarchical navigation.
        </p>
      </motion.div>

      <div className="grid gap-8">
        {/* Separator */}
        <motion.div variants={item}>
          <Card>
          <CardHeader>
            <CardTitle>Separator</CardTitle>
            <CardDescription>
              Visual dividers to separate content sections.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Horizontal Separators</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Section 1</p>
                  <Separator className="my-4" />
                  <p className="text-sm text-muted-foreground">Section 2</p>
                  <Separator className="my-4" />
                  <p className="text-sm text-muted-foreground">Section 3</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Vertical Separator</h4>
              <div className="flex items-center space-x-4">
                <span className="text-sm">Item 1</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm">Item 2</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm">Item 3</span>
              </div>
            </div>
          </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={item}>
          <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>
              Organize content into multiple sections with tabbed navigation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatedTabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4">
                <h3 className="text-lg font-medium">Account Information</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account settings and preferences here.
                </p>
                <div className="space-y-2">
                  <Badge variant="secondary">Email Verified</Badge>
                  <Badge variant="outline">Two-Factor Enabled</Badge>
                </div>
              </TabsContent>
              <TabsContent value="password" className="space-y-4">
                <h3 className="text-lg font-medium">Password & Security</h3>
                <p className="text-sm text-muted-foreground">
                  Update your password and security settings.
                </p>
                <Button variant="outline">Change Password</Button>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <h3 className="text-lg font-medium">General Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your application preferences.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Dark Mode</Button>
                  <Button variant="outline" size="sm">Notifications</Button>
                </div>
              </TabsContent>
            </AnimatedTabs>
          </CardContent>
          </Card>
        </motion.div>

        {/* Accordion */}
        <motion.div variants={item}>
          <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>
              Collapsible content sections for organizing information hierarchically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
                <AccordionContent>
                  shadcn/ui is a collection of reusable components built using Radix UI and Tailwind CSS. 
                  It provides beautifully designed, accessible, and customizable components for React applications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I install components?</AccordionTrigger>
                <AccordionContent>
                  You can install components using the shadcn/ui CLI. Simply run "npx shadcn-ui@latest add [component-name]" 
                  to add any component to your project.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I customize the theme?</AccordionTrigger>
                <AccordionContent>
                  Yes! shadcn/ui components are fully customizable. You can modify the CSS variables in your globals.css 
                  file or adjust the Tailwind config to match your design system.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! All components are built with accessibility in mind, using Radix UI primitives that 
                  provide keyboard navigation, screen reader support, and proper ARIA attributes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          </Card>
        </motion.div>

        {/* Collapsible */}
        <motion.div variants={item}>
          <Card>
          <CardHeader>
            <CardTitle>Collapsible</CardTitle>
            <CardDescription>
              Simple collapsible content areas for showing/hiding information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex items-center justify-between w-full">
                  <span>📚 Documentation Links</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 pt-2">
                <div className="rounded-md border px-4 py-2 text-sm">
                  <a href="#" className="text-blue-600 hover:underline">Getting Started Guide</a>
                </div>
                <div className="rounded-md border px-4 py-2 text-sm">
                  <a href="#" className="text-blue-600 hover:underline">Component API Reference</a>
                </div>
                <div className="rounded-md border px-4 py-2 text-sm">
                  <a href="#" className="text-blue-600 hover:underline">Theme Customization</a>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex items-center justify-between w-full">
                  <span>🔧 Developer Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 pt-2">
                <div className="rounded-md border px-4 py-2 text-sm">
                  <Badge variant="outline" className="mr-2">CLI</Badge>
                  shadcn/ui command-line interface
                </div>
                <div className="rounded-md border px-4 py-2 text-sm">
                  <Badge variant="outline" className="mr-2">VS Code</Badge>
                  Extension for enhanced development
                </div>
                <div className="rounded-md border px-4 py-2 text-sm">
                  <Badge variant="outline" className="mr-2">Figma</Badge>
                  Design system components
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
