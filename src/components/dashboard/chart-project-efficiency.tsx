"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Values from stat-cards.tsx (Crypto, Stable, Fiat) + total from welcome.tsx
const balanceData = [
  { name: "crypto", value: 25582.34, fill: "var(--chart-1)" },
  { name: "stable", value: 3413.25, fill: "var(--chart-2)" },
  { name: "fiat", value: 1234.56, fill: "var(--chart-3)" },
];

const totalBalance = 39231.9; // from welcome.tsx

const chartConfig = {
  value: {
    label: "Balance",
  },
  crypto: {
    label: "Crypto",
    color: "var(--chart-1)",
  },
  stable: {
    label: "Stable",
    color: "var(--chart-2)",
  },
  fiat: {
    label: "Fiat Wealth",
    color: "var(--chart-3)",
  },
  total: {
    label: "Total",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const displayKeys = ["total", "crypto", "stable", "fiat"] as const;

export function ChartProjectEfficiency() {
  const id = "pie-interactive";
  const [activeKey, setActiveKey] = React.useState<string>("total");

  const activeIndex = React.useMemo(
    () =>
      activeKey === "total"
        ? -1
        : balanceData.findIndex((item) => item.name === activeKey),
    [activeKey],
  );
  const selectOptions = React.useMemo(
    () => ["total", ...balanceData.map((item) => item.name)],
    [],
  );

  return (
    <Card data-chart={id}>
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader>
        <CardDescription>Balance overview</CardDescription>
        <CardTitle className="font-display text-xl">Balance chart</CardTitle>
        <CardAction>
          <Select value={activeKey} onValueChange={setActiveKey}>
            <SelectTrigger className="ml-auto" aria-label="Select a value">
              <SelectValue placeholder="Select balance" />
            </SelectTrigger>
            <SelectContent align="end">
              {selectOptions.map((key) => {
                const config = chartConfig[key as keyof typeof chartConfig];

                if (!config) {
                  return null;
                }

                const color = "color" in config ? config.color : undefined;

                return (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: color,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="m-auto aspect-square w-full max-w-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={balanceData}
              dataKey="value"
              nameKey="name"
              innerRadius={59}
              strokeWidth={5}
              activeIndex={activeIndex >= 0 ? activeIndex : undefined}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 5} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 20}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const displayValue =
                      activeKey === "total"
                        ? totalBalance
                        : (balanceData[activeIndex]?.value ?? totalBalance);
                    const displayLabel =
                      activeKey === "total"
                        ? "Total"
                        : (chartConfig[activeKey as keyof typeof chartConfig]
                            ?.label ?? "Balance");
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
                          className="font-bold"
                          style={{ fill: "#6C737F", fontSize: "1.4em" }}
                        >
                          $
                          {displayValue.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {displayLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex items-center justify-around pt-4 flex-wrap gap-2">
          {displayKeys.map((key) => {
            const isTotal = key === "total";
            const item = balanceData.find((d) => d.name === key);
            const config = chartConfig[key];
            const color =
              config && "color" in config ? config.color : undefined;
            const value = isTotal ? totalBalance : item?.value;
            return (
              <div className="flex flex-col" key={key}>
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="block size-2 rounded-full"
                    style={{
                      backgroundColor: color,
                    }}
                  />
                  <div className="text-xs tracking-wide uppercase">
                    {config?.label}
                  </div>
                </div>
                <div className="ms-3.5 text-md font-semibold">
                  $
                  {value?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
