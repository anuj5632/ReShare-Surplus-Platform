"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Gift, MapPin, User2, TrendingUp, ArrowRight, Plus, Package } from "lucide-react"

export default function DonorDashboard() {
  const [stats, setStats] = useState<Array<{ label: string; value: number; icon: any; color: string }>>([
    { label: "Total Donations", value: 0, icon: Gift, color: "text-blue-600" },
    { label: "Items Donated", value: 0, icon: Package, color: "text-green-600" },
    { label: "People Helped", value: 0, icon: User2, color: "text-purple-600" },
    { label: "Impact Points", value: 0, icon: TrendingUp, color: "text-amber-600" },
  ])
  const [recentDonations, setRecentDonations] = useState<Array<any>>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/donor/dashboard")
      const data = await res.json()
      const mappedStats = [
        { label: "Total Donations", value: data.stats?.[0]?.value ?? 0, icon: Gift, color: "text-blue-600" },
        { label: "Items Donated", value: data.stats?.[1]?.value ?? 0, icon: Package, color: "text-green-600" },
        { label: "People Helped", value: data.stats?.[2]?.value ?? 0, icon: User2, color: "text-purple-600" },
        { label: "Impact Points", value: data.stats?.[3]?.value ?? 0, icon: TrendingUp, color: "text-amber-600" },
      ]
      setStats(mappedStats)
      setRecentDonations(data.recentDonations ?? [])
    }
    load()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700"
      case "In Transit":
        return "bg-blue-100 text-blue-700"
      case "Claimed":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Donor!</h1>
          <p className="text-muted-foreground">Here's your donation overview</p>
        </div>
        <Link href="/donor/post-donation">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Donation
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
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

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Your latest donation activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDonations.map((donation) => (
              <div
                key={donation.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{donation.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {donation.ngo} • {donation.items} items
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{donation.date}</p>
                  </div>
                  <Link href={`/donor/donation/${donation.id}`}>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Browse Available NGOs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Find organizations near you that are actively receiving donations.
            </p>
            <Link href="/map">
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                View Map
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="text-lg">Share Your Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              See the real-world impact of your donations and earn badges.
            </p>
            <Link href="/donor/impact">
              <Button variant="outline">View Impact</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
