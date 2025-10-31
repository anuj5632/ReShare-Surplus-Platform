import { NextResponse } from "next/server"

let profile = {
  name: "Green Earth Community",
  registrationId: "NGO/2020/00456",
  email: "contact@greenearth.org",
  phone: "+1 (555) 123-4567",
  address: "123 Green Street, Sustainability City, SC 12345",
  areaOfService: "Environmental Conservation, Education",
  description:
    "Green Earth Community is dedicated to environmental sustainability and community education. We focus on waste reduction and promoting circular economy practices.",
  website: "www.greenearth.org",
  verified: true,
}

export async function GET() {
  return NextResponse.json(profile)
}

export async function PUT(request: Request) {
  const updated = await request.json()
  profile = { ...profile, ...updated }
  return NextResponse.json(profile)
}


