
"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useSearch } from "@/contexts/search-context";

const alerts = [
  {
    resident: "Jane Cooper",
    time: "2m ago",
    type: "High Heart Rate",
    severity: "Critical",
  },
  {
    resident: "John Smith",
    time: "15m ago",
    type: "Low O2 Saturation",
    severity: "Warning",
  },
  {
    resident: "Cody Fisher",
    time: "30m ago",
    type: "Fall Detected",
    severity: "Critical",
  },
  {
    resident: "Esther Howard",
    time: "1h ago",
    type: "Unusual Sleep Pattern",
    severity: "Info",
  },
  {
    resident: "Robert Fox",
    time: "2h ago",
    type: "High Blood Pressure",
    severity: "Warning",
  },
  {
    resident: "Eleanor Pena",
    time: "3h ago",
    type: "Geofence Breach",
    severity: "Critical",
  },
  {
    resident: "Jacob Jones",
    time: "4h ago",
    type: "Irregular Heartbeat",
    severity: "Warning",
  }
];

export function AlertsFeed({ showAll = false }: { showAll?: boolean }) {
  const { searchQuery } = useSearch();

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const alertsToShow = showAll ? filteredAlerts : filteredAlerts.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{showAll ? "All Active Alerts" : "Recent Alerts"}</CardTitle>
          <CardDescription>
            {showAll ? "Review, acknowledge, and manage all system alerts." : "An overview of the latest system alerts."}
          </CardDescription>
        </div>
        {!showAll && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/dashboard/alerts">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resident</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alertsToShow.length > 0 ? (
              alertsToShow.map((alert) => (
                <TableRow key={alert.resident + alert.time}>
                  <TableCell>
                    <div className="font-medium">{alert.resident}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {alert.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {alert.time}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        alert.severity === "Critical"
                          ? "destructive"
                          : alert.severity === "Warning"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        alert.severity === "Warning" ? "bg-yellow-400 text-yellow-900" : ""
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No alerts found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
