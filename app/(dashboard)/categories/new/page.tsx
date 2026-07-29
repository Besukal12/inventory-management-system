"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

export default function NewCategoryPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setStatus("idle")
    setMessage("")

    const response = await fetch("/api/categories/create_category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.trim() }),
    })

    const result = await response.json()

    if (response.ok) {
      setStatus("success")
      setMessage(result.message || "Category created successfully.")
      router.push("/categories")
    } else {
      setStatus("error")
      setMessage(result.message || "Failed to create category.")
    }

    setSaving(false)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/categories" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
          <p className="text-muted-foreground">Add a new category for your products.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2 max-w-lg">
              <label className="text-sm font-semibold">Category Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                placeholder="e.g. Electronics"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
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
                href="/categories"
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
                {saving ? "Saving..." : "Save Category"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
