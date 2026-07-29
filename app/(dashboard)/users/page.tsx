"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal } from "lucide-react"

const mockUsers = [
  { id: 1, name: "Alice Admin", email: "alice@company.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Manager", email: "bob@company.com", role: "Manager", status: "Active" },
  { id: 3, name: "Charlie Employee", email: "charlie@company.com", role: "Employee", status: "Inactive" },
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and roles.</p>
        </div>
        <Link
          href="/users/new"
          className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" /> Add User
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className="font-medium bg-gray-50">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === "Active" ? "neon" : "secondary"}>
                  {user.status}
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
