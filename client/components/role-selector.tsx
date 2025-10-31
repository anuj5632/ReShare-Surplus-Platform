"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Crown } from "lucide-react"

export function RoleSelector() {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    setUserRole(role)
  }, [])

  const roles = [
    { id: "donor", label: "Donor" },
    { id: "ngo", label: "NGO" },
    { id: "volunteer", label: "Volunteer" },
    { id: "admin", label: "Admin" },
  ]

  const handleRoleSwitch = useCallback((newRole: string) => {
    localStorage.setItem("userRole", newRole)
    setUserRole(newRole)

    const roleRoutes: { [key: string]: string } = {
      donor: "/donor/dashboard",
      ngo: "/ngo/dashboard",
      volunteer: "/volunteer/dashboard",
      admin: "/admin/dashboard",
    }
    window.location.href = roleRoutes[newRole] || "/donor/dashboard"
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <Crown className="w-4 h-4 text-accent" />
          <p className="text-sm font-semibold">Demo: Switch Role</p>
        </div>
        <div className="space-y-2">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSwitch(role.id)}
              className={`w-full px-3 py-2 text-sm rounded-md transition ${
                userRole === role.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <Link href="/" className="text-xs text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
