"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, Users, TrendingUp, Clock, MapPin } from "lucide-react"

export default function NGODashboard() {
  const [stats, setStats] = useState<Array<{ label: string; value: string | number; icon: any; color: string }>>([
    { label: "Total Claims", value: 0, icon: Package, color: "text-blue-600" },
    { label: "Items Received", value: 0, icon: TrendingUp, color: "text-green-600" },
    { label: "People Served", value: 0, icon: Users, color: "text-purple-600" },
    { label: "Pending Verification", value: "-", icon: Clock, color: "text-amber-600" },
  ])
  const [activeClaims, setActiveClaims] = useState<Array<{ id: number; title: string; donor: string; quantity: number; status: string; date: string }>>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/ngo/dashboard")
      const data = await res.json()
      const mappedStats = [
        { label: "Total Claims", value: data.stats[0]?.value ?? 0, icon: Package, color: "text-blue-600" },
        { label: "Items Received", value: data.stats[1]?.value ?? 0, icon: TrendingUp, color: "text-green-600" },
        { label: "People Served", value: data.stats[2]?.value ?? 0, icon: Users, color: "text-purple-600" },
        { label: "Pending Verification", value: data.stats[3]?.value ?? "-", icon: Clock, color: "text-amber-600" },
      ]
      setStats(mappedStats)
      setActiveClaims(data.activeClaims ?? [])
    }
    load()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "claimed":
        return "bg-blue-100 text-blue-700"
      case "pickup-arranged":
        return "bg-amber-100 text-amber-700"
      case "in-transit":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, Green Earth Community</h1>
          <p className="text-muted-foreground">Your NGO dashboard overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Active Claims</CardTitle>
            <CardDescription>Items you've claimed from donors</CardDescription>
          </div>
          <Link href="/ngo/claims">
            <Button variant="outline">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeClaims.map((claim) => (
              <div key={claim.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{claim.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      From: {claim.donor} • {claim.quantity} items
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
                      {claim.status === "pickup-arranged"
                        ? "Pickup Arranged"
                        : claim.status === "in-transit"
                          ? "In Transit"
                          : "Claimed"}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">{claim.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Browse Available Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Find new donation opportunities in your service area.</p>
            <Link href="/map">
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                View Donations Map
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-lg">Manage Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Update your organization information and preferences.</p>
            <Link href="/ngo/profile">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Impact This Month</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-900 font-medium">Items Distributed</p>
            <p className="text-2xl font-bold text-green-700 mt-1">89</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 font-medium">People Served</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">156</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-900 font-medium">Waste Diverted</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">234 kg</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
