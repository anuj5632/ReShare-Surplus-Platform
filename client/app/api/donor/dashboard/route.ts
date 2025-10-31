import { NextRequest, NextResponse } from "next/server"

type DonorStats = {
  label: string
  value: number
}

const donorDataByUser: Record<string, { stats: DonorStats[]; recentDonations: any[] }> = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "anonymous"

  if (!donorDataByUser[userId]) {
    donorDataByUser[userId] = {
      stats: [
        { label: "Total Donations", value: 0 },
        { label: "Items Donated", value: 0 },
        { label: "People Helped", value: 0 },
        { label: "Impact Points", value: 0 },
      ],
      recentDonations: [],
    }
  }

  return NextResponse.json(donorDataByUser[userId])
}


