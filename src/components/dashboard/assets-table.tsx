"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
} from "lucide-react";

import { DotsIcon, FilterIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExportButton } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "motion/react";

export type Order = {
  id: number;
  asset: {
    name: string;
    ticker: string;
    image: string;
    network?: string;
  };
  balance: number;
  balanceUsd: number;
  priceUsd: number;
  performance24h: number;
  product: {
    name: string;
  };
  amount: number;
};

function escapeCsvValue(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function exportOrdersToCsv(ordersToExport: Order[]): void {
  const headers = [
    "Asset",
    "Network",
    "Balance (USD)",
    "Balance",
    "Price (USD)",
    "Performance (24h)",
  ];
  const rows = ordersToExport.map((order) => {
    const assetName = order.asset.network
      ? `${order.asset.name} (${order.asset.network})`
      : order.asset.name;
    const balance =
      order.balance % 1 === 0
        ? order.balance.toString()
        : order.balance.toFixed(4);
    const balanceStr = `${balance} ${order.asset.ticker}`;
    const performance = `${order.performance24h >= 0 ? "+" : ""}${order.performance24h.toFixed(1)}%`;
    return [
      escapeCsvValue(assetName),
      escapeCsvValue(order.asset.network ?? ""),
      order.balanceUsd.toString(),
      escapeCsvValue(balanceStr),
      order.priceUsd.toString(),
      performance,
    ];
  });
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `assets-table-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

const orders: Order[] = [
  {
    id: 1,
    asset: {
      name: "US Dollar",
      ticker: "USD",
      image: "/images/currencies/USD.svg",
      network: "SWIFT",
    },
    balance: 1500,
    balanceUsd: 1500,
    priceUsd: 1,
    performance24h: 0,
    product: { name: "Tire Doodad" },
    amount: 300,
  },
  {
    id: 2,
    asset: {
      name: "Euro",
      ticker: "EUR",
      image: "/images/currencies/EUR.svg",
      network: "SEPA",
    },
    balance: 1200,
    balanceUsd: 1300,
    priceUsd: 1.08,
    performance24h: -1.9,
    product: { name: "Engine Kit" },
    amount: 450,
  },
  {
    id: 3,
    asset: {
      name: "Bitcoin",
      ticker: "BTC",
      image: "/images/currencies/BTC.svg",
      network: "Bitcoin",
    },
    balance: 0.05,
    balanceUsd: 3500,
    priceUsd: 70000,
    performance24h: 9.3,
    product: { name: "Brake Pad" },
    amount: 200,
  },
  {
    id: 4,
    asset: {
      name: "Ethereum",
      ticker: "ETH",
      image: "/images/currencies/ETH.svg",
      network: "ERC-20",
    },
    balance: 1.2,
    balanceUsd: 4200,
    priceUsd: 3500,
    performance24h: -2.4,
    product: { name: "Fuel Pump" },
    amount: 500,
  },
  {
    id: 5,
    asset: {
      name: "USD Tether",
      ticker: "USDT",
      image: "/images/currencies/USDT_TRON.svg",
      network: "TRC-20",
    },
    balance: 0,
    balanceUsd: 500,
    priceUsd: 1,
    performance24h: 0.1,
    product: { name: "Steering Wheel" },
    amount: 350,
  },
  {
    id: 6,
    asset: {
      name: "USD Coin",
      ticker: "USDC",
      image: "/images/currencies/USDC.svg",
      network: "ERC-20",
    },
    balance: 22,
    balanceUsd: 22,
    priceUsd: 1,
    performance24h: 0,
    product: { name: "Air Filter" },
    amount: 180,
  },
  {
    id: 7,
    asset: {
      name: "Polygon",
      ticker: "POL",
      image: "/images/currencies/POL.svg",
      network: "Polygon",
    },
    balance: 150,
    balanceUsd: 85,
    priceUsd: 0.57,
    performance24h: 5.2,
    product: { name: "Oil Filter" },
    amount: 220,
  },
  {
    id: 8,
    asset: {
      name: "Tron",
      ticker: "TRX",
      image: "/images/currencies/TRX.svg",
      network: "TRC-20",
    },
    balance: 1500,
    balanceUsd: 290,
    priceUsd: 0.19,
    performance24h: -3.1,
    product: { name: "Radiator Cap" },
    amount: 290,
  },
  {
    id: 9,
    asset: {
      name: "Solana",
      ticker: "SOL",
      image: "/images/currencies/SOL.svg",
      network: "Solana",
    },
    balance: 12,
    balanceUsd: 2400,
    priceUsd: 200,
    performance24h: 12.8,
    product: { name: "Spark Plug" },
    amount: 150,
  },
  {
    id: 10,
    asset: {
      name: "USD Coin",
      ticker: "USDC",
      image: "/images/currencies/USDC_SOL.svg",
      network: "SOLANA",
    },
    balance: 100,
    balanceUsd: 100,
    priceUsd: 1,
    performance24h: 0,
    product: { name: "Transmission Fluid" },
    amount: 120,
  },
  {
    id: 11,
    asset: {
      name: "USD Tether",
      ticker: "USDT",
      image: "/images/currencies/USDT_SOL.svg",
      network: "SOLANA",
    },
    balance: 250,
    balanceUsd: 250,
    priceUsd: 1,
    performance24h: -0.5,
    product: { name: "Transmission Fluid" },
    amount: 120,
  },
  {
    id: 12,
    asset: {
      name: "Binance Coin",
      ticker: "BNB",
      image: "/images/currencies/BNB.svg",
      network: "BEP-20",
    },
    balance: 2.5,
    balanceUsd: 1500,
    priceUsd: 600,
    performance24h: 1.2,
    product: { name: "Transmission Fluid" },
    amount: 120,
  },
];

const columns: ColumnDef<Order>[] = [
  {
    id: "asset",
    accessorFn: (row) => row.asset.name,
    header: ({ column }) => (
      <Button
        className="-ml-3"
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
            width={32}
            height={32}
            className="size-8 shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            {network && (
              <span className="text-muted-foreground text-xs">{network}</span>
            )}
          </div>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
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
          <span className="font-medium">{formattedUsd}</span>
          <span className="text-muted-foreground text-xs">
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
          <span className="font-medium">1 {asset.ticker}</span>
          <span className="text-muted-foreground text-xs">{formattedUsd}</span>
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
        <Badge variant={isPositive ? "positive" : "negative"}>
          {isPositive ? (
            <ArrowUp className="size-3" />
          ) : (
            <ArrowDown className="size-3" />
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
      const order = row.original;
      return (
        <div className="text-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 cursor-pointer transition-all duration-200 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <span className="sr-only">Open menu</span>
                <DotsIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Copy order ID</DropdownMenuItem>
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const FIAT_TICKERS = ["USD", "EUR"];
const STABLE_TICKERS = ["USDT", "USDC"];

function getCurrencyType(ticker: string): "fiat" | "stable" | "crypto" {
  if (FIAT_TICKERS.includes(ticker)) return "fiat";
  if (STABLE_TICKERS.includes(ticker)) return "stable";
  return "crypto";
}

export function AssetsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 12,
    });

  const [currencyTypeFilter, setCurrencyTypeFilter] = React.useState<
    "all" | "crypto" | "stable" | "fiat"
  >("all");
  const [hideZeroBalance, setHideZeroBalance] = React.useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = React.useState<
    Set<string>
  >(new Set());
  const [selectedNetworks, setSelectedNetworks] = React.useState<Set<string>>(
    new Set(),
  );
  const [showFilters, setShowFilters] = React.useState(true);

  const uniqueCurrencies = React.useMemo(() => {
    const seen = new Set<string>();
    return orders
      .map((o) => {
        const key = `${o.asset.ticker}-${o.asset.network ?? "native"}`;
        if (seen.has(key)) return null;
        seen.add(key);
        return {
          key,
          label: o.asset.network
            ? `${o.asset.name} (${o.asset.network})`
            : o.asset.name,
        };
      })
      .filter((c): c is { key: string; label: string } => c !== null);
  }, []);

  const uniqueNetworks = React.useMemo(() => {
    const seen = new Set<string>();
    return orders
      .map((o) => o.asset.network ?? "Native")
      .filter((n) => {
        if (seen.has(n)) return false;
        seen.add(n);
        return true;
      })
      .sort((a, b) => (a === "Native" ? -1 : a.localeCompare(b)));
  }, []);

  const filteredData = React.useMemo(() => {
    return orders.filter((order) => {
      const ticker = order.asset.ticker;
      const type = getCurrencyType(ticker);

      if (currencyTypeFilter !== "all") {
        if (currencyTypeFilter === "fiat" && type !== "fiat") return false;
        if (currencyTypeFilter === "stable" && type !== "stable") return false;
        if (currencyTypeFilter === "crypto" && type !== "crypto") return false;
      }

      if (hideZeroBalance && order.balance === 0) return false;

      if (selectedCurrencies.size > 0) {
        const key = `${order.asset.ticker}-${order.asset.network ?? "native"}`;
        if (!selectedCurrencies.has(key)) return false;
      }

      if (selectedNetworks.size > 0) {
        const network = order.asset.network ?? "Native";
        if (!selectedNetworks.has(network)) return false;
      }

      return true;
    });
  }, [
    currencyTypeFilter,
    hideZeroBalance,
    selectedCurrencies,
    selectedNetworks,
  ]);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    pageCount: Math.ceil(filteredData.length / pageSize),
  });

  return (
    <Card className="lg:col-span-12 border-none py-0 gap-4">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-0">
        <CardTitle>Assets</CardTitle>
        <CardAction className="relative flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "rounded-full",
              showFilters &&
                "bg-accent text-accent-foreground dark:bg-input/50",
            )}
            onClick={() => setShowFilters((v) => !v)}
            aria-label={showFilters ? "Hide filters" : "Show filters"}
          >
            <FilterIcon className="size-4" />
          </Button>
          <ExportButton
            className="shrink-0"
            onExportCsv={() => {
              const rows = table.getFilteredRowModel().rows;
              exportOrdersToCsv(rows.map((r) => r.original));
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="min-w-0 space-y-4 px-0">
        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              key="filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="min-w-0 overflow-hidden p-1 -m-1 mb-2"
            >
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <Input
                  placeholder="Filter assets..."
                  value={
                    (table.getColumn("asset")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("asset")?.setFilterValue(event.target.value)
                  }
                  className="min-w-[120px] flex-1"
                />
                <div className="flex min-w-0 w-full shrink items-center gap-2 flex-wrap sm:w-auto sm:shrink-0 sm:flex-nowrap">
                  <div className="order-1 w-full basis-full sm:order-0 sm:w-auto sm:basis-auto shrink-0">
                    <div className="flex w-full items-center gap-2 rounded-md border px-3 py-2">
                      <Switch
                        id="hide-zero"
                        checked={hideZeroBalance}
                        onCheckedChange={setHideZeroBalance}
                      />
                      <label
                        htmlFor="hide-zero"
                        className="text-muted-foreground cursor-pointer text-sm"
                      >
                        Hide zero balance
                      </label>
                    </div>
                  </div>
                  <div className="order-3 w-full basis-full sm:order-0 sm:w-auto sm:basis-auto shrink-0">
                    <Select
                      value={currencyTypeFilter}
                      onValueChange={(v) =>
                        setCurrencyTypeFilter(
                          v as "all" | "crypto" | "stable" | "fiat",
                        )
                      }
                    >
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="crypto">Crypto</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="fiat">Fiat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="order-2 flex min-w-0 w-full basis-full gap-2 sm:order-0 sm:w-auto sm:basis-auto">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="min-w-0 flex-1 sm:flex-initial"
                        >
                          <PlusCircle className="size-4 shrink-0" />
                          Currencies
                          {selectedCurrencies.size > 0 && (
                            <Badge variant="secondary" className="ml-1">
                              {selectedCurrencies.size}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 p-0" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Search currencies..."
                            className="h-9"
                          />
                          {selectedCurrencies.size > 0 && (
                            <div className="border-b px-2 py-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-full justify-start text-xs"
                                onClick={() => setSelectedCurrencies(new Set())}
                              >
                                Clear selection
                              </Button>
                            </div>
                          )}
                          <CommandList>
                            <CommandEmpty>No currency found.</CommandEmpty>
                            <CommandGroup>
                              {uniqueCurrencies.map(({ key, label }) => (
                                <CommandItem key={key} value={label}>
                                  <div
                                    className="flex w-full items-center space-x-3 py-1"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Checkbox
                                      id={`currency-${key}`}
                                      checked={selectedCurrencies.has(key)}
                                      onCheckedChange={(checked) => {
                                        setSelectedCurrencies((prev) => {
                                          const next = new Set(prev);
                                          if (checked) {
                                            next.add(key);
                                          } else {
                                            next.delete(key);
                                          }
                                          return next;
                                        });
                                      }}
                                    />
                                    <label
                                      htmlFor={`currency-${key}`}
                                      className="cursor-pointer text-sm"
                                    >
                                      {label}
                                    </label>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="min-w-0 flex-1 sm:flex-initial"
                        >
                          <PlusCircle className="size-4 shrink-0" />
                          Networks
                          {selectedNetworks.size > 0 && (
                            <Badge variant="secondary" className="ml-1">
                              {selectedNetworks.size}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-52 p-0" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Search networks..."
                            className="h-9"
                          />
                          {selectedNetworks.size > 0 && (
                            <div className="border-b px-2 py-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-full justify-start text-xs"
                                onClick={() => setSelectedNetworks(new Set())}
                              >
                                Clear selection
                              </Button>
                            </div>
                          )}
                          <CommandList>
                            <CommandEmpty>No network found.</CommandEmpty>
                            <CommandGroup>
                              {uniqueNetworks.map((network) => (
                                <CommandItem key={network} value={network}>
                                  <div
                                    className="flex w-full items-center space-x-3 py-1"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Checkbox
                                      id={`network-${network}`}
                                      checked={selectedNetworks.has(network)}
                                      onCheckedChange={(checked) => {
                                        setSelectedNetworks((prev) => {
                                          const next = new Set(prev);
                                          if (checked) {
                                            next.add(network);
                                          } else {
                                            next.delete(network);
                                          }
                                          return next;
                                        });
                                      }}
                                    />
                                    <label
                                      htmlFor={`network-${network}`}
                                      className="cursor-pointer text-sm"
                                    >
                                      {network}
                                    </label>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="rounded-md">
          <Table className="[&_th:not(:last-child)]:min-w-[160px] [&_td:not(:last-child)]:min-w-[160px] md:[&_th]:min-w-0 md:[&_td]:min-w-0 md:table-fixed">
            <colgroup>
              <col className="md:w-[23%]" />
              <col className="md:w-[23%]" />
              <col className="md:w-[23%]" />
              <col className="md:w-[23%]" />
              <col className="md:w-[8%]" />
            </colgroup>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.id === "actions"
                          ? "text-right"
                          : undefined
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === "actions" ? "" : undefined
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing {pageIndex * pageSize + 1} to{" "}
            {Math.min(
              (pageIndex + 1) * pageSize,
              table.getFilteredRowModel().rows.length,
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </p>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
