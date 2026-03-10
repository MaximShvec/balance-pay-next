import type { TransactionsFilterState } from "./types";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  filters: TransactionsFilterState;
};

const methods = [
  { value: "iban", label: "IBAN" },
  { value: "balance pay", label: "Balance Pay" },
];

export function TransactionsMobileFilters({
  open,
  onOpenChange,
  filters,
}: MobileFiltersProps) {
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto rounded-t-sm px-4"
      >
        <div className="mx-auto mb-2 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/20" />
        <SheetHeader className="px-0">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <Accordion
          type="multiple"
          defaultValue={["status", "type", "method"]}
          className="w-full"
        >
          <AccordionItem value="status">
            <AccordionTrigger className="py-4">
              Status
              {selectedStatuses.size > 0 && (
                <Badge variant="secondary" className="mr-auto">
                  {selectedStatuses.size}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {statuses.map((status) => (
                  <div
                    key={status.value}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`sheet-status-${status.value}`}
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
                      htmlFor={`sheet-status-${status.value}`}
                      className="cursor-pointer text-sm"
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="type">
            <AccordionTrigger className="py-4">
              Type
              {selectedTypes.size > 0 && (
                <Badge variant="secondary" className="mr-auto">
                  {selectedTypes.size}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {types.map((type) => (
                  <div
                    key={type.value}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`sheet-type-${type.value}`}
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
          <AccordionItem value="method">
            <AccordionTrigger className="py-4">
              Method
              {selectedMethods.size > 0 && (
                <Badge variant="secondary" className="mr-auto">
                  {selectedMethods.size}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {methods.map((method) => (
                  <div
                    key={method.value}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`sheet-method-${method.value}`}
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
                      htmlFor={`sheet-method-${method.value}`}
                      className="cursor-pointer text-sm"
                    >
                      {method.label}
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
              setSelectedStatuses(new Set());
              setSelectedTypes(new Set());
              setSelectedMethods(new Set());
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
