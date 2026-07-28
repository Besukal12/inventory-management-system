import Link from "next/link"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center">
        <div className="mx-auto w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-8">
          You don't have permission to view this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <Link 
          href="/dashboard"
          className="w-full bg-sidebar hover:bg-sidebar/90 text-sidebar-foreground font-semibold py-3 px-6 rounded-full inline-flex items-center justify-center transition-all shadow-md"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}
