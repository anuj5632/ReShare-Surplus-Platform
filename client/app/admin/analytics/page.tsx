"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AdminAnalyticsPage() {
  const [donationTrends, setDonationTrends] = useState<Array<any>>([])
  const [categoryDistribution, setCategoryDistribution] = useState<Array<any>>([])
  const [sustainabilityMetrics, setSustainabilityMetrics] = useState<Array<any>>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/analytics")
      const data = await res.json()
      setDonationTrends(data.donationTrends ?? [])
      setCategoryDistribution(data.categoryDistribution ?? [])
      setSustainabilityMetrics(data.sustainabilityMetrics ?? [])
    }
    load()
  }, [])

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Platform performance and impact metrics</p>
      </div>

      {/* Sustainability Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sustainabilityMetrics.map((metric, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground font-medium">{metric.metric}</p>
              <p className="text-2xl font-bold mt-2">{metric.value.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Donation Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Donation Trends</CardTitle>
          <CardDescription>Weekly statistics for the current month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="donations" fill="var(--color-primary)" name="Donations" />
              <Bar dataKey="items" fill="var(--color-accent)" name="Items" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Categories</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* People Served */}
        <Card>
          <CardHeader>
            <CardTitle>Impact Over Time</CardTitle>
            <CardDescription>Cumulative people served</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="people"
                  stroke="var(--color-primary)"
                  name="People Served"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900 mb-1">Positive Trend</p>
            <p className="text-sm text-green-800">
              Donations increased by 83% week-over-week. Current momentum suggests reaching 300 donations/week by
              month-end.
            </p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900 mb-1">Top Category</p>
            <p className="text-sm text-blue-800">
              Clothing donations represent 32% of all donations, followed by Food at 20%.
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="font-semibold text-purple-900 mb-1">Community Impact</p>
            <p className="text-sm text-purple-800">
              Over 5,400 people have been served to date. Average of 1,350 people served per week.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
