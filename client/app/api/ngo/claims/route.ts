import { NextResponse } from "next/server"

export async function GET() {
  const allClaims = [
    {
      id: 1,
      title: "Winter Clothing Bundle",
      donor: "Sarah Johnson",
      quantity: 12,
      status: "pickup-arranged",
      date: "Nov 2, 2024",
      location: "45 Green St, Downtown",
      beneficiaries: 24,
    },
    {
      id: 2,
      title: "Educational Books",
      donor: "Michael Chen",
      quantity: 45,
      status: "in-transit",
      date: "Nov 1, 2024",
      location: "789 Oak Ave, Midtown",
      beneficiaries: 67,
    },
    {
      id: 3,
      title: "Kitchen Equipment",
      donor: "Emily Rodriguez",
      quantity: 8,
      status: "claimed",
      date: "Oct 31, 2024",
      location: "321 Elm Rd, Uptown",
      beneficiaries: 12,
    },
    {
      id: 4,
      title: "Medical Supplies",
      donor: "John Smith",
      quantity: 32,
      status: "delivered",
      date: "Oct 28, 2024",
      location: "654 Pine Ln, Downtown",
      beneficiaries: 89,
    },
  ]

  return NextResponse.json({ claims: allClaims })
}


