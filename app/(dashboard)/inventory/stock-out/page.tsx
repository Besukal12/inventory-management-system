"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function StockOutPage() {
  const router = useRouter()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    note: "",
    reason: "Sale"
  })

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products/get_product")
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
          if (data.length > 0) {
            setFormData(prev => ({ ...prev, productId: data[0].id }))
          }
        }
      } catch (error) {
        console.error("Failed to load products", error)
      } finally {
        setFetching(false)
      }
    }
    loadProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.productId || !formData.quantity) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: formData.productId,
          type: "STOCK_OUT",
          quantity: parseInt(formData.quantity),
          note: `[${formData.reason}] ${formData.note}`.trim()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to record stock out")
      }

      toast.success("Stock out recorded successfully!")
      router.push("/inventory")
    } catch (error: any) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/inventory" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Record Stock Out</h1>
          <p className="text-muted-foreground">Log sold or removed inventory.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Select Product *</label>
                <select 
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white"
                  value={formData.productId}
                  onChange={(e) => setFormData({...formData, productId: e.target.value})}
                  disabled={fetching}
                  required
                >
                  {fetching ? <option>Loading products...</option> : null}
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Current stock: {p.quantity})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Quantity Removed *</label>
                <input 
                  type="number" 
                  min="1"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold">Reason</label>
                <select 
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                >
                  <option value="Sale">Sale</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Internal Use">Internal Use</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Notes</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-accent outline-none min-h-[100px]"
                  placeholder="Optional notes..."
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
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
                type="submit"
                disabled={loading || fetching}
                className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {loading ? "Saving..." : "Save Record"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
