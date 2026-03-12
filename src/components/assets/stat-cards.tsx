"use client";

import { useId } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AssetIcon,
  BtcIcon,
  BuyIcon,
  DotsIcon,
  MoveIcon,
  RecieveIcon,
  SendIcon,
  UnlockIcon,
  UsdtIcon,
} from "@/components/icons";

const menuItems = [
  // { label: "Asset Page", icon: AssetIcon },
  { label: "Send", icon: SendIcon },
  { label: "Receive", icon: RecieveIcon },
  { label: "Move", icon: MoveIcon },
  // { label: "Buy & Sell", icon: BuyIcon },
];

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 473, mobile: 190 },
  { month: "May", desktop: 409, mobile: 130 },
  { month: "Jun", desktop: 514, mobile: 140 },
  { month: "Jul", desktop: 237, mobile: 120 },
  { month: "Aug", desktop: 473, mobile: 190 },
  { month: "Sep", desktop: 409, mobile: 130 },
  { month: "Oct", desktop: 514, mobile: 300 },
  { month: "Nov", desktop: 390, mobile: 240 },
  { month: "Dec", desktop: 700, mobile: 460 },
];

const totalCard = {
  name: "Total",
  value: "$31,781.59",
  change: "+8.7%",
  changeType: "positive" as const,
};

const detailCards = [
  {
    name: "Total Crypto",
    value: "$25,582.34",
    change: "+9.3%",
    changeType: "positive" as const,
    icon: BtcIcon,
    disabled: false,
  },
  {
    name: "Total Stable",
    value: "$3,413.25",
    change: "+0.1%",
    changeType: "positive" as const,
    icon: UsdtIcon,
    disabled: false,
  },
];

function TotalStatCardWithChart({
  name,
  value,
  change,
  changeType,
  className,
}: {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  className?: string;
}) {
  const gradientId = useId().replace(/:/g, "");
  const chartConfig = {
    desktop: { label: "Crypto", color: "#FFD780" },
    mobile: { label: "Stable", color: "#B3E5C9" },
  } satisfies ChartConfig;

  return (
    <Card className={cn("py-0", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {name}
              </p>
              <p className="text-2xl xl:text-3xl font-semibold text-foreground">
                {value}
              </p>
              <div className="flex items-center text-sm pt-1">
                <span
                  className={cn(
                    "font-medium",
                    changeType === "positive"
                      ? "text-emerald-600 dark:text-emerald-500"
                      : "text-red-600 dark:text-red-500",
                  )}
                >
                  {change}
                </span>
                <span className="text-muted-foreground ml-1">
                  from last month
                </span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <ChartContainer
              className="mt-0 !aspect-[5/1] w-full max-h-[80px]"
              config={chartConfig}
            >
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 8, right: 8, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`${gradientId}-desktop`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.6}
                    />
                    <stop
                      offset="70%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id={`${gradientId}-mobile`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.6}
                    />
                    <stop
                      offset="70%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0}
                    />
                  </linearGradient>
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Area
                  type="monotone"
                  dataKey="desktop"
                  stroke="var(--color-desktop)"
                  fill={`url(#${gradientId}-desktop)`}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="mobile"
                  stroke="var(--color-mobile)"
                  fill={`url(#${gradientId}-mobile)`}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
            <div
              className="text-muted-foreground mt-1 grid grid-cols-12 gap-0 text-center text-[10px]"
              aria-hidden
            >
              {chartData.map(({ month }) => (
                <span key={month} className="truncate px-0.5" title={month}>
                  {month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({
  name,
  value,
  change,
  changeType,
  icon: Icon,
  className,
  disabled,
}: {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon?: React.ElementType;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Card className={cn("py-0", disabled && "opacity-60", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{name}</p>
            <p className="text-2xl xl:text-3xl font-semibold text-foreground">
              {value}
            </p>
            <div className="flex items-center text-sm pt-1">
              <span
                className={cn(
                  "font-medium",
                  changeType === "positive"
                    ? "text-emerald-600 dark:text-emerald-500"
                    : "text-red-600 dark:text-red-500",
                )}
              >
                {change}
              </span>
              <span className="text-muted-foreground ml-1">
                from last month
              </span>
            </div>
          </div>
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-border flex justify-end px-4! py-2!">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/90 h-9 w-9 focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label="Open menu"
            >
              <DotsIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {disabled ? (
              <DropdownMenuItem>
                <UnlockIcon className="mr-2 size-4" />
                Activate IBAN
              </DropdownMenuItem>
            ) : (
              menuItems.map(({ label, icon: MenuIcon }) => (
                <DropdownMenuItem key={label}>
                  <MenuIcon className="mr-2 size-4" />
                  {label}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

export function AssetsStatCards() {
  return (
    <>
      <TotalStatCardWithChart
        className="md:col-span-2 xl:col-span-2"
        name={totalCard.name}
        value={totalCard.value}
        change={totalCard.change}
        changeType={totalCard.changeType}
      />
      {detailCards.map((item) => (
        <StatCard
          key={item.name}
          name={item.name}
          value={item.value}
          change={item.change}
          changeType={item.changeType}
          icon={item.icon}
          disabled={item.disabled}
        />
      ))}
    </>
  );
}
