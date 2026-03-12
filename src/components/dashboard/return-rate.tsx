"use client";

import { useEffect, useId, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronDown, Download } from "lucide-react";

type SeriesKey = "total" | "crypto" | "stable" | "fiatWealth";

const seriesConfig: Record<SeriesKey, { label: string; color: string }> = {
  total: { label: "Total", color: "#D5B8F8" },
  crypto: { label: "Crypto", color: "#FFD780" },
  stable: { label: "Stable", color: "#9CD1FB" },
  fiatWealth: { label: "Fiat Wealth", color: "#B3E5C9" },
};

const chartData = [
  { month: "Jan", total: 340, crypto: 186, stable: 80, fiatWealth: 74 },
  { month: "Feb", total: 600, crypto: 305, stable: 200, fiatWealth: 95 },
  { month: "Mar", total: 450, crypto: 237, stable: 120, fiatWealth: 93 },
  { month: "Apr", total: 760, crypto: 473, stable: 190, fiatWealth: 97 },
  { month: "May", total: 640, crypto: 409, stable: 130, fiatWealth: 101 },
  { month: "Jun", total: 750, crypto: 514, stable: 140, fiatWealth: 96 },
  { month: "Jul", total: 470, crypto: 237, stable: 120, fiatWealth: 113 },
  { month: "Aug", total: 780, crypto: 473, stable: 190, fiatWealth: 117 },
  { month: "Sep", total: 660, crypto: 409, stable: 130, fiatWealth: 121 },
  { month: "Oct", total: 930, crypto: 514, stable: 300, fiatWealth: 116 },
  { month: "Nov", total: 740, crypto: 390, stable: 240, fiatWealth: 110 },
  { month: "Dec", total: 1260, crypto: 700, stable: 460, fiatWealth: 100 },
];

export function ReturnRateCard() {
  const gradientId = useId().replace(/:/g, "");
  const [dateRange, setDateRange] = useState("this-week");
  const [selected, setSelected] = useState<Set<SeriesKey>>(
    new Set(["crypto", "stable", "fiatWealth"]),
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    if (mq.matches !== isMobile) handler({ matches: mq.matches } as MediaQueryListEvent);
    return () => mq.removeEventListener("change", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chartConfig = Object.fromEntries(
    Object.entries(seriesConfig).map(([key, val]) => [key, { label: val.label, color: val.color }]),
  ) satisfies ChartConfig;

  const handleToggle = (key: SeriesKey, checked: boolean) => {
    if (key === "total") {
      setSelected(checked ? new Set(["total"]) : new Set());
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete("total");
        if (checked) next.add(key);
        else next.delete(key);
        return next;
      });
    }
  };

  const seriesKeys = Object.keys(seriesConfig) as SeriesKey[];

  return (
    <Card>
      <CardHeader>
        <CardDescription className="relative">
          History of funds turnover
        </CardDescription>
        <CardAction className="flex flex-wrap gap-2 justify-end">
          <Select value={dateRange} onValueChange={setDateRange}>
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="hidden md:flex gap-1.5">
                <span className="flex items-center gap-1">
                  {selected.size === 0
                    ? "Select series"
                    : [...selected].map((key) => (
                        <span
                          key={key}
                          className="size-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: seriesConfig[key].color }}
                        />
                      ))}
                </span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-44 p-2">
              <div className="space-y-1">
                {seriesKeys.map((key) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                  >
                    <Checkbox
                      checked={selected.has(key)}
                      onCheckedChange={(v) => handleToggle(key, !!v)}
                    />
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: seriesConfig[key].color }}
                    />
                    {seriesConfig[key].label}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
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
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12, bottom: 0 }}
            >
              <defs>
                {seriesKeys.map((key) => (
                  <linearGradient
                    key={key}
                    id={`${gradientId}-${key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={seriesConfig[key].color}
                      stopOpacity={0.6}
                    />
                    <stop
                      offset="70%"
                      stopColor={seriesConfig[key].color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
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
              {isMobile
                ? (
                  <Area
                    key="total"
                    type="monotone"
                    dataKey="total"
                    stroke={seriesConfig["total"].color}
                    fill={`url(#${gradientId}-total)`}
                    strokeWidth={2}
                  />
                )
                : seriesKeys.map((key) =>
                    selected.has(key) ? (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={seriesConfig[key].color}
                        fill={`url(#${gradientId}-${key})`}
                        strokeWidth={2}
                      />
                    ) : null,
                  )}
            </AreaChart>
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
