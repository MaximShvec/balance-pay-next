export type TransactionType =
  | "deposit"
  | "withdraw"
  | "send"
  | "receive"
  | "buy"
  | "sell"
  | "exchange"
  | "move";

export type TransactionSubType = "fiat" | "crypto";

export type TransactionMethod = "iban" | "balance pay";

export type TransactionStatus = "completed" | "pending" | "failed";

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
  status: TransactionStatus;
  reference: string;
};

export type TransactionFilters = {
  statuses?: TransactionStatus[];
  types?: TransactionType[];
  methods?: TransactionMethod[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
};
