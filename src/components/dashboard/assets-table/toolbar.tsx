import type { Table } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Asset } from "@/types";
import type { AssetsFilterState } from "./types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  table: Table<Asset>;
  showFilters: boolean;
  filters: AssetsFilterState;
  filterBy?: "fiat" | "crypto";
};

export function AssetsToolbar({ table, showFilters, filters, filterBy }: ToolbarProps) {
  const {
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
  } = filters;

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
                  placeholder="Filter assets..."
                  value={
                    (table.getColumn("asset")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("asset")
                      ?.setFilterValue(event.target.value)
                  }
                  className="min-w-[120px] w-full"
                />
              </div>
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
              {!filterBy && (
                <div className="order-3 w-full basis-full sm:order-0 sm:w-auto sm:basis-auto shrink-0">
                  <Select
                    value={currencyTypeFilter}
                    onValueChange={(v) =>
                      setCurrencyTypeFilter(
                        v as "all" | "crypto" | "stable" | "fiat",
                      )
                    }
                  >
                    <SelectTrigger className="w-full sm:w-[140px] text-muted-foreground">
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
              )}
              <div className="order-2 flex min-w-0 w-full basis-full gap-2 sm:order-0 sm:w-auto sm:basis-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-0 flex-1 sm:flex-initial text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
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
                                      if (checked) next.add(key);
                                      else next.delete(key);
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
                      className="min-w-0 flex-1 sm:flex-initial text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
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
                                      if (checked) next.add(network);
                                      else next.delete(network);
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
  );
}
