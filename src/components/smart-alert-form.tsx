
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateSmartAlert,
  type GenerateSmartAlertOutput,
} from "@/ai/flows/generate-smart-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Volume2, Info, Lightbulb, TriangleAlert } from "lucide-react";

const VitalSignsSchema = z.object({
  heartRate: z.coerce.number().min(30).max(220),
  bloodPressureSystolic: z.coerce.number().min(50).max(300),
  bloodPressureDiastolic: z.coerce.number().min(30).max(200),
  oxygenSaturation: z.coerce.number().min(70).max(100),
  temperature: z.coerce.number().min(95).max(106),
  respiratoryRate: z.coerce.number().min(8).max(40),
});

const formSchema = z.object({
  residentName: z.string().min(2, "Resident name is required."),
  medicalHistory: z.string().min(10, "Medical history is required."),
  currentMedications: z.string().min(2, "Current medications are required."),
  medicationAllergies: z.string().min(2, "Medication allergies are required."),
  vitalSigns: VitalSignsSchema,
});

type FormData = z.infer<typeof formSchema>;

export function SmartAlertForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateSmartAlertOutput | null>(null);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      residentName: "John Smith",
      medicalHistory: "History of hypertension and diabetes. Allergic to penicillin.",
      currentMedications: "Lisinopril, Metformin",
      medicationAllergies: "Penicillin",
      vitalSigns: {
        heartRate: 95,
        bloodPressureSystolic: 140,
        bloodPressureDiastolic: 90,
        oxygenSaturation: 92,
        temperature: 99.5,
        respiratoryRate: 22,
      },
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);
    setResult(null);
    try {
      const response = await generateSmartAlert(values);
      setResult(response);
    } catch (error) {
      console.error("Error generating smart alert:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate smart alert. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
             <FormField
                control={form.control}
                name="residentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resident Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., History of hypertension and diabetes." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="currentMedications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Medications</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Lisinopril, Metformin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="medicationAllergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Allergies</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Penicillin, Sulfa drugs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(VitalSignsSchema.shape).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={`vitalSigns.${key as keyof typeof VitalSignsSchema.shape}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Alert
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-center">
        {loading && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p>Analyzing data and generating alert...</p>
          </div>
        )}
        {result && (
          <Card className="w-full bg-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <TriangleAlert className="h-6 w-6" />
                Smart Alert Generated
              </CardTitle>
              <CardDescription>
                AI-powered analysis of the provided vital signs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <Info className="h-5 w-5 text-primary" />
                  Alert Summary
                </h3>
                <p className="text-destructive-foreground/80">{result.alertSummary}</p>
                 {result.audioAlert && (
                  <>
                    <audio ref={audioRef} src={result.audioAlert} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => audioRef.current?.play()}
                    >
                      <Volume2 className="mr-2 h-4 w-4" />
                      Play Audio Alert
                    </Button>
                  </>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <TriangleAlert className="h-5 w-5 text-primary" />
                   Alert Details
                </h3>
                <p className="text-destructive-foreground/80">{result.alertDetails}</p>
              </div>
              <div className="space-y-1">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Suggested Actions
                </h3>
                <p className="text-destructive-foreground/80">{result.suggestedActions}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
