"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, Building2, Package, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "2,847", icon: Users, color: "text-blue-600" },
    { label: "Verified NGOs", value: "124", icon: Building2, color: "text-green-600" },
    { label: "Pending Verification", value: "12", icon: AlertCircle, color: "text-amber-600" },
    { label: "Total Donations", value: "8,924", icon: Package, color: "text-purple-600" },
  ]

  const chartData = [
    { month: "Jan", users: 400, donations: 240, impact: 2400 },
    { month: "Feb", users: 520, donations: 320, impact: 2210 },
    { month: "Mar", users: 680, donations: 450, impact: 2290 },
    { month: "Apr", users: 890, donations: 620, impact: 2000 },
    { month: "May", users: 1200, donations: 890, impact: 2181 },
    { month: "Jun", users: 1650, donations: 1250, impact: 2500 },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Stats Cards */}
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

      {/* Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Pending Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-900 mb-4">12 NGOs waiting for approval</p>
            <Link href="/admin/verify-ngos">
              <Button size="sm">Review Pending</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Platform Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-900 mb-4">245% growth in donations this month</p>
            <Link href="/admin/analytics">
              <Button size="sm">View Analytics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Growth Metrics</CardTitle>
          <CardDescription>User growth and donation trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="var(--color-primary)" name="Users" />
              <Line type="monotone" dataKey="donations" stroke="var(--color-accent)" name="Donations" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Impact</CardTitle>
          <CardDescription>Sustainability impact metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="impact" fill="var(--color-primary)" name="Impact Score" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
