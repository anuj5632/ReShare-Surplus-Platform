import { NextRequest, NextResponse } from "next/server"

type VolunteerStats = { label: string; value: number }

const volunteerDataByUser: Record<string, { stats: VolunteerStats[]; upcomingTasks: any[] }> = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "anonymous"

  if (!volunteerDataByUser[userId]) {
    volunteerDataByUser[userId] = {
      stats: [
        { label: "Tasks Completed", value: 0 },
        { label: "Hours Volunteered", value: 0 },
        { label: "Impact Points", value: 0 },
        { label: "Badges Earned", value: 0 },
      ],
      upcomingTasks: [],
    }
  }

  return NextResponse.json(volunteerDataByUser[userId])
}


