import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/products" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">Add a new product to your catalog.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Product Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. Wireless Mouse"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Category</label>
                <select className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white">
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Office Supplies</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Initial Stock</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold">Description</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-accent outline-none min-h-[100px]"
                  placeholder="Product description..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link 
                href="/products"
                className="px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="button"
                className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
              >
                <Save className="h-4 w-4" /> Save Product
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
