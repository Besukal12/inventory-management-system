"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal } from "lucide-react"
import Link from "next/link"

const mockProducts = [
  { id: 1, name: "Premium Laptop Pro", category: "Electronics", price: 1299.00, stock: 45, status: "In Stock" },
  { id: 2, name: "Wireless Headphones", category: "Audio", price: 199.50, stock: 12, status: "Low Stock" },
  { id: 3, name: "Ergonomic Office Chair", category: "Furniture", price: 249.00, stock: 0, status: "Out of Stock" },
  { id: 4, name: "Mechanical Keyboard", category: "Electronics", price: 149.99, stock: 124, status: "In Stock" },
  { id: 5, name: "4K Monitor 32-inch", category: "Electronics", price: 499.00, stock: 32, status: "In Stock" },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your inventory catalog.</p>
        </div>
        <Link 
          href="/products/new" 
          className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-full bg-white px-9 py-2 text-sm shadow-sm outline-none border transition-all focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    product.status === "In Stock" ? "neon" : 
                    product.status === "Low Stock" ? "secondary" : "destructive"
                  }
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/products/${product.id}/edit`} className="inline-flex items-center justify-center rounded-full h-8 w-8 hover:bg-muted transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
