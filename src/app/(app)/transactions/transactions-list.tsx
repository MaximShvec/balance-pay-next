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
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ColumnsIcon,
  PlusCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  DotsIcon,
  FilterIcon,
  CopyIcon,
  RecieveIcon,
  DocIcon,
  SendIcon,
} from "@/components/icons";
import { ExportButton } from "@/components/shared";
import { cn } from "@/lib/utils";

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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type Transaction = {
  id: number;
  date: string;
  type: string;
  typeSub: string;
  method: string;
  route: string;
  from: string;
  to: string;
  youPaid: number | null;
  youPaidCurrency: string | null;
  youReceived: number | null;
  youReceivedCurrency: string | null;
  fee: number | null;
  feeCurrency: string | null;
  status: "completed" | "pending" | "failed";
  reference: string;
};

function formatAmountParts(
  value: number | null,
  currency: string | null,
  isOut: boolean,
): { main: string; caption: string | null } {
  if (value === null || currency === null) return { main: "-", caption: null };
  const formatted = value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  });
  return {
    main: `${isOut ? "-" : "+"} ${formatted}`,
    caption: currency,
  };
}

function formatDateParts(dateStr: string): { main: string; caption: string } {
  const date = new Date(dateStr);
  const main = dateStr.slice(0, 10);
  const time = dateStr.slice(11, 19);
  const caption = `${time} (GMT${date.getTimezoneOffset() <= 0 ? "+" : ""}${-date.getTimezoneOffset() / 60})`;
  return { main, caption };
}

function escapeCsvValue(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function exportTransactionsToCsv(transactions: Transaction[]): void {
  const headers = [
    "Date",
    "Type",
    "Type Sub",
    "Method",
    "Route",
    "From",
    "To",
    "You Paid",
    "You Received",
    "Fee",
    "Status",
    "Reference",
  ];
  const rows = transactions.map((t) => [
    t.date,
    escapeCsvValue(t.type),
    escapeCsvValue(t.typeSub),
    escapeCsvValue(t.method),
    escapeCsvValue(t.route),
    escapeCsvValue(t.from),
    escapeCsvValue(t.to),
    t.youPaid != null ? t.youPaid.toString() : "-",
    t.youReceived != null ? t.youReceived.toString() : "-",
    t.fee != null ? t.fee.toString() : "-",
    escapeCsvValue(t.status),
    escapeCsvValue(t.reference),
  ]);
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
  link.download = `transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const { main, caption } = formatDateParts(row.getValue("date") as string);
      return (
        <div className="flex flex-col">
          <span className="font-medium text-lg">{main}</span>
          <span className="text-muted-foreground text-md">{caption}</span>
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = new Date(rowA.getValue(columnId) as string).getTime();
      const b = new Date(rowB.getValue(columnId) as string).getTime();
      return a - b;
    },
  },
  {
    id: "type",
    accessorFn: (row) => `${row.type} ${row.typeSub}`,
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const { type, typeSub } = row.original;
      const isDeposit = type.toLowerCase() === "deposit";
      const Icon = isDeposit ? RecieveIcon : SendIcon;
      return (
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-muted">
            <Icon className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-lg capitalize">{type}</span>
            <span className="text-muted-foreground text-md capitalize">
              {typeSub}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "methodRoute",
    accessorFn: (row) => `${row.method} ${row.route}`,
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Method / Route
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-lg">{row.original.method}</span>
        <span className="text-muted-foreground text-md">
          {row.original.route}
        </span>
      </div>
    ),
  },
  {
    id: "fromTo",
    accessorFn: (row) => `${row.from} ${row.to}`,
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        From / To
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-lg">{row.original.from}</span>
        <span className="text-muted-foreground text-md">{row.original.to}</span>
      </div>
    ),
  },
  {
    id: "youPaid",
    accessorFn: (row) => row.youPaid ?? -Infinity,
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        You paid (Out)
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const { main, caption } = formatAmountParts(
        row.original.youPaid,
        row.original.youPaidCurrency,
        true,
      );
      return (
        <div className="flex flex-col">
          <span
            className={
              main !== "-"
                ? "font-medium text-lg text-destructive"
                : "font-medium text-lg"
            }
          >
            {main}
          </span>
          {caption && (
            <span className="text-muted-foreground text-md">{caption}</span>
          )}
        </div>
      );
    },
    sortingFn: "basic",
  },
  {
    id: "youReceived",
    accessorFn: (row) => row.youReceived ?? -Infinity,
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        You received (In)
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const { main, caption } = formatAmountParts(
        row.original.youReceived,
        row.original.youReceivedCurrency,
        false,
      );
      return (
        <div className="flex flex-col">
          <span
            className={
              main !== "-"
                ? "font-medium text-lg text-green-600 dark:text-green-500"
                : "font-medium text-lg"
            }
          >
            {main}
          </span>
          {caption && (
            <span className="text-muted-foreground text-md">{caption}</span>
          )}
        </div>
      );
    },
    sortingFn: "basic",
  },
  {
    id: "fee",
    accessorFn: (row) => row.fee ?? -Infinity,
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fee
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const { main, caption } = formatAmountParts(
        row.original.fee,
        row.original.feeCurrency,
        true,
      );
      return (
        <div className="flex flex-col">
          <span className="font-medium text-lg">{main}</span>
          {caption && (
            <span className="text-muted-foreground text-md">{caption}</span>
          )}
        </div>
      );
    },
    sortingFn: "basic",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const statusMap = {
        completed: "positive",
        pending: "warning",
        failed: "negative",
      } as const;
      const statusClass = statusMap[status] ?? "default";
      return (
        <Badge variant={statusClass} className="p-1 px-2 text-sm capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <Button
        className="-ml-3"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Reference
        <ArrowUpDown className="size-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-md font-medium">
        {row.getValue("reference")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    enableHiding: false,
    enableSorting: false,
    cell: () => (
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
            <DropdownMenuItem>
              <DocIcon /> View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon /> Copy reference
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export default function TransactionsList({ data }: { data: Transaction[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<string>>(
    new Set(),
  );
  const [selectedTypes, setSelectedTypes] = React.useState<Set<string>>(
    new Set(),
  );
  const [methodFilter, setMethodFilter] = React.useState<string>("all");
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 12,
    });

  const filteredData = React.useMemo(() => {
    return data.filter((t) => {
      if (selectedStatuses.size > 0 && !selectedStatuses.has(t.status)) {
        return false;
      }
      if (selectedTypes.size > 0 && !selectedTypes.has(t.type.toLowerCase())) {
        return false;
      }
      if (methodFilter !== "all" && t.method.toLowerCase() !== methodFilter) {
        return false;
      }
      return true;
    });
  }, [data, selectedStatuses, selectedTypes, methodFilter]);

  const pagination = React.useMemo(
    () => ({ pageIndex, pageSize }),
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
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    pageCount: Math.ceil(filteredData.length / pageSize),
  });

  const statuses = [
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  const types = [
    { value: "deposit", label: "Deposit" },
    { value: "withdraw", label: "Withdraw" },
    { value: "send", label: "Send" },
  ];

  return (
    <Card className="border-none py-0 gap-4">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-0">
        <CardTitle>Transactions</CardTitle>
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-transparent data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:border-transparent data-[state=open]:shadow-none"
              >
                <span className="hidden lg:inline">Columns</span>{" "}
                <ColumnsIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ExportButton
            className="shrink-0"
            onExportCsv={() => {
              const rows = table.getFilteredRowModel().rows;
              exportTransactionsToCsv(rows.map((r) => r.original));
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
                  placeholder="Search transactions..."
                  value={
                    (table
                      .getColumn("reference")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("reference")
                      ?.setFilterValue(event.target.value)
                  }
                  className="min-w-[120px] flex-1"
                />
                <div className="flex min-w-0 w-full shrink items-center gap-2 flex-wrap sm:w-auto sm:shrink-0 sm:flex-nowrap">
                  <div className="order-2 flex min-w-0 w-full basis-full gap-2 sm:order-0 sm:w-auto sm:basis-auto">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="min-w-0 flex-1 sm:flex-initial text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                        >
                          <PlusCircle className="size-4 shrink-0" />
                          Status
                          {selectedStatuses.size > 0 && (
                            <Badge variant="secondary" className="ml-1">
                              {selectedStatuses.size}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 p-0" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Search status..."
                            className="h-9"
                          />
                          {selectedStatuses.size > 0 && (
                            <div className="border-b px-2 py-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-full justify-start text-xs"
                                onClick={() => setSelectedStatuses(new Set())}
                              >
                                Clear selection
                              </Button>
                            </div>
                          )}
                          <CommandList>
                            <CommandEmpty>No status found.</CommandEmpty>
                            <CommandGroup>
                              {statuses.map((status) => (
                                <CommandItem
                                  key={status.value}
                                  value={status.value}
                                >
                                  <div
                                    className="flex w-full items-center space-x-3 py-1"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Checkbox
                                      id={`status-${status.value}`}
                                      checked={selectedStatuses.has(
                                        status.value,
                                      )}
                                      onCheckedChange={(checked) => {
                                        setSelectedStatuses((prev) => {
                                          const next = new Set(prev);
                                          if (checked) {
                                            next.add(status.value);
                                          } else {
                                            next.delete(status.value);
                                          }
                                          return next;
                                        });
                                      }}
                                    />
                                    <label
                                      htmlFor={`status-${status.value}`}
                                      className="cursor-pointer text-sm"
                                    >
                                      {status.label}
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
                          className="min-w-0 flex-1 sm:flex-initial text-muted-foreground"
                        >
                          <PlusCircle className="size-4 shrink-0" />
                          Type
                          {selectedTypes.size > 0 && (
                            <Badge variant="secondary" className="ml-1">
                              {selectedTypes.size}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-52 p-0" align="start">
                        <Command>
                          <CommandInput
                            placeholder="Search type..."
                            className="h-9"
                          />
                          {selectedTypes.size > 0 && (
                            <div className="border-b px-2 py-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-full justify-start text-xs"
                                onClick={() => setSelectedTypes(new Set())}
                              >
                                Clear selection
                              </Button>
                            </div>
                          )}
                          <CommandList>
                            <CommandEmpty>No type found.</CommandEmpty>
                            <CommandGroup>
                              {types.map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                >
                                  <div
                                    className="flex w-full items-center space-x-3 py-1"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Checkbox
                                      id={`type-${type.value}`}
                                      checked={selectedTypes.has(type.value)}
                                      onCheckedChange={(checked) => {
                                        setSelectedTypes((prev) => {
                                          const next = new Set(prev);
                                          if (checked) {
                                            next.add(type.value);
                                          } else {
                                            next.delete(type.value);
                                          }
                                          return next;
                                        });
                                      }}
                                    />
                                    <label
                                      htmlFor={`type-${type.value}`}
                                      className="cursor-pointer text-sm"
                                    >
                                      {type.label}
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
                  <div className="order-3 w-full basis-full sm:order-0 sm:w-auto sm:basis-auto shrink-0">
                    <Select
                      value={methodFilter}
                      onValueChange={setMethodFilter}
                    >
                      <SelectTrigger className="w-full sm:w-[140px] text-muted-foreground">
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="iban">IBAN</SelectItem>
                        <SelectItem value="balance pay">Balance Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="rounded-md">
          <Table>
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
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === "actions"
                            ? "text-right"
                            : undefined
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
            Showing{" "}
            {table.getFilteredRowModel().rows.length === 0
              ? 0
              : pageIndex * pageSize + 1}{" "}
            to{" "}
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
