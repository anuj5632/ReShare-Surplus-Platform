"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Eye } from "lucide-react"

type NGO = {
  id: number
  name: string
  registrationId: string
  date: string
  status: "pending" | "verified" | "rejected"
  documents: boolean
  areaOfService: string
}

export default function VerifyNGOsPage() {
  const [ngos, setNgos] = useState<NGO[]>([
    {
      id: 1,
      name: "Green Earth Community",
      registrationId: "NGO/2020/00456",
      date: "Oct 31, 2024",
      status: "pending",
      documents: true,
      areaOfService: "Environmental Conservation",
    },
    {
      id: 2,
      name: "Community Kitchen",
      registrationId: "NGO/2019/00234",
      date: "Oct 30, 2024",
      status: "pending",
      documents: true,
      areaOfService: "Food Security",
    },
    {
      id: 3,
      name: "Knowledge First",
      registrationId: "NGO/2021/00567",
      date: "Oct 28, 2024",
      status: "pending",
      documents: true,
      areaOfService: "Education",
    },
    {
      id: 4,
      name: "Health First Foundation",
      registrationId: "NGO/2018/00123",
      date: "Oct 25, 2024",
      status: "verified",
      documents: true,
      areaOfService: "Healthcare",
    },
    {
      id: 5,
      name: "Tech for All",
      registrationId: "NGO/2022/00789",
      date: "Oct 20, 2024",
      status: "verified",
      documents: true,
      areaOfService: "Technology Education",
    },
  ])

  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState<"approve" | "reject" | null>(null)

  const handleApprove = (ngoId: number) => {
    setNgos((prev) => prev.map((ngo) => (ngo.id === ngoId ? { ...ngo, status: "verified" } : ngo)))
    setShowModal(false)
    setSelectedNGO(null)
  }

  const handleReject = (ngoId: number) => {
    setNgos((prev) => prev.map((ngo) => (ngo.id === ngoId ? { ...ngo, status: "rejected" } : ngo)))
    setShowModal(false)
    setSelectedNGO(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "verified":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingNGOs = ngos.filter((ngo) => ngo.status === "pending")
  const verifiedNGOs = ngos.filter((ngo) => ngo.status === "verified")
  const rejectedNGOs = ngos.filter((ngo) => ngo.status === "rejected")

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">NGO Verification</h1>
        <p className="text-muted-foreground">Review and approve organization registrations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-amber-600">{pendingNGOs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Verified</p>
            <p className="text-2xl font-bold text-green-600">{verifiedNGOs.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{rejectedNGOs.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending NGOs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Applications</CardTitle>
          <CardDescription>NGOs awaiting verification</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingNGOs.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No pending applications</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr className="text-muted-foreground">
                    <th className="text-left py-3 px-4 font-medium">Organization</th>
                    <th className="text-left py-3 px-4 font-medium">Registration ID</th>
                    <th className="text-left py-3 px-4 font-medium">Service Area</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingNGOs.map((ngo) => (
                    <tr key={ngo.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{ngo.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{ngo.registrationId}</td>
                      <td className="py-3 px-4 text-muted-foreground">{ngo.areaOfService}</td>
                      <td className="py-3 px-4 text-muted-foreground">{ngo.date}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedNGO(ngo)
                              setAction(null)
                              setShowModal(true)
                            }}
                            className="bg-transparent"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(ngo.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(ngo.id)}>
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verified NGOs */}
      <Card>
        <CardHeader>
          <CardTitle>Verified Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {verifiedNGOs.map((ngo) => (
              <div key={ngo.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="font-medium">{ngo.name}</p>
                  <p className="text-xs text-muted-foreground">{ngo.registrationId}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      {showModal && selectedNGO && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{selectedNGO.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Registration ID</p>
                <p className="font-medium">{selectedNGO.registrationId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Service Area</p>
                <p className="font-medium">{selectedNGO.areaOfService}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Documents</p>
                <p className="font-medium">{selectedNGO.documents ? "Verified" : "Missing"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Application Date</p>
                <p className="font-medium">{selectedNGO.date}</p>
              </div>

              <div className="pt-4 border-t border-border flex gap-2">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(selectedNGO.id)}
                >
                  Approve
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => handleReject(selectedNGO.id)}>
                  Reject
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
