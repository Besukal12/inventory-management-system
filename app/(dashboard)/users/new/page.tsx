"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

export default function NewUserPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Employee")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setStatus("idle")
    setMessage("")

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), password, role }),
    })

    const result = await response.json()

    if (response.ok) {
      setStatus("success")
      setMessage(result.message || "User created successfully.")
      router.push("/users")
    } else {
      setStatus("error")
      setMessage(result.message || "Failed to create user.")
    }

    setSaving(false)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/users" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create User</h1>
          <p className="text-muted-foreground">Add a new team member and assign a role.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. Alice Admin"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. alice@company.com"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="Set a password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Role</label>
                <select
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white"
                  name="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>

            {message ? (
              <div
                className={
                  status === "success"
                    ? "rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                    : "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                }
                role="status"
                aria-live="polite"
              >
                {message}
              </div>
            ) : null}

            <div className="flex justify-end gap-4 pt-4">
              <Link
                href="/users"
                className="px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save User"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
