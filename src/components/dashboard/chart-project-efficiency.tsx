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
  { name: "crypto", value: 25582.34, fill: "#FFD780" },
  { name: "stable", value: 3413.25, fill: "#9CD1FB" },
  { name: "fiat", value: 1234.56, fill: "#B3E5C9" },
];

const totalBalance = 39231.9; // from welcome.tsx

const chartConfig = {
  value: {
    label: "Balance",
  },
  crypto: {
    label: "Crypto",
    color: "#FFD780",
  },
  stable: {
    label: "Stable",
    color: "#9CD1FB",
  },
  fiat: {
    label: "Fiat Wealth",
    color: "#B3E5C9",
  },
  total: {
    label: "Total",
    color: "#D5B8F8",
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
              paddingAngle={3}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-8">
          {displayKeys.map((key) => {
            const isTotal = key === "total";
            const item = balanceData.find((d) => d.name === key);
            const config = chartConfig[key];
            const color =
              config && "color" in config ? config.color : undefined;
            const value = isTotal ? totalBalance : item?.value;
            return (
              <div
                key={key}
                className="bg-[var(--base-200)] flex items-center gap-2 rounded-full p-4"
              >
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: color,
                  }}
                />
                <span className="text-xs tracking-wide uppercase flex-1 min-w-0 truncate">
                  {config?.label}
                </span>
                <span className="text-xs font-semibold shrink-0">
                  $
                  {value?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
