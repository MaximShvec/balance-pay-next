import type { AssetsFilterState, AssetsTableFilterBy, CurrencyTypeFilter } from "./types";
import { showTypeFilter } from "./types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type MobileFiltersProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: AssetsFilterState;
  filterBy?: AssetsTableFilterBy;
};

export function AssetsMobileFilters({
  open,
  onOpenChange,
  filters,
  filterBy,
}: MobileFiltersProps) {
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

  const typeOptions: { value: CurrencyTypeFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "crypto", label: "Crypto" },
    { value: "stable", label: "Stable" },
  ];
  if (filterBy !== "crypto-and-stable") typeOptions.push({ value: "fiat", label: "Fiat" });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto rounded-t-sm px-4"
      >
        <div className="mx-auto mb-2 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/20" />
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <Accordion
          type="multiple"
          defaultValue={
            showTypeFilter(filterBy)
              ? ["hide-zero", "type", "currencies", "networks"]
              : ["hide-zero", "currencies", "networks"]
          }
          className="w-full"
        >
          <AccordionItem value="hide-zero">
            <AccordionTrigger className="py-4">
              Hide zero balance
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-2">
                <Switch
                  id="sheet-hide-zero"
                  checked={hideZeroBalance}
                  onCheckedChange={setHideZeroBalance}
                />
                <label
                  htmlFor="sheet-hide-zero"
                  className="text-muted-foreground cursor-pointer text-sm"
                >
                  Hide zero balance
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
          {showTypeFilter(filterBy) && (
            <AccordionItem value="type">
              <AccordionTrigger className="py-4">
                Type
                {currencyTypeFilter !== "all" && (
                  <Badge variant="secondary" className="mr-auto">
                    1
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {typeOptions.map((type) => (
                    <div
                      key={type.value}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`sheet-type-${type.value}`}
                        checked={currencyTypeFilter === type.value}
                        onCheckedChange={(checked) =>
                          checked && setCurrencyTypeFilter(type.value)
                        }
                      />
                      <label
                        htmlFor={`sheet-type-${type.value}`}
                        className="cursor-pointer text-sm"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          <AccordionItem value="currencies">
            <AccordionTrigger className="py-4">
              Currencies
              {selectedCurrencies.size > 0 && (
                <Badge variant="secondary" className="mr-auto">
                  {selectedCurrencies.size}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {uniqueCurrencies.map(({ key, label }) => (
                  <div key={key} className="flex items-center space-x-3">
                    <Checkbox
                      id={`sheet-currency-${key}`}
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
                      htmlFor={`sheet-currency-${key}`}
                      className="cursor-pointer text-sm"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="networks">
            <AccordionTrigger className="py-4">
              Networks
              {selectedNetworks.size > 0 && (
                <Badge variant="secondary" className="mr-auto">
                  {selectedNetworks.size}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {uniqueNetworks.map((network) => (
                  <div
                    key={network}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`sheet-network-${network}`}
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
                      htmlFor={`sheet-network-${network}`}
                      className="cursor-pointer text-sm"
                    >
                      {network}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SheetFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setCurrencyTypeFilter("all");
              setHideZeroBalance(false);
              setSelectedCurrencies(new Set());
              setSelectedNetworks(new Set());
              onOpenChange(false);
            }}
          >
            Reset filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
