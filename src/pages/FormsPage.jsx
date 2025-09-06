import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Checkbox } from '../components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { AnimatedSwitch } from '../components/ui/animated-switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Separator } from '../components/ui/separator'


export default function FormsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    bio: '',
    newsletter: false,
    theme: 'light',
    notifications: true
  })

  // State for switch examples
  const [airplaneMode, setAirplaneMode] = useState(false)
  const [doNotDisturb, setDoNotDisturb] = useState(true)

  // Using shared AnimatedSwitch component from components/ui/animated-switch.jsx

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }
  const wrapper = { hidden: { opacity: 0, rotateX: 6 }, visible: { opacity: 1, rotateX: 0, transition: { duration: 0.45 } } }

  return (
    <motion.div initial="hidden" animate="visible" variants={wrapper} className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Forms & Input</h1>
        <p className="mt-0.5 text-muted-foreground">
          Form controls and input components for collecting user data.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Basic Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Form Example</CardTitle>
            <CardDescription>
              A complete form using various input components.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked })}
                  />
                  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                </div>

                <div className="space-y-3">
                  <Label>Theme Preference</Label>
                  <RadioGroup
                    value={formData.theme}
                    onValueChange={(value) => setFormData({ ...formData, theme: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about updates and news.
                    </p>
                  </div>
                  <AnimatedSwitch
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit">Submit Form</Button>
                <Button type="button" variant="outline" onClick={() => console.log('Current data:', formData)}>
                  Preview Data
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Input Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Input Variants</CardTitle>
            <CardDescription>
              Different input types and states.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Input</Label>
                <Input placeholder="Default input" />
              </div>
              <div className="space-y-2">
                <Label>Password Input</Label>
                <Input type="password" placeholder="Password" />
              </div>
              <div className="space-y-2">
                <Label>Disabled Input</Label>
                <Input placeholder="Disabled" disabled />
              </div>
              <div className="space-y-2">
                <Label>File Input</Label>
                <Input type="file" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Select Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Select Components</CardTitle>
            <CardDescription>
              Dropdown selection components with various options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Basic Select</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Disabled Select</Label>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Disabled select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkbox and Radio Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Checkboxes & Radio Buttons</CardTitle>
            <CardDescription>
              Selection components for single and multiple choices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Checkbox Examples</Label>
              <div className="mt-3 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing" defaultChecked />
                  <Label htmlFor="marketing">Send me marketing emails</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled" disabled />
                  <Label htmlFor="disabled">Disabled checkbox</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-base font-medium">Radio Group Example</Label>
              <RadioGroup defaultValue="option-one" className="mt-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Option Two</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-three" id="option-three" disabled />
                  <Label htmlFor="option-three">Option Three (Disabled)</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Switch Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Switch Components</CardTitle>
            <CardDescription>
              Toggle switches for boolean settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                <p className="text-sm text-muted-foreground">Turn off all wireless connections</p>
              </div>
              <AnimatedSwitch 
                id="airplane-mode" 
                checked={airplaneMode}
                onCheckedChange={setAirplaneMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="do-not-disturb">Do Not Disturb</Label>
                <p className="text-sm text-muted-foreground">Silence all notifications</p>
              </div>
              <AnimatedSwitch 
                id="do-not-disturb" 
                checked={doNotDisturb}
                onCheckedChange={setDoNotDisturb}
              />
            </div>
            <div className="flex items-center justify-between opacity-50">
              <div>
                <Label htmlFor="disabled-switch">Disabled Switch</Label>
                <p className="text-sm text-muted-foreground">This switch is disabled</p>
              </div>
              <AnimatedSwitch 
                id="disabled-switch" 
                checked={false}
                disabled 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
