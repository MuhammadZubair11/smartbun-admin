import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartAlertForm } from "@/components/smart-alert-form";
import { BrainCircuit } from "lucide-react";

export default function SmartAlertPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BrainCircuit className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate Smart Alert</h1>
          <p className="text-muted-foreground">
            Use AI to analyze vital signs and generate intelligent health alerts for elderly patients.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vital Signs Input</CardTitle>
          <CardDescription>
            Enter the resident's information and latest vital signs data to generate an alert.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SmartAlertForm />
        </CardContent>
      </Card>
    </div>
  );
}
