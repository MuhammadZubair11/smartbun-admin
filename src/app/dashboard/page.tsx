import { Users, AlertTriangle, Pill, Bone } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { VitalsChart } from "@/components/dashboard/vitals-chart";
import { AlertsFeed } from "@/components/dashboard/alerts-feed";
import { DashboardMapLoader } from "@/components/dashboard/dashboard-map-loader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResidentsTable } from "@/components/dashboard/residents-table";


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Active Residents"
          value="124"
          icon={Users}
          change="+2 since last week"
        />
        <StatsCard
          title="Alerts (24h)"
          value="15"
          icon={AlertTriangle}
          change="-5 since yesterday"
          variant="warning"
        />
        <StatsCard
          title="Medication Adherence"
          value="98%"
          icon={Pill}
          change="+1% vs last week"
        />
        <StatsCard
          title="Fall Incidents (Month)"
          value="3"
          icon={Bone}
          change="1 this week"
          variant="danger"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <div className="space-y-8">
          <VitalsChart />
          <DashboardMapLoader />
        </div>
        <div className="space-y-8">
          <AlertsFeed />
          <Card>
            <CardHeader>
              <CardTitle>Residents</CardTitle>
              <CardDescription>A quick look at current residents.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResidentsTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
