import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Filter, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export function Claims() {
  const claims = [
    {
      id: "CLM-001",
      client: "John Smith",
      type: "Auto Insurance",
      amount: "$5,200",
      status: "pending",
      date: "2024-01-15",
      progress: 60,
      description: "Vehicle collision damage"
    },
    {
      id: "CLM-002",
      client: "Sarah Johnson",
      type: "Home Insurance",
      amount: "$12,800",
      status: "approved",
      date: "2024-01-14",
      progress: 100,
      description: "Water damage from burst pipe"
    },
    {
      id: "CLM-003",
      client: "Mike Davis",
      type: "Life Insurance",
      amount: "$25,000",
      status: "review",
      date: "2024-01-13",
      progress: 30,
      description: "Disability claim assessment"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />
      case 'review':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Claims</h1>
          <p className="text-muted-foreground">
            Process and track insurance claims
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Claim
        </Button>
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
          </div>
        </CardContent>
      </Card>

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
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Process</Button>
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