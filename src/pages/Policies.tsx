import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"

export function Policies() {
  const policies = [
    {
      id: "POL-001",
      client: "John Smith",
      type: "Auto Insurance",
      premium: "$1,200/year",
      status: "active",
      renewalDate: "2024-06-15",
      coverage: "$50,000"
    },
    {
      id: "POL-002",
      client: "Sarah Johnson",
      type: "Home Insurance",
      premium: "$2,400/year",
      status: "active",
      renewalDate: "2024-08-22",
      coverage: "$250,000"
    },
    {
      id: "POL-003",
      client: "Mike Davis",
      type: "Life Insurance",
      premium: "$3,600/year",
      status: "pending",
      renewalDate: "2024-12-10",
      coverage: "$500,000"
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      expired: "bg-red-100 text-red-800"
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Policies</h1>
          <p className="text-muted-foreground">
            Manage and track all insurance policies
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Policy
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search policies..."
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

      {/* Policies Grid */}
      <div className="grid gap-4">
        {policies.map((policy) => (
          <Card key={policy.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{policy.client}</CardTitle>
                  <CardDescription>{policy.type} • {policy.id}</CardDescription>
                </div>
                <Badge className={getStatusBadge(policy.status)}>
                  {policy.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Premium</p>
                  <p className="font-medium">{policy.premium}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Coverage</p>
                  <p className="font-medium">{policy.coverage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Renewal Date</p>
                  <p className="font-medium">{policy.renewalDate}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}