import type React from "react"
import { RoleSelector } from "@/components/role-selector"
import AdminSidebar from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
      <RoleSelector />
    </div>
  )
}
