"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-07-01", heartRate: 72, bp: 120, o2: 98 },
  { date: "2024-07-02", heartRate: 75, bp: 122, o2: 97 },
  { date: "2024-07-03", heartRate: 70, bp: 118, o2: 99 },
  { date: "2024-07-04", heartRate: 78, bp: 125, o2: 96 },
  { date: "2024-07-05", heartRate: 80, bp: 128, o2: 95 },
  { date: "2024-07-06", heartRate: 76, bp: 124, o2: 97 },
  { date: "2024-07-07", heartRate: 74, bp: 121, o2: 98 },
  { date: "2024-07-08", heartRate: 73, bp: 123, o2: 98 },
  { date: "2024-07-09", heartRate: 76, bp: 126, o2: 97 },
  { date: "2024-07-10", heartRate: 71, bp: 119, o2: 99 },
  { date: "2024-07-11", heartRate: 79, bp: 127, o2: 96 },
  { date: "2024-07-12", heartRate: 81, bp: 130, o2: 95 },
  { date: "2024-07-13", heartRate: 77, bp: 125, o2: 97 },
  { date: "2024-07-14", heartRate: 75, bp: 122, o2: 98 },
];

const chartConfig = {
  heartRate: {
    label: "Heart Rate (bpm)",
    color: "hsl(var(--chart-1))",
  },
  bp: {
    label: "Systolic BP (mmHg)",
    color: "hsl(var(--chart-2))",
  },
  o2: {
    label: "O2 Saturation (%)",
    color: "hsl(var(--chart-3))",
  }
}

export function VitalsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vital Signs Trend</CardTitle>
        <CardDescription>Bi-weekly vitals for resident John Smith</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
             <YAxis
              yAxisId="farRight"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              hide
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="heartRate"
              type="monotone"
              stroke="var(--color-heartRate)"
              strokeWidth={2}
              dot={false}
              yAxisId="left"
              name="Heart Rate"
            />
             <Line
              dataKey="bp"
              type="monotone"
              stroke="var(--color-bp)"
              strokeWidth={2}
              dot={false}
              yAxisId="right"
              name="Systolic BP"
            />
            <Line
              dataKey="o2"
              type="monotone"
              stroke="var(--color-o2)"
              strokeWidth={2}
              dot={false}
              yAxisId="farRight"
              name="O2 Saturation"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
