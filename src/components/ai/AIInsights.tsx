import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Clock, 
  DollarSign,
  Users,
  FileText,
  Zap,
  Target,
  BarChart3
} from "lucide-react"

interface AIInsight {
  id: string
  type: 'trend' | 'anomaly' | 'recommendation' | 'prediction'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  actionable: boolean
  data?: any
}

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: "insight-1",
      type: "trend",
      title: "Fraud Detection Accuracy Improving",
      description: "AI fraud detection has improved by 12% over the last month, reducing false positives by 23%.",
      impact: "high",
      confidence: 94,
      actionable: false,
      data: { improvement: 12, falsePositiveReduction: 23 }
    },
    {
      id: "insight-2",
      type: "anomaly",
      title: "Unusual Claim Pattern Detected",
      description: "Auto insurance claims from downtown area increased 45% this week. Possible weather-related incident.",
      impact: "medium",
      confidence: 87,
      actionable: true,
      data: { increase: 45, area: "downtown", timeframe: "this week" }
    },
    {
      id: "insight-3",
      type: "recommendation",
      title: "Optimize Processing for Home Claims",
      description: "Home insurance claims take 23% longer to process. Consider adjusting AI parameters for this category.",
      impact: "medium",
      confidence: 91,
      actionable: true,
      data: { processingDelay: 23, category: "home insurance" }
    },
    {
      id: "insight-4",
      type: "prediction",
      title: "Expected Claim Volume Increase",
      description: "Weather forecast suggests 30% increase in home insurance claims next week due to storm system.",
      impact: "high",
      confidence: 78,
      actionable: true,
      data: { expectedIncrease: 30, timeframe: "next week", cause: "storm system" }
    }
  ])

  const [aiMetrics, setAiMetrics] = useState({
    processingSpeed: {
      current: "2.1s",
      improvement: "+15%",
      trend: "up"
    },
    accuracyRate: {
      current: 96.8,
      improvement: "+2.3%",
      trend: "up"
    },
    fraudDetection: {
      current: 94.2,
      improvement: "+5.1%",
      trend: "up"
    },
    autoApprovalRate: {
      current: 71.6,
      improvement: "+8.2%",
      trend: "up"
    }
  })

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case 'anomaly':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'recommendation':
        return <Target className="h-4 w-4 text-green-600" />
      case 'prediction':
        return <Brain className="h-4 w-4 text-purple-600" />
      default:
        return <Brain className="h-4 w-4 text-gray-600" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return "bg-red-100 text-red-800"
      case 'medium':
        return "bg-yellow-100 text-yellow-800"
      case 'low':
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Insights</h2>
          <p className="text-muted-foreground">
            Advanced analytics and recommendations powered by AI
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Brain className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">Smart Insights</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {insights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getInsightIcon(insight.type)}
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <CardDescription className="capitalize">{insight.type} insight</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact} impact
                      </Badge>
                      <Badge variant="secondary">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {insight.description}
                  </p>
                  
                  {insight.actionable && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">
                        Action recommended
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processing Speed</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiMetrics.processingSpeed.current}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(aiMetrics.processingSpeed.trend)}
                  <span>{aiMetrics.processingSpeed.improvement} from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiMetrics.accuracyRate.current}%</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(aiMetrics.accuracyRate.trend)}
                  <span>{aiMetrics.accuracyRate.improvement} from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fraud Detection</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiMetrics.fraudDetection.current}%</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(aiMetrics.fraudDetection.trend)}
                  <span>{aiMetrics.fraudDetection.improvement} from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auto-Approval Rate</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiMetrics.autoApprovalRate.current}%</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getTrendIcon(aiMetrics.autoApprovalRate.trend)}
                  <span>{aiMetrics.autoApprovalRate.improvement} from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Performance Trends</CardTitle>
              <CardDescription>
                Key metrics over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Claims Processed Automatically</span>
                    <span>1,247 / 1,742 (71.6%)</span>
                  </div>
                  <Progress value={71.6} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Fraud Detection Accuracy</span>
                    <span>94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Processing Time Reduction</span>
                    <span>67% faster than manual</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Claim Volume Forecast
                </CardTitle>
                <CardDescription>
                  AI-powered predictions for the next 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Auto Insurance Claims</p>
                      <p className="text-sm text-muted-foreground">Expected increase due to holiday travel</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">+23%</div>
                      <div className="text-xs text-muted-foreground">Next 7 days</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium">Home Insurance Claims</p>
                      <p className="text-sm text-muted-foreground">Storm system approaching region</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-600">+45%</div>
                      <div className="text-xs text-muted-foreground">Days 8-14</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Life Insurance Claims</p>
                      <p className="text-sm text-muted-foreground">Normal seasonal patterns</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">-5%</div>
                      <div className="text-xs text-muted-foreground">Stable</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Risk Alerts
                </CardTitle>
                <CardDescription>
                  Potential issues identified by AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border border-red-200 rounded-lg">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-red-800">High Fraud Risk Pattern</p>
                      <p className="text-sm text-red-600">Multiple claims from same address detected</p>
                      <p className="text-xs text-muted-foreground mt-1">Confidence: 89%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 border border-yellow-200 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-yellow-800">Processing Bottleneck</p>
                      <p className="text-sm text-yellow-600">Medical claims taking longer than usual</p>
                      <p className="text-xs text-muted-foreground mt-1">Confidence: 76%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 border border-blue-200 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-800">Optimization Opportunity</p>
                      <p className="text-sm text-blue-600">AI model can be tuned for better accuracy</p>
                      <p className="text-xs text-muted-foreground mt-1">Confidence: 92%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}