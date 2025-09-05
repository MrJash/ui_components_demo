import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

// Main AnimatedTabs component
const AnimatedTabs = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
))
AnimatedTabs.displayName = "AnimatedTabs"

// Custom TabsList with animated indicator
const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState("")
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0, opacity: 0 })
  const tabsListRef = React.useRef(null)
  const tabElementsRef = React.useRef({})

  // Update indicator position
  const updateIndicator = React.useCallback((tabValue) => {
    if (!tabValue || !tabsListRef.current || !tabElementsRef.current[tabValue]) {
      return
    }

    const tabsList = tabsListRef.current
    const activeTabElement = tabElementsRef.current[tabValue]
    
    const listRect = tabsList.getBoundingClientRect()
    const tabRect = activeTabElement.getBoundingClientRect()
    
    setIndicatorStyle({
      left: tabRect.left - listRect.left,
      width: tabRect.width,
      opacity: 1
    })
  }, [])

  // Find and set the initially active tab
  React.useEffect(() => {
    if (children && !activeTab) {
      const firstTab = React.Children.toArray(children).find(
        child => React.isValidElement(child) && child.props.value
      )
      if (firstTab && firstTab.props.value) {
        setActiveTab(firstTab.props.value)
      }
    }
  }, [children, activeTab])

  // Update indicator when active tab changes
  React.useEffect(() => {
    if (activeTab) {
      // Multiple attempts to ensure proper positioning
      const timeouts = [0, 50, 150, 300]
      timeouts.forEach(delay => {
        setTimeout(() => {
          updateIndicator(activeTab)
        }, delay)
      })
    }
  }, [activeTab, updateIndicator])

  // Handle tab clicks
  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue)
    updateIndicator(tabValue)
  }

  // Enhanced children with refs and click handlers
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabsTrigger) {
      return React.cloneElement(child, {
        ...child.props,
        ref: (el) => {
          if (el && child.props.value) {
            tabElementsRef.current[child.props.value] = el
          }
        },
        onClick: (e) => {
          handleTabClick(child.props.value)
          child.props.onClick?.(e)
        }
      })
    }
    return child
  })

  return (
    <TabsPrimitive.List
      ref={(el) => {
        tabsListRef.current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) ref.current = el
      }}
      className={cn(
        "relative inline-flex h-10 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {/* Animated indicator */}
      <motion.div
        className="absolute bg-background rounded-full shadow-sm border z-[1]"
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          opacity: indicatorStyle.opacity
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 32,
          mass: 0.8
        }}
        style={{
          height: 'calc(100% - 8px)',
          top: 4
        }}
      />
      
      {enhancedChildren}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-[2] inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-foreground hover:text-foreground/80",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-300 ease-in-out",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { AnimatedTabs, TabsList, TabsTrigger, TabsContent }
