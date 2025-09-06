import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card'
import { Progress } from '../components/ui/progress'
import { toast } from 'sonner'
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon, HelpCircleIcon, Settings, User, MessageCircle, Calendar, Trash2, Download, Mail, Bell, AlertCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react'

export default function OverlaysPage() {
  const [progress1, setProgress1] = useState(33)
  const [progress2, setProgress2] = useState(67)
  const [progress3, setProgress3] = useState(89)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress1(45)
      setProgress2(78)
      setProgress3(95)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const wrapper = { hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } } }

  return (
    <TooltipProvider>
      <motion.div initial="hidden" animate="visible" variants={wrapper} className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overlays & Feedback</h1>
          <p className="mt-0.5 text-muted-foreground mx-auto">
            Modal dialogs, notifications, alerts, feedback components, and overlay elements for enhanced user interactions.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Components</CardTitle>
              <CardDescription>
                Display important information and messages to users with different severity levels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert. It provides helpful context or additional information.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please check your input and try again.
                </AlertDescription>
              </Alert>

              <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. Please proceed with caution.
                </AlertDescription>
              </Alert>

              <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your changes have been saved successfully!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Indicators</CardTitle>
              <CardDescription>
                Show completion progress for tasks, uploads, or other operations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>File Upload</span>
                  <span>{progress1}%</span>
                </div>
                <Progress value={progress1} className="w-full" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Installation Progress</span>
                  <span>{progress2}%</span>
                </div>
                <Progress value={progress2} className="w-full" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Profile Completion</span>
                  <span>{progress3}%</span>
                </div>
                <Progress value={progress3} className="w-full" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Indeterminate Progress</span>
                  <Badge variant="secondary">Processing...</Badge>
                </div>
                <Progress value={undefined} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Toast Notifications (Sonner) */}
          <Card>
            <CardHeader>
              <CardTitle>Toast Notifications (Sonner)</CardTitle>
              <CardDescription>
                Show temporary notification messages for user actions and system events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  onClick={() => toast.success("Success! Your changes have been saved.")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Success Toast
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => toast.error("Error! Something went wrong.")}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Error Toast
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => toast.warning("Warning! Please check your input.")}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Warning Toast
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => toast.info("Info: New update available.")}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Info Toast
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => 
                    toast("New message received", {
                      description: "From: john@example.com",
                      action: {
                        label: "View",
                        onClick: () => console.log("View message"),
                      },
                    })
                  }
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Action Toast
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => 
                    toast.promise(
                      new Promise((resolve) => setTimeout(resolve, 2000)),
                      {
                        loading: 'Uploading file...',
                        success: 'File uploaded successfully!',
                        error: 'Failed to upload file.',
                      }
                    )
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  Promise Toast
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => 
                    toast.custom((t) => (
                      <div className="bg-background border rounded-lg p-4 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <Bell className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Custom Notification</p>
                            <p className="text-sm text-muted-foreground">This is a custom styled toast.</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Custom Toast
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => toast.loading("Loading...", { duration: 2000 })}
                >
                  Loading Toast
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alert Dialogs */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Dialogs</CardTitle>
              <CardDescription>
                Modal dialogs for confirming destructive actions or important decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => toast.success("Account deleted successfully")}
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Download Report</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will download a comprehensive report containing all your data.
                        The file size may be large depending on your usage.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => toast.info("Download started...")}
                      >
                        Download
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* Dialogs */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog Components</CardTitle>
              <CardDescription>
                Modal dialogs for user interactions and content display.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Basic Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Basic Dialog</DialogTitle>
                      <DialogDescription>
                        This is a basic dialog with a title and description. You can put any content here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        Dialog content goes here. This could be forms, additional information, or any other content.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Settings</DialogTitle>
                      <DialogDescription>
                        Configure your application settings here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Preferences</h4>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="notifications" />
                          <label htmlFor="notifications" className="text-sm">Enable notifications</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="autoSave" />
                          <label htmlFor="autoSave" className="text-sm">Auto-save changes</label>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Sheets */}
          <Card>
            <CardHeader>
              <CardTitle>Sheet Components</CardTitle>
              <CardDescription>
                Side panels that slide in from the edges of the screen with smooth animations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Side Sheets (Horizontal Slide)</h4>
                <div className="flex flex-wrap gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">📱 Right Sheet</Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>Right Side Sheet</SheetTitle>
                        <SheetDescription>
                          ➡️ Slides in smoothly from the right side of the screen.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4 space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Perfect for navigation menus, forms, or detailed content that needs to be accessed quickly without losing context.
                        </p>
                        <Button className="w-full">Action Button</Button>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">📱 Left Sheet</Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Left Side Sheet</SheetTitle>
                        <SheetDescription>
                          ⬅️ Slides in smoothly from the left side.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4 space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Great for sidebars, navigation, or secondary content.
                        </p>
                        <Button className="w-full" variant="secondary">Left Action</Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Vertical Sheets (Vertical Slide)</h4>
                <div className="flex flex-wrap gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">📋 Top Sheet</Button>
                    </SheetTrigger>
                    <SheetContent side="top">
                      <SheetHeader>
                        <SheetTitle>Top Sheet</SheetTitle>
                        <SheetDescription>
                          ⬆️ Slides down smoothly from the top of the screen.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                          Ideal for notifications, announcements, or quick actions.
                        </p>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">📋 Bottom Sheet</Button>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader>
                        <SheetTitle>Bottom Sheet</SheetTitle>
                        <SheetDescription>
                          ⬇️ Slides up smoothly from the bottom of the screen.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                          Perfect for mobile-like experiences, action sheets, or additional options.
                        </p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popovers and Tooltips */}
          <Card>
            <CardHeader>
              <CardTitle>Popovers & Tooltips</CardTitle>
              <CardDescription>
                Small overlays for additional information and interactions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Tooltips</h4>
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover for tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a helpful tooltip!</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <HelpCircleIcon className="h-4 w-4 mr-2" />
                        Help
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get help and support information</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Popovers</h4>
                <div className="flex flex-wrap gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Settings</h4>
                          <p className="text-sm text-muted-foreground">
                            Configure your preferences here.
                          </p>
                        </div>
                        <div className="grid gap-2">
                          <Button size="sm" className="w-full">Save Changes</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <User className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">John Doe</h4>
                          <p className="text-sm text-muted-foreground">john@example.com</p>
                          <Button size="sm" variant="outline" className="mt-2">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Hover Cards</h4>
                <div className="flex flex-wrap gap-4">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@shadcn</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@shadcn</h4>
                          <p className="text-sm">
                            The React framework – created and maintained by @vercel.
                          </p>
                          <div className="flex items-center pt-2">
                            <Calendar className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">
                              Joined December 2021
                            </span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}
