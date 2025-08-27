import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResidentsTable } from "@/components/dashboard/residents-table";

export default function ResidentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Resident Management</h1>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Resident List</CardTitle>
          <CardDescription>
            A list of all residents in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResidentsTable />
        </CardContent>
      </Card>
    </div>
  );
}
