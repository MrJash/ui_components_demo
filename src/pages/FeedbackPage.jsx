import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Progress } from '../components/ui/progress'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog'
import { toast } from 'sonner'
import { AlertCircle, CheckCircle, Info, AlertTriangle, Trash2, Download, Mail, Bell } from 'lucide-react'

export default function FeedbackPage() {
  const [progress1, setProgress1] = React.useState(33)
  const [progress2, setProgress2] = React.useState(67)
  const [progress3, setProgress3] = React.useState(89)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress1(45)
      setProgress2(78)
      setProgress3(95)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Feedback Components</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Components for providing user feedback, notifications, alerts, and progress indicators.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alert</CardTitle>
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
            <CardTitle>Progress</CardTitle>
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

        {/* Alert Dialog */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Dialog</CardTitle>
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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Send Team Invitation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to send a team invitation? The recipient will
                      receive an email with access to your workspace.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => toast.success("Invitation sent successfully!")}
                    >
                      Send Invitation
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
