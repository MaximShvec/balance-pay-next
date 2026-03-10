import type { Transaction } from "@/types";

export function formatAmountParts(
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

export function formatDateParts(dateStr: string): {
  main: string;
  caption: string;
} {
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

export function exportTransactionsToCsv(transactions: Transaction[]): void {
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
