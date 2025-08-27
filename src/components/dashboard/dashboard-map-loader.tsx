
"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// The resident map is dynamically imported to prevent server-side rendering issues with Leaflet.
const ResidentMap = dynamic(
  () => import("@/components/dashboard/resident-map").then((mod) => mod.ResidentMap),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

export function DashboardMapLoader() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Resident Location Overview</CardTitle>
                <CardDescription>
                Live view of resident locations and geofence zones.
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResidentMap />
            </CardContent>
        </Card>
    );
}
