"use client"

import { Search, Bell } from "lucide-react"

export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between px-8 bg-transparent">
      <div className="flex items-center gap-4 w-full max-w-2xl">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full bg-white px-10 py-3 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm font-medium text-muted-foreground hidden md:flex items-center gap-4">
          <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <div className="bg-white rounded-full px-4 py-2 shadow-sm font-semibold text-foreground cursor-pointer flex items-center gap-2">
            Today
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <button className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-105">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute right-3 top-3 flex h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  )
}
