"use client";

import { cn } from "@/lib/utils";

import { DotsIcon, MoveIcon, RecieveIcon, SendIcon } from "@/components/icons";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const data = [
  {
    name: "Crypto Balance",
    value: "$25.582,34",
    change: "+6.1%",
    changeType: "positive",
    href: "#",
    menuItems: [
      { label: "Send", icon: SendIcon },
      { label: "Receive", icon: RecieveIcon },
    ],
  },
  {
    name: "Stable Balance",
    value: "3.413,25",
    change: "+19.2%",
    changeType: "positive",
    href: "#",
    menuItems: [
      { label: "Deposit", icon: SendIcon },
      { label: "Withdraw", icon: RecieveIcon },
      { label: "Move to Cards", icon: MoveIcon },
    ],
  },
  {
    name: "Fiat Wealth",
    value: "1.234,56",
    change: "-1.2%",
    changeType: "negative",
    href: "#",
    menuItems: [
      { label: "Deposit", icon: SendIcon },
      { label: "Withdraw", icon: RecieveIcon },
    ],
  },
];

export default function StatCards() {
  return (
    <div className="flex w-full justify-center h-full">
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {data.map((item) => (
          <Card key={item.name} className="py-0">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start justify-between space-x-2">
                <span className="text-muted-foreground truncate text-sm">
                  {item.name}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    item.changeType === "positive"
                      ? "text-emerald-700 dark:text-emerald-500"
                      : "text-red-700 dark:text-red-500",
                  )}
                >
                  {item.change}
                </span>
              </div>
              <dd className="text-foreground mt-1 text-2xl xl:text-3xl font-semibold truncate">
                {item.value}
              </dd>
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
                  {item.menuItems?.map(({ label, icon: Icon }) => (
                    <DropdownMenuItem key={label}>
                      <Icon className="mr-2 size-4" />
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
