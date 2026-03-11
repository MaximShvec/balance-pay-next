"use client";

import * as React from "react";

import { Label, Pie, PieChart } from "recharts";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { CardExportButton as ExportButton } from "@/components/cards/card-action-menus";

const chartData = [
  { source: "social", leads: 275, fill: "#9CD1FB" },
  { source: "email", leads: 200, fill: "#B3E5C9" },
  { source: "call", leads: 287, fill: "#FFD780" },
  { source: "others", leads: 173, fill: "#D5B8F8" }
];

const chartConfig = {
  social: {
    label: "Social",
    color: "#9CD1FB"
  },
  email: {
    label: "Email",
    color: "#B3E5C9"
  },
  call: {
    label: "Call",
    color: "#FFD780"
  },
  others: {
    label: "Others",
    color: "#D5B8F8"
  }
} satisfies ChartConfig;

type ChartConfigKeys = keyof typeof chartConfig;

export function LeadBySourceCard() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.leads, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Leads by Source</CardTitle>
        <CardAction className="relative">
          <ExportButton className="absolute end-0 top-0" />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="leads" nameKey="source" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-display text-3xl">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Leads
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex justify-around">
          {chartData.map((item) => (
            <div className="flex flex-col" key={item.source}>
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="block size-2 rounded-full"
                  style={{
                    backgroundColor: chartConfig[item.source as ChartConfigKeys]?.color
                  }}></span>
                <div className="text-xs tracking-wide uppercase">
                  {chartConfig[item.source as ChartConfigKeys]?.label}
                </div>
              </div>
              <div className="ms-3.5 text-lg font-semibold">{item.leads}</div>
            </div>
          ))}
          <div></div>
        </div>
      </CardContent>
    </Card>
  );
}
