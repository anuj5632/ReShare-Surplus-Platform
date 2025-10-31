"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Edit2, Save } from "lucide-react"

export default function NGOProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    registrationId: "",
    email: "",
    phone: "",
    address: "",
    areaOfService: "",
    description: "",
    website: "",
    verified: false,
  })

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/ngo/profile")
      const data = await res.json()
      setProfile(data)
    }
    load()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    const res = await fetch("/api/ngo/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
    const updated = await res.json()
    setProfile(updated)
    setIsEditing(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Organization Profile</h1>
          <p className="text-muted-foreground">Manage your NGO information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "default" : "outline"}
          className="bg-transparent"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>Your verified NGO information</CardDescription>
            </div>
            {profile.verified && (
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Organization Name</label>
                  <Input name="name" value={profile.name} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Registration ID</label>
                  <Input name="registrationId" value={profile.registrationId} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" name="email" value={profile.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input name="phone" value={profile.phone} onChange={handleChange} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Input name="address" value={profile.address} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <Input name="website" value={profile.website} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Area of Service</label>
                  <Input name="areaOfService" value={profile.areaOfService} onChange={handleChange} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    className="w-full min-h-24 p-3 border border-border rounded-md text-sm resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Organization Name</p>
                  <p className="font-semibold mt-1">{profile.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Registration ID</p>
                  <p className="font-semibold mt-1">{profile.registrationId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Email</p>
                  <p className="font-semibold mt-1">{profile.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Phone</p>
                  <p className="font-semibold mt-1">{profile.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground font-medium">Address</p>
                  <p className="font-semibold mt-1">{profile.address}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Website</p>
                  <p className="font-semibold mt-1">{profile.website}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Area of Service</p>
                  <p className="font-semibold mt-1">{profile.areaOfService}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground font-medium">Description</p>
                  <p className="font-semibold mt-1">{profile.description}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Claims Made</p>
            <p className="text-3xl font-bold mt-2">47</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Items Received</p>
            <p className="text-3xl font-bold mt-2">892</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">People Served</p>
            <p className="text-3xl font-bold mt-2">1,247</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
