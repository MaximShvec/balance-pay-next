import type { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import type { Asset } from "@/types";
import {
  AssetIcon,
  BuyIcon,
  DotsIcon,
  MoveIcon,
  RecieveIcon,
  SendIcon,
} from "@/components/icons";
import { getCurrencyType } from "./data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Asset>[] = [
  {
    id: "asset",
    accessorFn: (row) => row.asset.name,
    header: ({ column }) => (
      <Button
        className="!pl-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Asset
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const { name, image, network } = row.original.asset;
      return (
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="size-10 shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-medium text-lg">{name}</span>
            {network && (
              <span className="text-muted-foreground text-md">{network}</span>
            )}
          </div>
        </div>
      );
    },
    filterFn: (row, _columnId, filterValue) => {
      const search = (filterValue as string).toLowerCase();
      const name = row.original.asset.name.toLowerCase();
      const network = row.original.asset.network?.toLowerCase() ?? "";
      return name.includes(search) || network.includes(search);
    },
  },
  {
    id: "balance",
    accessorFn: (row) => row.balanceUsd,
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Balance
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const { balance, balanceUsd, asset } = row.original;
      const formattedBalance =
        balance % 1 === 0 ? balance.toString() : balance.toFixed(4);
      const formattedUsd = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(balanceUsd);
      return (
        <div className="flex flex-col">
          <span className="font-medium text-lg">{formattedUsd}</span>
          <span className="text-muted-foreground text-md">
            {formattedBalance} {asset.ticker}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "priceUsd",
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const { priceUsd, asset } = row.original;
      const formattedUsd =
        priceUsd >= 1
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(priceUsd)
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 4,
            }).format(priceUsd);
      return (
        <div className="flex flex-col">
          <span className="font-medium text-lg">1 {asset.ticker}</span>
          <span className="text-muted-foreground text-md">{formattedUsd}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "performance24h",
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Performance (24h)
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.original.performance24h;
      const isPositive = value >= 0;
      const formatted = `${Math.abs(value).toFixed(1)}%`;
      return (
        <Badge
          variant={isPositive ? "positive" : "negative"}
          className="p-2 text-md"
        >
          {isPositive ? (
            <ArrowUp className="size-4" />
          ) : (
            <ArrowDown className="size-4" />
          )}
          {formatted}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const currencyType = getCurrencyType(row.original.asset.ticker);
      const isFiat = currencyType === "fiat";

      return (
        <div className="text-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 cursor-pointer transition-all duration-200 focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
              >
                <span className="sr-only">Open menu</span>
                <DotsIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isFiat ? (
                <>
                  <DropdownMenuItem>
                    <RecieveIcon className="mr-2 size-4" />
                    Deposit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SendIcon className="mr-2 size-4" />
                    Withdraw
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BuyIcon className="mr-2 size-4" />
                    Buy & Sell
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <AssetIcon className="mr-2 size-4" />
                    Asset Page
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SendIcon className="mr-2 size-4" />
                    Send
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RecieveIcon className="mr-2 size-4" />
                    Receive
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MoveIcon className="mr-2 size-4" />
                    Move
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BuyIcon className="mr-2 size-4" />
                    Buy & Sell
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
