
"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ResidentMap = dynamic(
  () => import("@/components/dashboard/resident-map").then((mod) => mod.ResidentMap),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

export function MapLoader() {
  return (
    <Card className="w-full h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader>
        <CardTitle>Live Resident Locations</CardTitle>
        <CardDescription>
          Monitor resident locations in real-time and manage geofences.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ResidentMap />
      </CardContent>
    </Card>
  );
}
