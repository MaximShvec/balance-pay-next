"use client";

import { useId, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";

const mockRatesUsd: Record<string, number> = {
  BTC: 70000,
  ETH: 3500,
  SOL: 200,
  AVAX: 35,
  XRP: 0.52,
  DOGE: 0.08,
  USDT: 1,
  USDC: 1,
  USD: 1,
  EUR: 1.08,
};

type Period = "1h" | "24h" | "1m";

function getMockChartData(
  baseId: string,
  quoteId: string,
  period: Period,
): { label: string; rate: number; axisLabel: string }[] {
  const rateFrom = mockRatesUsd[baseId] ?? 1;
  const rateTo = mockRatesUsd[quoteId] ?? 1;
  const currentRate = rateFrom / rateTo;

  if (period === "1h") {
    const labels = Array.from(
      { length: 12 },
      (_, i) => `${String(i * 5).padStart(2, "0")}`,
    );
    return labels.map((label, i) => {
      const t = (i + 1) / labels.length;
      const wave1 = Math.sin(t * Math.PI * 3) * 0.06;
      const wave2 = Math.sin(t * Math.PI * 6 + 0.5) * 0.03;
      const variation = 0.94 + t * 0.12 + wave1 + wave2;
      return {
        label,
        rate: Math.round(currentRate * variation * 100000) / 100000,
        axisLabel: label,
      };
    });
  }

  if (period === "24h") {
    const labels = Array.from(
      { length: 24 },
      (_, i) => `${String(i).padStart(2, "0")}:00`,
    );
    return labels.map((label, i) => {
      const t = (i + 1) / labels.length;
      const wave1 = Math.sin(t * Math.PI * 2.5) * 0.08;
      const wave2 = Math.sin(t * Math.PI * 5 + 1) * 0.04;
      const trend = 0.92 + t * 0.16;
      const variation = trend + wave1 + wave2;
      const axisLabel = i % 4 === 0 ? label : "";
      return {
        label,
        rate: Math.round(currentRate * variation * 100000) / 100000,
        axisLabel,
      };
    });
  }

  const labels = Array.from({ length: 30 }, (_, i) => String(i + 1));
  return labels.map((label, i) => {
    const t = (i + 1) / labels.length;
    const wave1 = Math.sin(t * Math.PI * 2.5) * 0.08;
    const wave2 = Math.sin(t * Math.PI * 5 + 1) * 0.04;
    const trend = 0.92 + t * 0.16;
    const variation = trend + wave1 + wave2;
    const axisLabel = i === 0 || (i + 1) % 5 === 0 ? label : "";
    return {
      label,
      rate: Math.round(currentRate * variation * 100000) / 100000,
      axisLabel,
    };
  });
}

type ExchangeRateChartProps = {
  baseAssetId: string;
  quoteAssetId: string;
};

export function ExchangeRateChart({
  baseAssetId,
  quoteAssetId,
}: ExchangeRateChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const [period, setPeriod] = useState<Period>("24h");
  const chartData = getMockChartData(baseAssetId, quoteAssetId, period);
  const rateFrom = mockRatesUsd[baseAssetId] ?? 1;
  const rateTo = mockRatesUsd[quoteAssetId] ?? 1;
  const currentRate = rateFrom / rateTo;
  const lastRate = chartData[chartData.length - 1]?.rate ?? currentRate;
  const changePercent =
    ((lastRate - chartData[0]?.rate) / (chartData[0]?.rate || 1)) * 100;

  const chartConfig = {
    rate: {
      label: `${baseAssetId} / ${quoteAssetId}`,
      color: "#009835",
    },
  } satisfies ChartConfig;

  const gridCols = chartData.length;

  return (
    <Card className="h-full flex flex-col min-h-0">
      <CardHeader className="shrink-0">
        <CardDescription className="relative">
          {baseAssetId} / {quoteAssetId}
        </CardDescription>
        <CardAction className="flex items-center justify-end">
          <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <TabsList className="h-8">
              <TabsTrigger
                value="1h"
                className="text-xs px-2 outline-none focus-visible:outline-none focus-visible:ring-0"
              >
                1h
              </TabsTrigger>
              <TabsTrigger
                value="24h"
                className="text-xs px-2 outline-none focus-visible:outline-none focus-visible:ring-0"
              >
                24h
              </TabsTrigger>
              <TabsTrigger
                value="1m"
                className="text-xs px-2 outline-none focus-visible:outline-none focus-visible:ring-0"
              >
                1m
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
        <div className="flex items-center gap-2">
          <div className="font-display text-2xl">
            {currentRate >= 1
              ? currentRate.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })
              : currentRate.toFixed(4)}
          </div>
          <Badge
            variant={changePercent >= 0 ? "positive" : "negative"}
            className="border-0"
          >
            {changePercent >= 0 ? "+" : ""}
            {changePercent.toFixed(1)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex-1 min-h-0 flex flex-col justify-end">
        <div className="w-full">
          <ChartContainer
            className="mt-0 !aspect-21/9 w-full md:mt-6"
            config={chartConfig}
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id={`${gradientId}-rate`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-rate)"
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="70%"
                    stopColor="var(--color-rate)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                scale="point"
                padding={{ left: 0, right: 0 }}
                hide
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="var(--color-rate)"
                fill={`url(#${gradientId}-rate)`}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
          <div
            className="text-muted-foreground relative mt-2 h-5 w-full text-xs"
            aria-hidden
          >
            {chartData.map(({ label, axisLabel }, i) => {
              if (!axisLabel) return null;
              const isFirst = i === 0;
              const isLast = i === chartData.length - 1;
              return (
                <span
                  key={`${label}-${i}`}
                  className={`absolute whitespace-nowrap ${
                    isFirst
                      ? "translate-x-0"
                      : isLast
                      ? "-translate-x-full"
                      : "-translate-x-1/2"
                  }`}
                  style={{
                    left: `${(i / Math.max(gridCols - 1, 1)) * 100}%`,
                  }}
                  title={label}
                >
                  {axisLabel}
                </span>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
