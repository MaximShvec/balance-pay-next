"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Download } from "lucide-react";

export function ReturnRateCard() {
  const [dateRange, setDateRange] = useState("this-week");
  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
  };
  const chartConfig = {
    desktop: {
      label: "Crypto",
      color: "#009835",
    },
    mobile: {
      label: "Fiat",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 473, mobile: 190 },
    { month: "May", desktop: 409, mobile: 130 },
    { month: "June", desktop: 514, mobile: 140 },
    { month: "July", desktop: 237, mobile: 120 },
    { month: "August", desktop: 473, mobile: 190 },
    { month: "September", desktop: 409, mobile: 130 },
    { month: "October", desktop: 514, mobile: 300 },
    { month: "November", desktop: 390, mobile: 240 },
    { month: "December", desktop: 700, mobile: 460 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardDescription className="relative">
          History of funds turnover
        </CardDescription>
        <CardAction className="flex flex-wrap gap-2 justify-end">
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger>
              <CalendarIcon />
              <div className="hidden lg:flex">
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download />
          </Button>
          <TabsList className="ml-auto">
            <TabsTrigger value="usd">USD</TabsTrigger>
            <TabsTrigger value="eur">EUR</TabsTrigger>
          </TabsList>
        </CardAction>
        <div className="flex items-center gap-2">
          <div className="font-display text-2xl">$42,379</div>
          <Badge className="text-green-600" variant="outline">
            +2.5%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="w-full">
          <ChartContainer
            className="mt-0 !aspect-21/9 w-full md:mt-6"
            config={chartConfig}
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                scale="point"
                padding={{ left: 0, right: 0 }}
                hide
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                stroke="var(--color-mobile)"
                style={
                  {
                    opacity: 0.35,
                  } as React.CSSProperties
                }
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <div
            className="text-muted-foreground mt-2 grid grid-cols-12 gap-0 text-center text-xs"
            aria-hidden
          >
            {chartData.map(({ month }) => (
              <span key={month} className="truncate px-0.5" title={month}>
                {month}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
