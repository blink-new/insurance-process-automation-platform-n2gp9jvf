import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Upload, Search, Filter, Download } from "lucide-react"

export function Documents() {
  const documents = [
    {
      id: "DOC-001",
      name: "Policy Agreement - John Smith",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      category: "Policy Documents"
    },
    {
      id: "DOC-002",
      name: "Claim Form - Sarah Johnson",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      category: "Claims"
    },
    {
      id: "DOC-003",
      name: "Medical Report - Mike Davis",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: "2024-01-13",
      category: "Medical Records"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">
            Manage and organize all insurance documents
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search documents..."
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

      {/* Documents Grid */}
      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {doc.category} • {doc.type} • {doc.size}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Uploaded: {doc.uploadDate}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      View
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