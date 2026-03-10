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
  DollarIcon,
  EuroIcon,
  UsdtIcon,
  EthIcon,
  DotsIcon,
  EditIcon,
  DownloadIcon,
  ChartSquareOutlineIcon,
} from "@/components/icons";

const data = [
  {
    name: "Total Dollar",
    value: "$435,578",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarIcon,
    menuItems: [
      { label: "View details", icon: ChartSquareOutlineIcon },
      { label: "Edit", icon: EditIcon },
      { label: "Export", icon: DownloadIcon },
    ],
  },
  {
    name: "Total Euro",
    value: "€102,890",
    change: "-0.8%",
    changeType: "negative",
    icon: EuroIcon,
    menuItems: [
      { label: "View details", icon: ChartSquareOutlineIcon },
      { label: "Edit", icon: EditIcon },
      { label: "Export", icon: DownloadIcon },
    ],
  },
  {
    name: "Total USDT",
    value: "1,890",
    change: "+10.4%",
    changeType: "positive",
    icon: UsdtIcon,
    menuItems: [
      { label: "View details", icon: ChartSquareOutlineIcon },
      { label: "Edit", icon: EditIcon },
      { label: "Export", icon: DownloadIcon },
    ],
  },
  {
    name: "Total ETH",
    value: "12.45",
    change: "+5.2%",
    changeType: "positive",
    icon: EthIcon,
    menuItems: [
      { label: "View details", icon: ChartSquareOutlineIcon },
      { label: "Edit", icon: EditIcon },
      { label: "Export", icon: DownloadIcon },
    ],
  },
];

export function FundsStatCards() {
  return (
    <>
      {data.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.name} className="py-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
                  <p className="text-2xl xl:text-3xl font-semibold text-foreground">{item.value}</p>
                  <div className="flex items-center text-sm pt-1">
                    <span
                      className={cn(
                        "font-medium",
                        item.changeType === "positive"
                          ? "text-emerald-600 dark:text-emerald-500"
                          : "text-red-600 dark:text-red-500"
                      )}
                    >
                      {item.change}
                    </span>
                    <span className="text-muted-foreground ml-1">from last month</span>
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-border flex justify-end px-4! py-2!">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/90 h-9 w-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-label="Открыть меню"
                  >
                    <DotsIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {item.menuItems?.map(({ label, icon: MenuIcon }) => (
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
      })}
    </>
  );
}
