"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  List,
  Users,
  Settings,
  LogOut,
  ArrowRightLeft,
  Truck
} from "lucide-react"
import { useRouter } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: 3
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: List,
    badge: 1
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: ArrowRightLeft,
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: Truck,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to log out.");
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <aside className="hidden w-64 flex-col bg-sidebar text-sidebar-foreground md:flex p-6 rounded-3xl m-4 h-[calc(100vh-2rem)] shrink-0 shadow-lg">
      <div className="flex h-12 items-center px-4 font-bold text-2xl mb-8 tracking-tighter">
        <span className="text-accent mr-2">✦</span> flux
      </div>

      <nav className="flex-1 space-y-2">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-full px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
              )}
            >
              <div className="flex items-center">
                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/60")} />
                {item.title}
              </div>
              {item.badge && (
                <span className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                  isActive ? "bg-accent text-accent-foreground" : "bg-sidebar-accent/20 text-sidebar-foreground"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade to Pro Promo Card matching the design */}
      <div className="mt-8 rounded-2xl bg-accent p-5 text-accent-foreground shadow-[0_8px_30px_rgb(204,255,0,0.3)]">
        <h4 className="font-bold mb-1">Upgrade to Pro</h4>
        <p className="text-xs opacity-80 mb-4">
          Upgrade your account for a fuller experience.
        </p>
        <button className="w-full rounded-full bg-sidebar py-2.5 text-xs font-semibold text-sidebar-foreground transition-transform hover:scale-105">
          Upgrade Now
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-full px-4 py-3 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
        >
          <LogOut className="mr-3 h-5 w-5 text-sidebar-foreground/60" />
          Logout
        </button>
      </div>
    </aside>
  )
}
