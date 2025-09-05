import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Alert, AlertDescription } from '../components/ui/alert'
import { BarChart3, LineChart, PieChart, TrendingUp, Activity, Info } from 'lucide-react'

export default function ChartsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Charts & Data Visualization</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Beautiful and interactive charts for data visualization. These components require additional chart libraries.
        </p>
      </div>

      {/* Installation Notice */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Charts are not included in this demo. To add charts to your project, install a charting library like{' '}
          <code className="text-sm bg-muted px-1 py-0.5 rounded">recharts</code> or{' '}
          <code className="text-sm bg-muted px-1 py-0.5 rounded">chart.js</code> and configure the shadcn/ui chart components.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8">
        {/* Chart Types Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Area Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Area Chart</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Area Chart Preview</p>
                  <Badge variant="outline">Requires Recharts</Badge>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Perfect for showing trends over time with filled areas under the line.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bar Chart</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Bar Chart Preview</p>
                  <Badge variant="outline">Requires Recharts</Badge>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Ideal for comparing values across different categories.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Line Chart</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                <div className="text-center space-y-2">
                  <LineChart className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Line Chart Preview</p>
                  <Badge variant="outline">Requires Recharts</Badge>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Great for displaying data trends and changes over time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pie Chart</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                <div className="text-center space-y-2">
                  <PieChart className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Pie Chart Preview</p>
                  <Badge variant="outline">Requires Recharts</Badge>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Perfect for showing proportions and percentages of a whole.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Radar Chart</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                <div className="text-center space-y-2">
                  <Activity className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Radar Chart Preview</p>
                  <Badge variant="outline">Requires Recharts</Badge>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Useful for comparing multiple quantitative variables.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Composite Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Composite Chart</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Composite Chart Preview</p>
                  <Badge variant="outline">Requires Recharts</Badge>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Combine multiple chart types for complex data visualization.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Installation Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Add Charts</CardTitle>
            <CardDescription>
              Follow these steps to add beautiful charts to your shadcn/ui project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">1. Install Required Dependencies</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">npm install recharts</code>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">2. Add Chart Components</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">npx shadcn-ui@latest add chart</code>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">3. Import and Use</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm">
{`import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <a href="https://recharts.org/" target="_blank" rel="noopener noreferrer">
                  Recharts Documentation
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://ui.shadcn.com/docs/components/chart" target="_blank" rel="noopener noreferrer">
                  shadcn/ui Charts
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mock Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Example</CardTitle>
            <CardDescription>
              A preview of what your dashboard could look like with charts implemented.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <Badge variant="secondary">+12%</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Users</CardTitle>
                  <Badge variant="secondary">+5%</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">
                    +180 from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <Badge variant="secondary">+8%</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Badge variant="secondary">+2%</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded border-2 border-dashed border-muted">
                    <p className="text-muted-foreground">Line Chart Would Go Here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded border-2 border-dashed border-muted">
                    <p className="text-muted-foreground">Pie Chart Would Go Here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
