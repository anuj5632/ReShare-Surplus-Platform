"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export default function VolunteerProfilePage() {
  const profile = {
    name: "Alex Johnson",
    email: "alex@email.com",
    phone: "+1 (555) 987-6543",
    interests: ["Distribution", "Community Events", "Technical Skills"],
    skills: ["Organization", "Leadership", "Problem Solving"],
    hoursVolunteered: 24.5,
    tasksCompleted: 12,
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">Your volunteer information and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Hours Volunteered</p>
            <p className="text-3xl font-bold mt-2">{profile.hoursVolunteered}h</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Tasks Completed</p>
            <p className="text-3xl font-bold mt-2">{profile.tasksCompleted}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Badges Earned</p>
            <p className="text-3xl font-bold mt-2">5</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Name</p>
            <p className="font-semibold">{profile.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Email</p>
            <p className="font-semibold">{profile.email}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Phone</p>
            <p className="font-semibold">{profile.phone}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interests & Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-2">Areas of Interest</p>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <Badge key={skill} className="bg-primary/10 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "First Task", icon: "🎯" },
              { name: "Community Helper", icon: "🤝" },
              { name: "10 Tasks", icon: "✓✓" },
              { name: "50 Hours", icon: "⏱️" },
              { name: "Top Volunteer", icon: "⭐" },
            ].map((achievement) => (
              <div key={achievement.name} className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-medium">{achievement.name}</p>
                <CheckCircle className="w-4 h-4 text-accent mx-auto mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
