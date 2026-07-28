import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Trash } from "lucide-react"
import Link from "next/link"

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/products" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
          <p className="text-muted-foreground">Update details for product #{params.id}.</p>
        </div>
        <button className="bg-red-50 text-red-500 hover:bg-red-100 px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm">
          <Trash className="h-4 w-4" /> Delete
        </button>
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
                  defaultValue="Premium Laptop Pro"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Category</label>
                <select className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white" defaultValue="Electronics">
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
                  defaultValue="1299.00"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold">Description</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-accent outline-none min-h-[100px]"
                  defaultValue="High performance laptop for professionals."
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
                <Save className="h-4 w-4" /> Update Product
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
