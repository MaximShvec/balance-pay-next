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
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { FilterIcon } from "@/components/icons";
import { ExportButton } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./columns";
import { assetsData, getCurrencyType, exportAssetsToCsv } from "./data";
import type { CurrencyTypeFilter } from "./types";
import { AssetsToolbar } from "./toolbar";
import { AssetsMobileFilters } from "./mobile-filters";
import { AssetsPagination } from "./pagination";

export function AssetsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({ pageIndex: 0, pageSize: 12 });

  const [currencyTypeFilter, setCurrencyTypeFilter] =
    React.useState<CurrencyTypeFilter>("all");
  const [hideZeroBalance, setHideZeroBalance] = React.useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = React.useState<
    Set<string>
  >(new Set());
  const [selectedNetworks, setSelectedNetworks] = React.useState<Set<string>>(
    new Set(),
  );
  const [showFilters, setShowFilters] = React.useState(false);
  const [openFiltersSheet, setOpenFiltersSheet] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (!isMobile) setOpenFiltersSheet(false);
  }, [isMobile]);

  const uniqueCurrencies = React.useMemo(() => {
    const seen = new Set<string>();
    return assetsData
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
    return assetsData
      .map((o) => o.asset.network ?? "Native")
      .filter((n) => {
        if (seen.has(n)) return false;
        seen.add(n);
        return true;
      })
      .sort((a, b) => (a === "Native" ? -1 : a.localeCompare(b)));
  }, []);

  const filteredData = React.useMemo(() => {
    return assetsData.filter((order) => {
      const type = getCurrencyType(order.asset.ticker);
      if (currencyTypeFilter !== "all" && type !== currencyTypeFilter)
        return false;
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
  }, [currencyTypeFilter, hideZeroBalance, selectedCurrencies, selectedNetworks]);

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
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
    pageCount: Math.ceil(filteredData.length / pageSize),
  });

  const filterState = {
    hideZeroBalance,
    setHideZeroBalance,
    currencyTypeFilter,
    setCurrencyTypeFilter,
    selectedCurrencies,
    setSelectedCurrencies,
    selectedNetworks,
    setSelectedNetworks,
    uniqueCurrencies,
    uniqueNetworks,
  };

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
          <ExportButton
            className="shrink-0"
            onExportCsv={() => {
              const rows = table.getFilteredRowModel().rows;
              exportAssetsToCsv(rows.map((r) => r.original));
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="min-w-0 space-y-4 px-0">
        {isMobile && (
          <Input
            placeholder="Filter assets..."
            value={(table.getColumn("asset")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("asset")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        )}

        {!isMobile && (
          <AssetsToolbar
            table={table}
            showFilters={showFilters}
            filters={filterState}
          />
        )}

        <AssetsMobileFilters
          open={openFiltersSheet}
          onOpenChange={setOpenFiltersSheet}
          filters={filterState}
        />

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

        <AssetsPagination
          table={table}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </CardContent>
    </Card>
  );
}
