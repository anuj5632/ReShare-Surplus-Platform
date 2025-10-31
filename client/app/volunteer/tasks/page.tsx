"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Search } from "lucide-react"
import { useState } from "react"

export default function VolunteerTasksPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const allTasks = [
    {
      id: 1,
      title: "Clothing Distribution - Downtown Center",
      ngo: "Green Earth Community",
      category: "Distribution",
      date: "Nov 5, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Downtown Community Center",
      volunteers: 4,
      maxVolunteers: 6,
      description: "Help distribute winter clothing to community members",
      icon: "👕",
    },
    {
      id: 2,
      title: "Food Bank Organization",
      ngo: "Community Kitchen",
      category: "Sorting & Packing",
      date: "Nov 6, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Food Bank Warehouse",
      volunteers: 6,
      maxVolunteers: 8,
      description: "Sort and organize donated food items",
      icon: "🍎",
    },
    {
      id: 3,
      title: "Book Drive Sort & Pack",
      ngo: "Knowledge First",
      category: "Sorting & Packing",
      date: "Nov 7, 2024",
      time: "9:00 AM - 1:00 PM",
      location: "Library Annex",
      volunteers: 3,
      maxVolunteers: 5,
      description: "Sort and pack books for schools in underserved areas",
      icon: "📚",
    },
    {
      id: 4,
      title: "Electronics Refurbishment Workshop",
      ngo: "Tech for All",
      category: "Technical",
      date: "Nov 8, 2024",
      time: "3:00 PM - 6:00 PM",
      location: "Tech Hub Downtown",
      volunteers: 2,
      maxVolunteers: 4,
      description: "Help prepare donated electronics for distribution",
      icon: "💻",
    },
    {
      id: 5,
      title: "School Supply Drive",
      ngo: "Education First",
      category: "Distribution",
      date: "Nov 9, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Central School",
      volunteers: 5,
      maxVolunteers: 10,
      description: "Distribute school supplies to students in need",
      icon: "✏️",
    },
  ]

  const filteredTasks = allTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.ngo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Available Tasks</h1>
        <p className="text-muted-foreground">Find volunteer opportunities that match your interests</p>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tasks or organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tasks Grid */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:border-primary/50 transition">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{task.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.ngo}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.date}, {task.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {task.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {task.volunteers}/{task.maxVolunteers} volunteers
                    </div>
                  </div>

                  <Badge variant="outline">{task.category}</Badge>
                </div>

                <Button className="flex-shrink-0">Sign Up</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
