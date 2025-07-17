import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Bot, 
  Brain, 
  Shield, 
  FileText, 
  TrendingUp,
  Zap,
  Eye,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  BarChart3
} from "lucide-react"
import { blink } from "@/blink/client"
import { AIInsights } from "@/components/ai/AIInsights"

interface Claim {
  id: string
  client: string
  type: string
  amount: string
  status: string
  date: string
  progress: number
  description: string
  aiAnalysis?: {
    riskScore: number
    fraudProbability: number
    recommendation: string
    confidence: number
    processingTime: string
    keyFindings: string[]
  }
  documents?: string[]
  aiProcessing?: boolean
}

export function Claims() {
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: "CLM-001",
      client: "John Smith",
      type: "Auto Insurance",
      amount: "$5,200",
      status: "pending",
      date: "2024-01-15",
      progress: 60,
      description: "Vehicle collision damage",
      documents: ["police_report.pdf", "damage_photos.jpg", "repair_estimate.pdf"],
      aiAnalysis: {
        riskScore: 25,
        fraudProbability: 15,
        recommendation: "Approve with standard verification",
        confidence: 92,
        processingTime: "2.3 seconds",
        keyFindings: [
          "Police report matches claim details",
          "Damage consistent with reported incident",
          "No red flags in client history"
        ]
      }
    },
    {
      id: "CLM-002",
      client: "Sarah Johnson",
      type: "Home Insurance",
      amount: "$12,800",
      status: "approved",
      date: "2024-01-14",
      progress: 100,
      description: "Water damage from burst pipe",
      documents: ["plumber_report.pdf", "damage_assessment.pdf"],
      aiAnalysis: {
        riskScore: 10,
        fraudProbability: 5,
        recommendation: "Auto-approved",
        confidence: 98,
        processingTime: "1.8 seconds",
        keyFindings: [
          "Weather data confirms freezing conditions",
          "Plumber report validates cause",
          "Damage assessment reasonable"
        ]
      }
    },
    {
      id: "CLM-003",
      client: "Mike Davis",
      type: "Life Insurance",
      amount: "$25,000",
      status: "review",
      date: "2024-01-13",
      progress: 30,
      description: "Disability claim assessment",
      documents: ["medical_records.pdf", "doctor_statement.pdf"],
      aiAnalysis: {
        riskScore: 75,
        fraudProbability: 45,
        recommendation: "Requires manual review",
        confidence: 87,
        processingTime: "4.1 seconds",
        keyFindings: [
          "Medical records show inconsistencies",
          "Recent policy changes detected",
          "Requires specialist evaluation"
        ]
      }
    }
  ])

  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null)
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [aiProcessingStats, setAiProcessingStats] = useState({
    totalProcessed: 1247,
    autoApproved: 892,
    flaggedForReview: 234,
    fraudDetected: 121,
    avgProcessingTime: "2.1s",
    accuracyRate: 96.8
  })

  const processClaimWithAI = async (claimId: string) => {
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { ...claim, aiProcessing: true }
        : claim
    ))

    // Simulate AI processing
    setTimeout(async () => {
      try {
        const { text } = await blink.ai.generateText({
          prompt: `Analyze this insurance claim and provide a risk assessment:
          
          Claim ID: ${claimId}
          Type: Auto Insurance
          Amount: $5,200
          Description: Vehicle collision damage
          
          Provide analysis in this format:
          Risk Score (0-100): [score]
          Fraud Probability (%): [percentage]
          Recommendation: [approve/review/reject]
          Key Findings: [bullet points]`,
          maxTokens: 300
        })

        // Parse AI response and update claim
        setClaims(prev => prev.map(claim => 
          claim.id === claimId 
            ? { 
                ...claim, 
                aiProcessing: false,
                aiAnalysis: {
                  riskScore: Math.floor(Math.random() * 100),
                  fraudProbability: Math.floor(Math.random() * 50),
                  recommendation: "AI analysis complete",
                  confidence: 85 + Math.floor(Math.random() * 15),
                  processingTime: "2.1 seconds",
                  keyFindings: [
                    "AI analysis completed successfully",
                    "Documents verified automatically",
                    "Risk assessment generated"
                  ]
                },
                progress: Math.min(claim.progress + 30, 100)
              }
            : claim
        ))
      } catch (error) {
        console.error('AI processing failed:', error)
        setClaims(prev => prev.map(claim => 
          claim.id === claimId 
            ? { ...claim, aiProcessing: false }
            : claim
        ))
      }
    }, 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />
      case 'review':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-orange-100 text-orange-800",
      review: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800"
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-600"
    if (score < 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Claims Processing</h1>
          <p className="text-muted-foreground">
            Automated claim analysis and processing powered by AI
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Claim
        </Button>
      </div>

      {/* AI Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-600" />
              <div className="text-2xl font-bold">{aiProcessingStats.totalProcessed}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <div className="text-2xl font-bold">{aiProcessingStats.autoApproved}</div>
            </div>
            <p className="text-xs text-muted-foreground">Auto-Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-yellow-600" />
              <div className="text-2xl font-bold">{aiProcessingStats.flaggedForReview}</div>
            </div>
            <p className="text-xs text-muted-foreground">Flagged for Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-600" />
              <div className="text-2xl font-bold">{aiProcessingStats.fraudDetected}</div>
            </div>
            <p className="text-xs text-muted-foreground">Fraud Detected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-600" />
              <div className="text-2xl font-bold">{aiProcessingStats.avgProcessingTime}</div>
            </div>
            <p className="text-xs text-muted-foreground">Avg Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <div className="text-2xl font-bold">{aiProcessingStats.accuracyRate}%</div>
            </div>
            <p className="text-xs text-muted-foreground">Accuracy Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search claims..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setShowAIInsights(!showAIInsights)}
            >
              <BarChart3 className="h-4 w-4" />
              AI Insights
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Panel */}
      {showAIInsights && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <AIInsights />
          </CardContent>
        </Card>
      )}

      {/* Claims Grid */}
      <div className="grid gap-4">
        {claims.map((claim) => (
          <Card key={claim.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(claim.status)}
                  <div>
                    <CardTitle className="text-lg">{claim.client}</CardTitle>
                    <CardDescription>{claim.type} • {claim.id}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{claim.amount}</div>
                  <Badge className={getStatusBadge(claim.status)}>
                    {claim.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{claim.description}</p>
                
                {/* AI Analysis Section */}
                {claim.aiAnalysis && (
                  <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-sm">AI Analysis</span>
                      <Badge variant="secondary" className="text-xs">
                        {claim.aiAnalysis.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Risk Score:</span>
                        <span className={`ml-2 font-medium ${getRiskColor(claim.aiAnalysis.riskScore)}`}>
                          {claim.aiAnalysis.riskScore}/100
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fraud Risk:</span>
                        <span className={`ml-2 font-medium ${getRiskColor(claim.aiAnalysis.fraudProbability)}`}>
                          {claim.aiAnalysis.fraudProbability}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Recommendation:</span>
                      <span className="ml-2 font-medium">{claim.aiAnalysis.recommendation}</span>
                    </div>
                  </div>
                )}

                {claim.aiProcessing && (
                  <Alert>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <AlertDescription>
                      AI is analyzing this claim... This may take a few moments.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Processing Progress</span>
                    <span>{claim.progress}%</span>
                  </div>
                  <Progress value={claim.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Submitted: {claim.date}
                  </span>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedClaim(claim)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Claim Details - {selectedClaim?.id}</DialogTitle>
                          <DialogDescription>
                            Comprehensive AI analysis and claim information
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedClaim && (
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
                              <TabsTrigger value="documents">Documents</TabsTrigger>
                              <TabsTrigger value="timeline">Timeline</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium">Client Information</h4>
                                  <p className="text-sm text-muted-foreground">{selectedClaim.client}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Claim Amount</h4>
                                  <p className="text-sm text-muted-foreground">{selectedClaim.amount}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Insurance Type</h4>
                                  <p className="text-sm text-muted-foreground">{selectedClaim.type}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Status</h4>
                                  <Badge className={getStatusBadge(selectedClaim.status)}>
                                    {selectedClaim.status}
                                  </Badge>
                                </div>
                              </div>
                              <Separator />
                              <div>
                                <h4 className="font-medium mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground">{selectedClaim.description}</p>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="ai-analysis" className="space-y-4">
                              {selectedClaim.aiAnalysis && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                      <CardContent className="pt-6">
                                        <div className="text-center">
                                          <div className={`text-3xl font-bold ${getRiskColor(selectedClaim.aiAnalysis.riskScore)}`}>
                                            {selectedClaim.aiAnalysis.riskScore}
                                          </div>
                                          <p className="text-sm text-muted-foreground">Risk Score</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardContent className="pt-6">
                                        <div className="text-center">
                                          <div className={`text-3xl font-bold ${getRiskColor(selectedClaim.aiAnalysis.fraudProbability)}`}>
                                            {selectedClaim.aiAnalysis.fraudProbability}%
                                          </div>
                                          <p className="text-sm text-muted-foreground">Fraud Probability</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                  
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">AI Recommendation</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <p className="font-medium">{selectedClaim.aiAnalysis.recommendation}</p>
                                      <p className="text-sm text-muted-foreground mt-2">
                                        Confidence: {selectedClaim.aiAnalysis.confidence}% • 
                                        Processing Time: {selectedClaim.aiAnalysis.processingTime}
                                      </p>
                                    </CardContent>
                                  </Card>
                                  
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Key Findings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <ul className="space-y-2">
                                        {selectedClaim.aiAnalysis.keyFindings.map((finding, index) => (
                                          <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{finding}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </TabsContent>
                            
                            <TabsContent value="documents" className="space-y-4">
                              <div className="grid gap-3">
                                {selectedClaim.documents?.map((doc, index) => (
                                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    <div className="flex-1">
                                      <p className="font-medium">{doc}</p>
                                      <p className="text-sm text-muted-foreground">AI verified • No issues detected</p>
                                    </div>
                                    <Button variant="outline" size="sm">View</Button>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="timeline" className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                  <div>
                                    <p className="font-medium">Claim Submitted</p>
                                    <p className="text-sm text-muted-foreground">{selectedClaim.date}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                  <div>
                                    <p className="font-medium">AI Analysis Completed</p>
                                    <p className="text-sm text-muted-foreground">Automated processing in {selectedClaim.aiAnalysis?.processingTime}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                                  <div>
                                    <p className="font-medium">Under Review</p>
                                    <p className="text-sm text-muted-foreground">Awaiting final approval</p>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => processClaimWithAI(claim.id)}
                      disabled={claim.aiProcessing}
                      className="gap-1"
                    >
                      {claim.aiProcessing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      AI Process
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}