import { type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  variant?: "default" | "warning" | "danger";
};

export function StatsCard({ title, value, icon: Icon, change, variant = "default" }: StatsCardProps) {
  const variantClasses = {
    default: "text-muted-foreground",
    warning: "text-yellow-600",
    danger: "text-destructive",
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn("text-xs", variantClasses[variant])}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
