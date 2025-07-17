import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Filter, Mail, Phone } from "lucide-react"

export function Clients() {
  const clients = [
    {
      id: "CLI-001",
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      policies: 2,
      totalPremium: "$3,600",
      status: "active",
      joinDate: "2023-03-15"
    },
    {
      id: "CLI-002",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 234-5678",
      policies: 1,
      totalPremium: "$2,400",
      status: "active",
      joinDate: "2023-07-22"
    },
    {
      id: "CLI-003",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "+1 (555) 345-6789",
      policies: 3,
      totalPremium: "$5,200",
      status: "pending",
      joinDate: "2024-01-10"
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      inactive: "bg-gray-100 text-gray-800"
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage client relationships and information
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Client
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clients..."
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

      {/* Clients Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <CardDescription>{client.id}</CardDescription>
                </div>
                <Badge className={getStatusBadge(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Policies</p>
                    <p className="font-medium">{client.policies}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Premium</p>
                    <p className="font-medium">{client.totalPremium}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}