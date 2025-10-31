import { NextResponse } from "next/server"

export async function GET() {
  const donationTrends = [
    { week: "Week 1", donations: 0, items: 0, people: 0 },
    { week: "Week 2", donations: 0, items: 0, people: 0 },
    { week: "Week 3", donations: 0, items: 0, people: 0 },
    { week: "Week 4", donations: 0, items: 0, people: 0 },
  ]

  const categoryDistribution = [
    { name: "Clothing", value: 0, color: "#2d7a8b" },
    { name: "Books", value: 0, color: "#d4a373" },
    { name: "Electronics", value: 0, color: "#4a9ebb" },
    { name: "Food", value: 0, color: "#7fb069" },
    { name: "Other", value: 0, color: "#a2a2a2" },
  ]

  const sustainabilityMetrics = [
    { metric: "CO₂ Saved (tons)", value: 0 },
    { metric: "Waste Diverted (kg)", value: 0 },
    { metric: "Water Saved (liters)", value: 0 },
    { metric: "People Served", value: 0 },
  ]

  return NextResponse.json({ donationTrends, categoryDistribution, sustainabilityMetrics })
}


