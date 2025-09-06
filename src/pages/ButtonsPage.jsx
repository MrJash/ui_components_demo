import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Toggle } from '../components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '../components/ui/toggle-group'
import { Slider } from '../components/ui/slider'
import { Separator } from '../components/ui/separator'
import { LoaderIcon, HeartIcon, ChevronDownIcon, PlusIcon, BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import LiquidGlass from 'liquid-glass-react'

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)
  const [toggleLiked, setToggleLiked] = useState(false) // Separate state for toggle
  const [toggleValue, setToggleValue] = useState('')
  const [buttonSize, setButtonSize] = useState('default') // New state for button size
  const [toggleGroupVariant, setToggleGroupVariant] = useState('default')
  const [buttonRadius, setButtonRadius] = useState([4]) // Button radius control (index 4 = rounded-lg)

  // Text editor states
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const editorRef = useRef(null)

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  // Cycle through button sizes
  const cycleSizes = () => {
    const sizes = ['sm', 'default', 'lg']
    const currentIndex = sizes.indexOf(buttonSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    setButtonSize(sizes[nextIndex])
  }

  // Get size prop for buttons (null for default)
  const getSizeProps = () => {
    const sizeProps = buttonSize === 'default' ? {} : { size: buttonSize }
    const radiusClass = getRadiusClass()
    return radiusClass ? { ...sizeProps, className: radiusClass } : sizeProps
  }

  // Get radius class based on slider value
  const getRadiusClass = () => {
    const radiusIndex = buttonRadius[0]
    const radiusClasses = [
      'rounded-none',    // 0 - Sharp
      'rounded-sm',      // 1 - Minimal  
      'rounded',         // 2 - Small
      'rounded-md',      // 3 - Medium
      'rounded-lg',      // 4 - Rounded (default)
      'rounded-xl',      // 5 - Large
      'rounded-2xl',     // 6 - Extra Large
      'rounded-3xl',     // 7 - Super Round
      'rounded-full'     // 8 - Pill
    ]
    return radiusClasses[radiusIndex] || 'rounded-lg'
  }

  // Get radius label for display
  const getRadiusLabel = () => {
    const radiusIndex = buttonRadius[0]
    const radiusLabels = [
      'Sharp',           // 0
      'Minimal',         // 1
      'Small',           // 2
      'Medium',          // 3
      'Rounded',         // 4 (default)
      'Large',           // 5
      'Extra Large',     // 6
      'Super Round',     // 7
      'Pill'             // 8
    ]
    return radiusLabels[radiusIndex] || 'Rounded'
  }

  // Get pixel value for display
  const getRadiusPixelValue = () => {
    const radiusIndex = buttonRadius[0]
    const pixelValues = [0, 2, 4, 6, 8, 12, 16, 24, 9999] // 9999 represents "full"
    return pixelValues[radiusIndex] || 8
  }

  // Get display text for current size
  const getSizeDisplayText = () => {
    switch(buttonSize) {
      case 'sm': return 'Small'
      case 'lg': return 'Large'
      default: return 'Default'
    }
  }

  // Cycle through toggle group variants
  const cycleToggleVariant = () => {
    const variants = ['default', 'outline', 'glow', 'neon', 'shadow']
    const currentIndex = variants.indexOf(toggleGroupVariant)
    const nextIndex = (currentIndex + 1) % variants.length
    setToggleGroupVariant(variants[nextIndex])
  }

  // Get variant props for toggle group
  const getToggleVariantProps = () => {
    switch(toggleGroupVariant) {
      case 'outline':
        return { variant: 'outline' }
      case 'glow':
        return { 
          className: 'space-x-1'
        }
      case 'neon':
        return { 
          variant: 'outline',
          className: 'space-x-1'
        }
      case 'shadow':
        return {
          className: 'space-x-1'
        }
      default:
        return { className: 'space-x-1' }
    }
  }

  // Get individual toggle item props based on variant
  const getToggleItemProps = () => {
    const radiusClass = getRadiusClass()
    
    switch(toggleGroupVariant) {
      case 'outline':
        return { 
          className: cn(radiusClass)
        }
      case 'glow':
        return { 
          className: cn(
            radiusClass,
            'shadow-md shadow-blue-500/30 data-[state=on]:shadow-lg data-[state=on]:shadow-blue-500/50 data-[state=on]:border-blue-400'
          )
        }
      case 'neon':
        return { 
          className: cn(
            radiusClass,
            'border-cyan-400 shadow-md shadow-cyan-400/40 data-[state=on]:bg-cyan-400 data-[state=on]:text-black data-[state=on]:shadow-lg data-[state=on]:shadow-cyan-400/70'
          )
        }
      case 'shadow':
        return {
          className: cn(
            radiusClass,
            'shadow-lg shadow-gray-500/25 data-[state=on]:shadow-xl data-[state=on]:shadow-gray-500/40 data-[state=on]:translate-y-[-1px]'
          )
        }
      default:
        return { className: radiusClass }
    }
  }

  // Get display name for toggle variant
  const getToggleVariantDisplayName = () => {
    switch(toggleGroupVariant) {
      case 'outline': return 'Outline'
      case 'glow': return 'Glow Effect'
      case 'neon': return 'Neon Style'
      case 'shadow': return 'Enhanced Shadow'
      default: return 'Default'
    }
  }

  // Toggle formatting functions - applies to entire text content
  const toggleBold = () => {
    if (editorRef.current) {
      editorRef.current.focus()
      
      // If there's text, select all and apply formatting
      if (editorRef.current.textContent.trim()) {
        document.execCommand('selectAll', false, null)
        document.execCommand('bold', false, null)
        // Move cursor to end
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(editorRef.current)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        // For empty editor, just apply formatting for future typing
        document.execCommand('bold', false, null)
      }
      
      // Toggle state manually for consistent behavior
      setIsBold(!isBold)
    }
  }

  const toggleItalic = () => {
    if (editorRef.current) {
      editorRef.current.focus()
      
      // If there's text, select all and apply formatting
      if (editorRef.current.textContent.trim()) {
        document.execCommand('selectAll', false, null)
        document.execCommand('italic', false, null)
        // Move cursor to end
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(editorRef.current)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        // For empty editor, just apply formatting for future typing
        document.execCommand('italic', false, null)
      }
      
      // Toggle state manually for consistent behavior
      setIsItalic(!isItalic)
    }
  }

  const toggleUnderline = () => {
    if (editorRef.current) {
      editorRef.current.focus()
      
      // If there's text, select all and apply formatting
      if (editorRef.current.textContent.trim()) {
        document.execCommand('selectAll', false, null)
        document.execCommand('underline', false, null)
        // Move cursor to end
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(editorRef.current)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        // For empty editor, just apply formatting for future typing
        document.execCommand('underline', false, null)
      }
      
      // Toggle state manually for consistent behavior
      setIsUnderline(!isUnderline)
    }
  }

  // Handle editor focus to update button states
  const handleEditorFocus = () => {
    if (editorRef.current && editorRef.current.textContent.trim()) {
      // Only update states from queryCommandState if there's actual text
      setIsBold(document.queryCommandState('bold'))
      setIsItalic(document.queryCommandState('italic'))
      setIsUnderline(document.queryCommandState('underline'))
    }
    // If editor is empty, keep current toggle states as they represent
    // the formatting that will be applied to new text
  }

  const wrapper = { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

  return (
    <motion.div initial="hidden" animate="visible" variants={wrapper} className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Buttons & Actions</h1>
        <p className="mt-0.5 text-muted-foreground">
          Interactive elements and action triggers for user interactions.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Button Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants & Sizes</CardTitle>
            <CardDescription>
              Different button styles and sizes for various use cases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Variants */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Button Variants</h4>
                <div className="flex flex-wrap gap-4">
                  <Button {...getSizeProps()}>Default</Button>
                  <Button variant="secondary" {...getSizeProps()}>Secondary</Button>
                  <Button variant="destructive" {...getSizeProps()}>Destructive</Button>
                  <Button variant="outline" {...getSizeProps()}>Outline</Button>
                  <Button variant="ghost" {...getSizeProps()}>Ghost</Button>
                  <Button variant="link" {...getSizeProps()}>Link</Button>
                </div>
              </div>
              
              {/* Middle Column - Size Control */}
              <div className="space-y-4 md:border-l md:pl-6">
                <h4 className="text-sm font-medium">Button Size Control</h4>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={cycleSizes}
                    className="w-full"
                  >
                    Current Size: {getSizeDisplayText()} (Click to cycle)
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    The selected size applies to all buttons on this page.
                  </p>
                </div>
              </div>

              {/* Right Column - Radius Control */}
              <div className="space-y-4 md:border-l md:pl-6">
                <h4 className="text-sm font-medium">Button Radius Control</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">
                        Radius: {getRadiusPixelValue() === 9999 ? 'full' : `${getRadiusPixelValue()}px`}
                      </label>
                      <span className="text-sm text-muted-foreground">
                        {getRadiusLabel()}
                      </span>
                    </div>
                    <Slider
                      value={buttonRadius}
                      onValueChange={setButtonRadius}
                      max={8}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adjust the border radius of all buttons on this page.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons with Icons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons with Icons</CardTitle>
            <CardDescription>
              Buttons enhanced with icons for better UX.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button {...getSizeProps()}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Item
              </Button>
              <Button variant="outline" {...getSizeProps()}>
                <ChevronDownIcon className="w-4 h-4 mr-2" />
                Options
              </Button>
              <Button
                variant="ghost"
                onClick={() => setLiked(!liked)}
                className={cn(
                  'w-[90px]', // Fixed width to prevent any layout shift
                  liked ? 'text-red-500' : ''
                )}
                {...getSizeProps()}
              >
                <HeartIcon className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Liked' : 'Like'}
              </Button>
              {/* Special handling for icon button */}
              <Button 
                size="icon" 
                className={cn(
                  getRadiusClass(),
                  buttonSize === 'sm' ? 'h-8 w-8' : buttonSize === 'lg' ? 'h-12 w-12' : ''
                )}
              >
                <PlusIcon className={buttonSize === 'sm' ? 'h-3 w-3' : buttonSize === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading States */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>
              Buttons with loading states and disabled variants.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleLoadingDemo} disabled={loading} {...getSizeProps()}>
                {loading && <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button disabled {...getSizeProps()}>Disabled Button</Button>
              <Button variant="outline" disabled {...getSizeProps()}>
                Disabled Outline
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Toggle Component */}
        <Card>
          <CardHeader>
            <CardTitle>Toggle</CardTitle>
            <CardDescription>
              A two-state button that can be either on or off.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Toggle {...getSizeProps()}>Toggle</Toggle>
              <Toggle pressed={toggleLiked} onPressedChange={setToggleLiked} {...getSizeProps()}>
                <HeartIcon className="w-4 h-4" />
              </Toggle>
              <Toggle variant="outline" {...getSizeProps()}>
                <PlusIcon className="w-4 h-4" />
              </Toggle>
              <Toggle disabled {...getSizeProps()}>Disabled</Toggle>
            </div>
          </CardContent>
        </Card>

        {/* Toggle Group */}
        <Card>
          <CardHeader>
            <CardTitle>Toggle Group</CardTitle>
            <CardDescription>
              A set of two-state buttons that can be toggled on or off.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Text Editor Demo */}
            <div className="space-y-4">
              <div className="space-y-3">
                {/* Formatting Controls */}
                <ToggleGroup type="multiple" {...getToggleVariantProps()} {...getSizeProps()}>
                  <ToggleGroupItem
                    value="bold"
                    pressed={isBold}
                    onMouseDown={(e) => e.preventDefault()} // keep selection in editor
                    onClick={toggleBold}
                    aria-label="Bold"
                    {...getToggleItemProps()}
                  >
                    <BoldIcon className="h-4 w-4" />
                  </ToggleGroupItem>

                  <ToggleGroupItem
                    value="italic"
                    pressed={isItalic}
                    onMouseDown={(e) => e.preventDefault()} // keep selection in editor
                    onClick={toggleItalic}
                    aria-label="Italic"
                    {...getToggleItemProps()}
                  >
                    <ItalicIcon className="h-4 w-4" />
                  </ToggleGroupItem>

                  <ToggleGroupItem
                    value="underline"
                    pressed={isUnderline}
                    onMouseDown={(e) => e.preventDefault()} // keep selection in editor
                    onClick={toggleUnderline}
                    aria-label="Underline"
                    {...getToggleItemProps()}
                  >
                    <UnderlineIcon className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
                
                {/* Rich Text Editor using contentEditable */}
                <div className="w-full border border-input bg-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent">
                  <div
                    ref={editorRef}
                    contentEditable
                    className="min-h-[80px] p-3 text-foreground outline-none prose prose-sm max-w-none [&_*]:m-0"
                    onFocus={handleEditorFocus}
                    onMouseUp={handleEditorFocus}
                    onKeyUp={handleEditorFocus}
                    style={{ 
                      lineHeight: '1.5',
                      fontFamily: 'inherit'
                    }}
                    suppressContentEditableWarning={true}
                  >
                    Type here to test formatting...
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Click the B, I, U buttons above to toggle formatting for all text in the editor. Formatting applies to the entire content.
                </p>
              </div>
            </div>

            {/* Variant Control */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Toggle Group Style</h4>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  onClick={cycleToggleVariant}
                  className={cn(
                    "w-full sm:w-auto",
                    getRadiusClass()
                  )}
                >
                  Current Style: {getToggleVariantDisplayName()} (Click to cycle)
                </Button>
                <p className="text-xs text-muted-foreground">
                  This changes the style of the formatting buttons above. Cycles through Default, Outline, Glow Effect, Neon Style, and Enhanced Shadow.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  </motion.div>
  )
}
