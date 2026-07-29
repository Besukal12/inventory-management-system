"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewSupplierPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/suppliers" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Supplier</h1>
          <p className="text-muted-foreground">Add a new supplier to your records.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Supplier Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. TechTronix Inc"
                  name="name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Contact Person</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. Jane Doe"
                  name="contactPerson"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Phone</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. +15551234567"
                  name="phone"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. contact@supplier.com"
                  name="email"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold">Address</label>
                <textarea
                  className="w-full px-4 py-3 rounded-2xl border focus:ring-2 focus:ring-accent outline-none min-h-[100px]"
                  placeholder="Supplier address..."
                  name="address"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link
                href="/suppliers"
                className="px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm"
              >
                <Save className="h-4 w-4" /> Save Supplier
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
