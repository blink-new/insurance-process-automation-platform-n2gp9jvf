import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Shield, 
  ClipboardList, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus
} from "lucide-react"

export function Dashboard() {
  const stats = [
    {
      title: "Active Policies",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      title: "Pending Claims",
      value: "23",
      change: "-8%",
      trend: "down",
      icon: ClipboardList,
      color: "text-orange-600"
    },
    {
      title: "Total Clients",
      value: "892",
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Monthly Premium",
      value: "$124,500",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ]

  const recentClaims = [
    {
      id: "CLM-001",
      client: "John Smith",
      type: "Auto Insurance",
      amount: "$5,200",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "CLM-002",
      client: "Sarah Johnson",
      type: "Home Insurance",
      amount: "$12,800",
      status: "approved",
      date: "2024-01-14"
    },
    {
      id: "CLM-003",
      client: "Mike Davis",
      type: "Life Insurance",
      amount: "$25,000",
      status: "review",
      date: "2024-01-13"
    }
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Review policy renewal for ABC Corp",
      priority: "high",
      dueDate: "Today"
    },
    {
      id: 2,
      title: "Process claim documentation",
      priority: "medium",
      dueDate: "Tomorrow"
    },
    {
      id: 3,
      title: "Client meeting - Insurance consultation",
      priority: "high",
      dueDate: "Jan 18"
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
      review: "bg-yellow-100 text-yellow-800"
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    }
    return variants[priority as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your insurance business.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Quick Action
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Claims */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
            <CardDescription>
              Latest claim submissions and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(claim.status)}
                    <div>
                      <p className="font-medium">{claim.client}</p>
                      <p className="text-sm text-muted-foreground">{claim.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{claim.amount}</p>
                    <Badge className={`text-xs ${getStatusBadge(claim.status)}`}>
                      {claim.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Claims
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Important tasks and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Due: {task.dueDate}</p>
                  </div>
                  <Badge className={`text-xs ${getPriorityBadge(task.priority)}`}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Key metrics and progress indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Claims Processing</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Client Satisfaction</span>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Policy Renewals</span>
                <span className="text-sm text-muted-foreground">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}