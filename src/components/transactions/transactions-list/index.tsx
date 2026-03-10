"use client";

import * as React from "react";
import {
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
import { ColumnsIcon } from "lucide-react";
import type { Transaction } from "@/types";
import { cn } from "@/lib/utils";
import { FilterIcon } from "@/components/icons";
import { ExportButton } from "@/components/shared";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { columns } from "./columns";
import { exportTransactionsToCsv } from "./utils";
import { TransactionsToolbar } from "./toolbar";
import { TransactionsMobileFilters } from "./mobile-filters";
import { TransactionsPagination } from "./pagination";

const statuses = [
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
];

const types = [
  { value: "deposit", label: "Deposit" },
  { value: "withdraw", label: "Withdraw" },
  { value: "send", label: "Send" },
  { value: "receive", label: "Receive" },
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "exchange", label: "Exchange" },
  { value: "move", label: "Move" },
];

export function TransactionsList({ data }: { data: Transaction[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      fromTo: false,
      fee: false,
      reference: false,
    });
  const [showFilters, setShowFilters] = React.useState(false);
  const [openFiltersSheet, setOpenFiltersSheet] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (!isMobile) setOpenFiltersSheet(false);
  }, [isMobile]);

  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<string>>(
    new Set(),
  );
  const [selectedTypes, setSelectedTypes] = React.useState<Set<string>>(
    new Set(),
  );
  const [selectedMethods, setSelectedMethods] = React.useState<Set<string>>(
    new Set(),
  );
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({ pageIndex: 0, pageSize: 12 });

  const filteredData = React.useMemo(() => {
    return data.filter((t) => {
      if (selectedStatuses.size > 0 && !selectedStatuses.has(t.status))
        return false;
      if (selectedTypes.size > 0 && !selectedTypes.has(t.type.toLowerCase()))
        return false;
      if (selectedMethods.size > 0) {
        const methodKey = t.method.toLowerCase().replace(/\s+/g, " ");
        if (!selectedMethods.has(methodKey)) return false;
      }
      return true;
    });
  }, [data, selectedStatuses, selectedTypes, selectedMethods]);

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
    state: { sorting, columnFilters, columnVisibility, pagination },
    pageCount: Math.ceil(filteredData.length / pageSize),
  });

  const filterState = {
    selectedStatuses,
    setSelectedStatuses,
    selectedTypes,
    setSelectedTypes,
    selectedMethods,
    setSelectedMethods,
    statuses,
    types,
  };

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
              (isMobile ? openFiltersSheet : showFilters) &&
                "bg-accent text-accent-foreground dark:bg-input/50",
            )}
            onClick={() =>
              isMobile
                ? setOpenFiltersSheet((v) => !v)
                : setShowFilters((v) => !v)
            }
            aria-label={
              isMobile
                ? openFiltersSheet
                  ? "Close filters"
                  : "Open filters"
                : showFilters
                  ? "Hide filters"
                  : "Show filters"
            }
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
                    className="capitalize cursor-pointer transition-all duration-200"
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
        {isMobile && (
          <Input
            placeholder="Search transactions..."
            value={
              (table.getColumn("reference")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("reference")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        )}

        {!isMobile && (
          <TransactionsToolbar
            table={table}
            showFilters={showFilters}
            filters={filterState}
          />
        )}

        <TransactionsMobileFilters
          open={openFiltersSheet}
          onOpenChange={setOpenFiltersSheet}
          filters={filterState}
        />

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

        <TransactionsPagination
          table={table}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </CardContent>
    </Card>
  );
}
