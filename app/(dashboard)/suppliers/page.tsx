"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const loadSuppliers = async () => {
        try {
          const response = await fetch("/api/supplier/get_supplier")
          if (!response.ok) {
            throw new Error("Failed to fetch suppliers")
          }
          const data = await response.json()
          setSuppliers(data)
        } catch (error) {
          console.error("Failed to fetch suppliers", error)
        } finally {
          setLoading(false)
        }
      }
  
      loadSuppliers()
    }, [])
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your product suppliers.</p>
        </div>
        <Link
          href="/suppliers/new"
          className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add Supplier
        </Link>
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
          {suppliers.map((supplier) => (
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
