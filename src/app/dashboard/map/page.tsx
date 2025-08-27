
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MapLoader } from "@/components/dashboard/map-loader";

export default function MapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Resident Tracking</h1>
      <MapLoader />
    </div>
  );
}
