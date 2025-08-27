import { AlertsFeed } from "@/components/dashboard/alerts-feed";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Alerts Management</h1>
      <AlertsFeed showAll={true} />
    </div>
  );
}
