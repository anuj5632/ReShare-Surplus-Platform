import type React from "react"
import { RoleSelector } from "@/components/role-selector"
import VolunteerSidebar from "@/components/volunteer-sidebar"

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <VolunteerSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
      <RoleSelector />
    </div>
  )
}
