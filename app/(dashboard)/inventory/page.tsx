"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowUpRight, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function InventoryPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadTransactions = async () => {
    try {
      const response = await fetch("/api/inventory/get_inventory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch transactions")
      }
      const data = await response.json()
      setTransactions(data)
    } catch (error) {
      console.error("Failed to fetch transactions", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      setDeletingId(transactionId)
      const response = await fetch("/api/inventory", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId }),
      })

      const responseData = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || "Failed to delete transaction")
      }

      setTransactions((prev) => prev.filter((tx) => tx.id !== transactionId))
      toast.success("Transaction deleted successfully")
    } catch (error: any) {
      console.error("Failed to delete transaction", error)
      toast.error(error.message || "Failed to delete transaction")
    } finally {
      setDeletingId(null)
    }
  }

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

      {loading ? (
        <div className="text-sm text-muted-foreground">Loading transactions...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Recorded By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium text-xs">{tx.id}</TableCell>
                <TableCell>
                  <Badge variant={tx.type === "STOCK_IN" ? "neon" : "secondary"}>
                    {tx.type === "STOCK_IN" ? "Stock In" : "Stock Out"}
                  </Badge>
                </TableCell>
                <TableCell>{tx.product?.name ?? "Unknown Product"}</TableCell>
                <TableCell className="font-semibold">
                  {tx.type === "STOCK_IN" ? "+" : "-"}{tx.quantity}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(tx.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </TableCell>
                <TableCell>{tx.recordedBy?.name ?? "Unknown User"}</TableCell>
                <TableCell className="text-right">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-8 w-8 hover:bg-destructive/10 text-destructive transition-colors disabled:opacity-50"
                    onClick={() => handleDeleteTransaction(tx.id)}
                    disabled={deletingId === tx.id}
                    aria-label="Delete transaction"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
