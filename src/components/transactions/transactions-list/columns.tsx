import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type { Transaction } from "@/types";
import { DotsIcon, CopyIcon, RecieveIcon, DocIcon, SendIcon } from "@/components/icons";
import { formatAmountParts, formatDateParts } from "./utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "type",
    accessorFn: (row) => `${row.type} ${row.typeSub}`,
    header: ({ column }) => (
      <Button
        className="!pl-0"
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
          <div className="flex flex-col gap-0.5">
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
      <div className="flex flex-col gap-0.5">
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
      <div className="flex flex-col gap-0.5">
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
        <div className="flex flex-col gap-0.5">
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
        <div className="flex flex-col gap-0.5">
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
        <div className="flex flex-col gap-0.5">
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
        <div className="flex flex-col gap-0.5">
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
              className="h-8 w-8 p-0 cursor-pointer transition-all duration-200 focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
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
