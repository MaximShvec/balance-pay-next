import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps<T> = {
  table: Table<T>;
  pageIndex: number;
  pageSize: number;
};

export function AssetsPagination<T>({
  table,
  pageIndex,
  pageSize,
}: PaginationProps<T>) {
  return (
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
  );
}
