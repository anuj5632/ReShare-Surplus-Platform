"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Leaf, Users, Zap, Award } from "lucide-react"

export default function DonorImpactPage() {
  const impactData = [
    { month: "Jan", items: 12, people: 45 },
    { month: "Feb", items: 19, people: 62 },
    { month: "Mar", items: 15, people: 58 },
    { month: "Apr", items: 28, people: 95 },
    { month: "May", items: 22, people: 78 },
    { month: "Jun", items: 35, people: 120 },
  ]

  const badges = [
    { name: "First Donation", unlocked: true, icon: "🎁" },
    { name: "Helping Hands", condition: "5 donations", unlocked: true, icon: "🤝" },
    { name: "Sustainability Hero", condition: "50 items donated", unlocked: true, icon: "🌱" },
    { name: "Community Champion", condition: "100 people helped", unlocked: false, icon: "🏆" },
    { name: "Green Guardian", condition: "1000 kg waste diverted", unlocked: false, icon: "♻️" },
  ]

  const stats = [
    { label: "CO₂ Saved", value: "245 kg", icon: Leaf, color: "text-green-600" },
    { label: "People Helped", value: "342", icon: Users, color: "text-blue-600" },
    { label: "Items Donated", value: "156", icon: Zap, color: "text-amber-600" },
    { label: "Impact Points", value: "1,240", icon: Award, color: "text-purple-600" },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Impact</h1>
        <p className="text-muted-foreground">See the real-world difference you're making</p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Donation Trends</CardTitle>
          <CardDescription>Your donation activity over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="items" fill="var(--color-primary)" name="Items" />
              <Bar dataKey="people" fill="var(--color-accent)" name="People Helped" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges & Achievements</CardTitle>
          <CardDescription>Unlock badges by reaching milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`text-center p-4 rounded-lg border ${
                  badge.unlocked ? "border-accent/50 bg-accent/10" : "border-muted bg-muted/20 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="font-semibold text-sm">{badge.name}</p>
                {!badge.unlocked && <p className="text-xs text-muted-foreground mt-1">{badge.condition}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sustainability Info */}
      <Card className="bg-gradient-to-br from-green-50 to-primary/5 border-green-200">
        <CardHeader>
          <CardTitle>Sustainability Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-green-900">Waste Diverted</p>
              <p className="text-2xl font-bold text-green-700">156 kg</p>
              <p className="text-xs text-green-600 mt-1">Equal to landfill saved</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Carbon Reduced</p>
              <p className="text-2xl font-bold text-green-700">245 kg CO₂</p>
              <p className="text-xs text-green-600 mt-1">Equivalent to planting 4 trees</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Water Saved</p>
              <p className="text-2xl font-bold text-green-700">1,200 L</p>
              <p className="text-xs text-green-600 mt-1">Manufacturing reduction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
