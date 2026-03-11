"use client";

import {
  PlusCircleIcon,
  CreditCard,
  Lock,
  Trash2,
  Aperture,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsIcon } from "@/components/icons";

type LinkedMethod = {
  id: string;
  name: string;
  bank: string;
  last4: string;
};

const linkedMethods: LinkedMethod[] = [
  {
    id: "1",
    name: "EUR bank account",
    bank: "Banking Circle",
    last4: "19",
  },
  {
    id: "2",
    name: "USD bank account",
    bank: "Banking Circle",
    last4: "19",
  },
];

export function RecentTasks() {
  return (
    <Card className="h-full">
      <CardHeader className="items-center">
        <CardTitle>Linked methods</CardTitle>
        <CardAction>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <PlusCircleIcon className="h-4 w-4" />
            <span className="sr-only">Add Method</span>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        {linkedMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between rounded-md bg-transparent p-3 transition-colors border border-border"
          >
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <Aperture className="h-6 w-6 text-black" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {method.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {method.bank} •••• {method.last4}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary/90 h-8 w-8 focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-label="Открыть меню"
                >
                  <DotsIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[280px]">
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Withdraw to this account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Lock className="mr-2 h-4 w-4" />
                  Show details
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove method
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
