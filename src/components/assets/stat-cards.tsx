"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BtcIcon,
  UsdtIcon,
  DotsIcon,
  EditIcon,
  DownloadIcon,
  ChartSquareOutlineIcon,
} from "@/components/icons";

const menuItems = [
  { label: "View details", icon: ChartSquareOutlineIcon },
  { label: "Edit", icon: EditIcon },
  { label: "Export", icon: DownloadIcon },
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
  },
  {
    name: "Total Stable",
    value: "$3,413.25",
    change: "+0.1%",
    changeType: "positive" as const,
    icon: UsdtIcon,
  },
];

function StatCard({
  name,
  value,
  change,
  changeType,
  icon: Icon,
  className,
}: {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon?: React.ElementType;
  className?: string;
}) {
  return (
    <Card className={cn("py-0", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{name}</p>
            <p className="text-2xl xl:text-3xl font-semibold text-foreground">{value}</p>
            <div className="flex items-center text-sm pt-1">
              <span
                className={cn(
                  "font-medium",
                  changeType === "positive"
                    ? "text-emerald-600 dark:text-emerald-500"
                    : "text-red-600 dark:text-red-500"
                )}
              >
                {change}
              </span>
              <span className="text-muted-foreground ml-1">from last month</span>
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
            {menuItems.map(({ label, icon: MenuIcon }) => (
              <DropdownMenuItem key={label}>
                <MenuIcon className="mr-2 size-4" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

export function AssetsStatCards() {
  return (
    <>
      <StatCard
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
        />
      ))}
    </>
  );
}
