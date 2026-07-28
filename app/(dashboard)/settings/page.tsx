import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Update your business details and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Business Name</label>
                <input 
                  type="text" 
                  defaultValue="Flux Inventory"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold">Currency</label>
                <select className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Theme Preference</label>
                <select className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white">
                  <option>System Default</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="button"
                className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
              >
                <Save className="h-4 w-4" /> Save Settings
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
