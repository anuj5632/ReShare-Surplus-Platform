import { NextResponse } from "next/server"

export async function GET() {
  const stats = [
    { label: "Total Claims", value: 18 },
    { label: "Items Received", value: 247 },
    { label: "People Served", value: 521 },
    { label: "Pending Verification", value: "7 days" },
  ]

  const activeClaims = [
    {
      id: 1,
      title: "Winter Clothing Bundle",
      donor: "Sarah Johnson",
      quantity: 12,
      status: "pickup-arranged",
      date: "Nov 2, 2024",
    },
    {
      id: 2,
      title: "Educational Books",
      donor: "Michael Chen",
      quantity: 45,
      status: "in-transit",
      date: "Nov 1, 2024",
    },
    {
      id: 3,
      title: "Kitchen Equipment",
      donor: "Emily Rodriguez",
      quantity: 8,
      status: "claimed",
      date: "Oct 31, 2024",
    },
  ]

  return NextResponse.json({ stats, activeClaims })
}


