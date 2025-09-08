import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

// Main AnimatedTabs component
const AnimatedTabs = React.forwardRef(({ className, onValueChange, ...props }, ref) => {
  // Enhanced onValueChange to notify TabsList children
  const handleValueChange = React.useCallback((value) => {
    onValueChange?.(value)
    // Dispatch custom event to notify TabsList components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('animated-tabs-change', { 
        detail: { value, timestamp: Date.now() }
      }))
    }
  }, [onValueChange])

  return (
    <TabsPrimitive.Root
      ref={ref}
      className={cn("w-full", className)}
      onValueChange={handleValueChange}
      {...props}
    />
  )
})
AnimatedTabs.displayName = "AnimatedTabs"

// Custom TabsList with animated indicator
const TabsList = React.forwardRef(({ className, children, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState("")
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0, opacity: 0 })
  const tabsListRef = React.useRef(null)
  const tabElementsRef = React.useRef({})
  const resizeObserverRef = React.useRef(null)

  // Update indicator position
 const updateIndicator = React.useCallback((tabValue) => {
  if (!tabValue || !tabsListRef.current || !tabElementsRef.current[tabValue]) return

  const tabsList = tabsListRef.current
  const activeTabElement = tabElementsRef.current[tabValue]

  const listRect = tabsList.getBoundingClientRect()
  const tabRect = activeTabElement.getBoundingClientRect()

  setIndicatorStyle({
    left: tabRect.left - listRect.left,
    width: tabRect.width,
    top: tabRect.top - listRect.top,
    height: tabRect.height,
    opacity: 1,
  })
}, [])

  // Set up resize observer to handle responsive updates
  React.useEffect(() => {
    if (typeof window !== 'undefined' && tabsListRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        if (activeTab) {
          // Debounce the update to avoid excessive calls
          setTimeout(() => {
            updateIndicator(activeTab)
          }, 50)
        }
      })
      
      resizeObserverRef.current.observe(tabsListRef.current)
      
      // Also listen to window resize for mobile/desktop transitions
      const handleResize = () => {
        if (activeTab) {
          setTimeout(() => {
            updateIndicator(activeTab)
          }, 100)
        }
      }
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect()
        }
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [activeTab, updateIndicator])

  // Find and set the initially active tab - also sync with external changes
  React.useEffect(() => {
    if (children) {
      // Check if we have a defaultValue from the parent
      const parentDefaultValue = props.defaultValue
      
      if (parentDefaultValue && parentDefaultValue !== activeTab) {
        setActiveTab(parentDefaultValue)
        return
      }
      
      // If no activeTab is set, find the first tab
      if (!activeTab) {
        const firstTab = React.Children.toArray(children).find(
          child => React.isValidElement(child) && child.props.value
        )
        if (firstTab && firstTab.props.value) {
          setActiveTab(firstTab.props.value)
        }
      }
    }
  }, [children, activeTab, props.defaultValue])

  // Check for programmatic value changes from parent component
  React.useEffect(() => {
    if (props.value && props.value !== activeTab) {
      setActiveTab(props.value)
    }
  }, [props.value, activeTab])

  // Update indicator when active tab changes - improved timing
  React.useEffect(() => {
    if (activeTab) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        updateIndicator(activeTab)
      })
      
      // Additional fallback for complex layout changes
      const fallbackTimer = setTimeout(() => {
        updateIndicator(activeTab)
      }, 200)
      
      return () => clearTimeout(fallbackTimer)
    }
  }, [activeTab, updateIndicator])

  // Handle tab clicks and sync with Radix
  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue)
    // Forward to parent onValueChange callback if provided
    if (props.onValueChange) {
      props.onValueChange(tabValue)
    }
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      updateIndicator(tabValue)
    })
  }

  // Listen for value changes from parent Radix Tabs component
  React.useEffect(() => {
    // Listen for custom events from AnimatedTabs root
    const handleTabsChange = (event) => {
      const newValue = event.detail?.value
      if (newValue && newValue !== activeTab) {
        setActiveTab(newValue)
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('animated-tabs-change', handleTabsChange)
    }
    
    // Also try to find the parent tabs and observe it directly
    const tabsRoot = tabsListRef.current?.closest('[data-radix-tabs-root]')
    let observer
    if (tabsRoot) {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-value') {
            const newValue = tabsRoot.getAttribute('data-value')
            if (newValue && newValue !== activeTab) {
              setActiveTab(newValue)
            }
          }
        })
      })
      
      observer.observe(tabsRoot, { attributes: true })
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('animated-tabs-change', handleTabsChange)
      }
      if (observer) {
        observer.disconnect()
      }
    }
  }, [activeTab])

  // Enhanced children with refs and click handlers
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabsTrigger) {
      return React.cloneElement(child, {
        ...child.props,
        ref: (el) => {
          if (el && child.props.value) {
            tabElementsRef.current[child.props.value] = el
            // Update indicator immediately when ref is set for active tab
            if (child.props.value === activeTab) {
              requestAnimationFrame(() => {
                updateIndicator(child.props.value)
              })
            }
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
        "relative inline-flex h-20 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground",
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
      "relative z-[2] flex-1 h-full flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
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