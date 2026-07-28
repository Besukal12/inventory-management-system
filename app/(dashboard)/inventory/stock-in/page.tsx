import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function StockInPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/inventory" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Record Stock In</h1>
          <p className="text-muted-foreground">Add received inventory items.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Select Product</label>
                <select className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white">
                  <option>Premium Laptop Pro</option>
                  <option>Wireless Headphones</option>
                  <option>Ergonomic Office Chair</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold">Supplier (Optional)</label>
                <select className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white">
                  <option>Select a supplier...</option>
                  <option>TechTronix Inc</option>
                  <option>Global Furniture Ltd</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Quantity Received</label>
                <input 
                  type="number" 
                  min="1"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold">Notes</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-accent outline-none min-h-[100px]"
                  placeholder="Optional notes regarding this shipment..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link 
                href="/inventory"
                className="px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="button"
                className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
              >
                <Save className="h-4 w-4" /> Save Record
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
