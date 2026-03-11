"use client";

import { Aperture, PlusCircleIcon } from "lucide-react";

import {
  DeleteIcon,
  DotsIcon,
  EditIcon,
  EyeOpenedIcon,
  SendIcon,
} from "@/components/icons";
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

export function LinkedMethods() {
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
                  <SendIcon className="mr-2 size-4" />
                  Send
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <EditIcon className="mr-2 size-4" />
                  Edit wallet
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <EyeOpenedIcon className="mr-2 size-4" />
                  Show wallet
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <DeleteIcon className="mr-2 size-4 text-destructive" />
                  Remove wallet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
