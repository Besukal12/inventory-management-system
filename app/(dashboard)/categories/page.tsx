"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, MoreHorizontal, Edit, Trash } from "lucide-react"

const mockCategories = [
  { id: 1, name: "Electronics", description: "Gadgets and devices", productCount: 45 },
  { id: 2, name: "Furniture", description: "Office and home furniture", productCount: 12 },
  { id: 3, name: "Audio", description: "Headphones, speakers", productCount: 8 },
  { id: 4, name: "Office Supplies", description: "Stationery and supplies", productCount: 124 },
]

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage product categories.</p>
        </div>
        <Link
          href="/categories/new"
          className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Category
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Products Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-muted-foreground">{category.description}</TableCell>
              <TableCell>{category.productCount}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <button className="inline-flex items-center justify-center rounded-full h-8 w-8 hover:bg-muted transition-colors text-sidebar">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="inline-flex items-center justify-center rounded-full h-8 w-8 hover:bg-red-50 transition-colors text-red-500">
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
