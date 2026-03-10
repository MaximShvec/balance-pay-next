export type CurrencyCode = string;

export type Currency = {
  code: CurrencyCode;
  name: string;
  symbol: string;
  type: "fiat" | "crypto";
};

export type AssetInfo = {
  name: string;
  ticker: CurrencyCode;
  image: string;
  network?: string;
};

export type Asset = {
  id: number;
  asset: AssetInfo;
  balance: number;
  balanceUsd: number;
  priceUsd: number;
  performance24h: number;
  product: {
    name: string;
  };
  amount: number;
};

export type Wallet = {
  id: string;
  totalBalanceUsd: number;
  assets: Asset[];
};
