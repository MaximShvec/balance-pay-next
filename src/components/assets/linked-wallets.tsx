"use client";

import * as React from "react";
import { PlusCircleIcon } from "lucide-react";

import {
  BtcIcon,
  DeleteIcon,
  DollarIcon,
  DotsIcon,
  EthIcon,
  EuroIcon,
  EditIcon,
  EyeOpenedIcon,
  SendIcon,
  UsdcIcon,
  UsdtIcon,
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

const currencyIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  USD: DollarIcon,
  EUR: EuroIcon,
  USDT: UsdtIcon,
  USDC: UsdcIcon,
  ETH: EthIcon,
  BTC: BtcIcon,
};

type LinkedMethod = {
  id: string;
  address: string;
  network: string;
  currency: string;
};

const linkedMethods: LinkedMethod[] = [
  {
    id: "1",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    network: "Ethereum",
    currency: "ETH",
  },
  {
    id: "2",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    network: "Bitcoin",
    currency: "BTC",
  },
  {
    id: "3",
    address: "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
    network: "Ethereum",
    currency: "USDT",
  },
];

function getCurrencyIcon(currency: string) {
  return currencyIcons[currency] ?? DollarIcon;
}

function formatAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 4)}...${address.slice(-6)}`;
}

export function LinkedWallets() {
  return (
    <Card className="h-full">
      <CardHeader className="items-center">
        <CardTitle>Linked wallets</CardTitle>
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-muted shadow-sm">
                {(() => {
                  const Icon = getCurrencyIcon(method.currency);
                  return <Icon className="h-6 w-6" />;
                })()}
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-medium leading-none" title={method.address}>
                  {formatAddress(method.address)}
                </p>
                <p className="text-muted-foreground text-xs">
                  {method.network} • {method.currency}
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
