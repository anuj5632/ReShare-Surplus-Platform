"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Package, MapPin, Users } from "lucide-react"

export default function NGOClaimsPage() {
  const [allClaims, setAllClaims] = useState<Array<{ id: number; title: string; donor: string; quantity: number; status: string; date: string; location: string; beneficiaries: number }>>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/ngo/claims")
      const data = await res.json()
      setAllClaims(data.claims ?? [])
    }
    load()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "claimed":
        return <Package className="w-5 h-5" />
      case "pickup-arranged":
        return <Clock className="w-5 h-5" />
      case "in-transit":
        return <Clock className="w-5 h-5" />
      case "delivered":
        return <CheckCircle className="w-5 h-5" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pickup-arranged":
        return "Pickup Arranged"
      case "in-transit":
        return "In Transit"
      case "claimed":
        return "Claimed"
      case "delivered":
        return "Delivered"
      default:
        return status
    }
  }

  const filterClaims = (status: string) => {
    if (status === "all") return allClaims
    return allClaims.filter((c) => c.status === status)
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Claims</h1>
        <p className="text-muted-foreground">Track items you've claimed and their delivery status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claims Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="claimed">Claimed</TabsTrigger>
              <TabsTrigger value="pickup-arranged">Pickup Arranged</TabsTrigger>
              <TabsTrigger value="in-transit">In Transit</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            {["all", "claimed", "pickup-arranged", "in-transit", "delivered"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4 mt-6">
                {filterClaims(tab).map((claim) => (
                  <div key={claim.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{claim.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">From: {claim.donor}</p>
                      </div>
                      <Badge variant="outline">{claim.quantity} items</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex gap-2 items-start">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{claim.location}</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Users className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{claim.beneficiaries} people will benefit</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        {getStatusIcon(claim.status)}
                        <span className="font-medium">{getStatusLabel(claim.status)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">{claim.date}</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
