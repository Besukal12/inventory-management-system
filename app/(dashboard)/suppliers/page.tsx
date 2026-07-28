"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal } from "lucide-react"

const mockSuppliers = [
  { id: 1, name: "TechTronix Inc", email: "contact@techtronix.com", phone: "+1 (555) 123-4567", status: "Active" },
  { id: 2, name: "Global Furniture Ltd", email: "sales@gfl.com", phone: "+44 20 7123 4567", status: "Active" },
  { id: 3, name: "OfficeMax Wholesale", email: "orders@officemax.net", phone: "+1 (555) 987-6543", status: "Inactive" },
]

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your product suppliers.</p>
        </div>
        <button className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm">
          <Plus className="h-4 w-4" /> Add Supplier
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSuppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>
                <Badge variant={supplier.status === "Active" ? "neon" : "secondary"}>
                  {supplier.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <button className="inline-flex items-center justify-center rounded-full h-8 w-8 hover:bg-muted transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
