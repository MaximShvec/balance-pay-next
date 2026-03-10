import type { Table } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Transaction } from "@/types";
import type { TransactionsFilterState } from "./types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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

type ToolbarProps = {
  table: Table<Transaction>;
  showFilters: boolean;
  filters: TransactionsFilterState;
};

export function TransactionsToolbar({
  table,
  showFilters,
  filters,
}: ToolbarProps) {
  const {
    selectedStatuses,
    setSelectedStatuses,
    selectedTypes,
    setSelectedTypes,
    selectedMethods,
    setSelectedMethods,
    statuses,
    types,
  } = filters;

  const methods = [
    { value: "iban", label: "IBAN" },
    { value: "balance pay", label: "Balance Pay" },
  ];

  return (
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
          <div className="flex min-w-0 w-full flex-wrap items-center gap-2">
            <div className="flex min-w-0 w-full shrink items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="order-0 min-w-0 w-full basis-full shrink-0 sm:flex-1 sm:basis-0">
                <Input
                  placeholder="Search transactions..."
                  value={
                    (table.getColumn("reference")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("reference")
                      ?.setFilterValue(event.target.value)
                  }
                  className="min-w-[120px] w-full"
                />
              </div>
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
                      <CommandInput placeholder="Search status..." className="h-9" />
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
                            <CommandItem key={status.value} value={status.value}>
                              <div
                                className="flex w-full items-center space-x-3 py-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Checkbox
                                  id={`status-${status.value}`}
                                  checked={selectedStatuses.has(status.value)}
                                  onCheckedChange={(checked) => {
                                    setSelectedStatuses((prev) => {
                                      const next = new Set(prev);
                                      if (checked) next.add(status.value);
                                      else next.delete(status.value);
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
                      className="min-w-0 flex-1 sm:flex-initial text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
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
                      <CommandInput placeholder="Search type..." className="h-9" />
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
                            <CommandItem key={type.value} value={type.value}>
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
                                      if (checked) next.add(type.value);
                                      else next.delete(type.value);
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-0 flex-1 sm:flex-initial text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                    >
                      <PlusCircle className="size-4 shrink-0" />
                      Method
                      {selectedMethods.size > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {selectedMethods.size}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-52 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search method..." className="h-9" />
                      {selectedMethods.size > 0 && (
                        <div className="border-b px-2 py-1.5">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-full justify-start text-xs"
                            onClick={() => setSelectedMethods(new Set())}
                          >
                            Clear selection
                          </Button>
                        </div>
                      )}
                      <CommandList>
                        <CommandEmpty>No method found.</CommandEmpty>
                        <CommandGroup>
                          {methods.map((method) => (
                            <CommandItem key={method.value} value={method.value}>
                              <div
                                className="flex w-full items-center space-x-3 py-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Checkbox
                                  id={`method-${method.value}`}
                                  checked={selectedMethods.has(method.value)}
                                  onCheckedChange={(checked) => {
                                    setSelectedMethods((prev) => {
                                      const next = new Set(prev);
                                      if (checked) next.add(method.value);
                                      else next.delete(method.value);
                                      return next;
                                    });
                                  }}
                                />
                                <label
                                  htmlFor={`method-${method.value}`}
                                  className="cursor-pointer text-sm"
                                >
                                  {method.label}
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
  );
}
