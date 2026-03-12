"use client";

import * as React from "react";

import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CardExportButton as ExportButton } from "@/components/cards/card-action-menus";

const chartData = [
  { source: "usd", value: 435578, fill: "#B3E5C9" },
  { source: "eur", value: 102890, fill: "#9CD1FB" },
];

const chartConfig = {
  usd: {
    label: "USD",
    color: "#B3E5C9",
  },
  eur: {
    label: "EUR",
    color: "#9CD1FB",
  },
} satisfies ChartConfig;

type ChartConfigKeys = keyof typeof chartConfig;

export function IbansBalanceCard() {
  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="gap-2">
        <CardTitle>IBANs</CardTitle>
        <CardDescription>balance</CardDescription>
        <CardAction className="relative">
          <ExportButton className="absolute end-0 top-0" />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="source"
              innerRadius={60}
              strokeWidth={5}
              paddingAngle={3}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground font-display text-xl"
                        >
                          ${total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
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
                    backgroundColor:
                      chartConfig[item.source as ChartConfigKeys]?.color,
                  }}
                />
                <div className="text-xs tracking-wide uppercase">
                  {chartConfig[item.source as ChartConfigKeys]?.label}
                </div>
              </div>
              <div className="ms-3.5 text-lg font-semibold">
                ${item.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
