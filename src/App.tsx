import { useState, useEffect } from 'react'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { Header } from "@/components/layout/Header"
import { Dashboard } from "@/pages/Dashboard"
import { Policies } from "@/pages/Policies"
import { Claims } from "@/pages/Claims"
import { Clients } from "@/pages/Clients"
import { Documents } from "@/pages/Documents"
import { Reports } from "@/pages/Reports"
import { Settings } from "@/pages/Settings"
import { blink } from "@/blink/client"

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleLogout = () => {
    blink.auth.logout()
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />
      case 'policies':
        return <Policies />
      case 'claims':
        return <Claims />
      case 'clients':
        return <Clients />
      case 'documents':
        return <Documents />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">Insurance Platform</h1>
            <p className="text-muted-foreground">
              Streamline your insurance workflows with our comprehensive automation platform
            </p>
          </div>
          <button
            onClick={() => blink.auth.login()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar 
          activeItem={activeView} 
          onItemClick={setActiveView} 
        />
        <SidebarInset className="flex-1">
          <Header user={user} onLogout={handleLogout} />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default App