"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowUpRight, Plus, Search } from "lucide-react"
import Link from "next/link"

const mockTransactions = [
  { id: "TX-1001", type: "Stock In", product: "Premium Laptop Pro", quantity: 50, date: "12 July, 2024", user: "Admin" },
  { id: "TX-1002", type: "Stock Out", product: "Wireless Headphones", quantity: 5, date: "12 July, 2024", user: "Employee 1" },
  { id: "TX-1003", type: "Stock In", product: "Ergonomic Office Chair", quantity: 20, date: "11 July, 2024", user: "Manager" },
  { id: "TX-1004", type: "Stock Out", product: "4K Monitor 32-inch", quantity: 2, date: "10 July, 2024", user: "Employee 2" },
]

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Log</h1>
          <p className="text-muted-foreground">Track all stock-in and stock-out transactions.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/inventory/stock-out" className="bg-white text-sidebar hover:bg-gray-50 border px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm">
            <ArrowUpRight className="h-4 w-4" /> Stock Out
          </Link>
          <Link href="/inventory/stock-in" className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm">
            <ArrowDownLeft className="h-4 w-4" /> Stock In
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search transactions..."
            className="w-full rounded-full bg-white px-9 py-2 text-sm shadow-sm outline-none border transition-all focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Recorded By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-medium">{tx.id}</TableCell>
              <TableCell>
                <Badge variant={tx.type === "Stock In" ? "neon" : "secondary"}>
                  {tx.type}
                </Badge>
              </TableCell>
              <TableCell>{tx.product}</TableCell>
              <TableCell className="font-semibold">
                {tx.type === "Stock In" ? "+" : "-"}{tx.quantity}
              </TableCell>
              <TableCell className="text-muted-foreground">{tx.date}</TableCell>
              <TableCell>{tx.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
