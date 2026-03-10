import type { Asset } from "@/types";

export const FIAT_TICKERS = ["USD", "EUR"];
export const STABLE_TICKERS = ["USDT", "USDC"];

export function getCurrencyType(
  ticker: string,
): "fiat" | "stable" | "crypto" {
  if (FIAT_TICKERS.includes(ticker)) return "fiat";
  if (STABLE_TICKERS.includes(ticker)) return "stable";
  return "crypto";
}

function escapeCsvValue(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportAssetsToCsv(assets: Asset[]): void {
  const headers = [
    "Asset",
    "Network",
    "Balance (USD)",
    "Balance",
    "Price (USD)",
    "Performance (24h)",
  ];
  const rows = assets.map((a) => {
    const assetName = a.asset.network
      ? `${a.asset.name} (${a.asset.network})`
      : a.asset.name;
    const balance =
      a.balance % 1 === 0 ? a.balance.toString() : a.balance.toFixed(4);
    const balanceStr = `${balance} ${a.asset.ticker}`;
    const performance = `${a.performance24h >= 0 ? "+" : ""}${a.performance24h.toFixed(1)}%`;
    return [
      escapeCsvValue(assetName),
      escapeCsvValue(a.asset.network ?? ""),
      a.balanceUsd.toString(),
      escapeCsvValue(balanceStr),
      a.priceUsd.toString(),
      performance,
    ];
  });
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
  link.download = `assets-table-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export const assetsData: Asset[] = [
  {
    id: 1,
    asset: { name: "US Dollar", ticker: "USD", image: "/images/currencies/USD.svg", network: "SWIFT" },
    balance: 1500, balanceUsd: 1500, priceUsd: 1, performance24h: 0,
    product: { name: "Tire Doodad" }, amount: 300,
  },
  {
    id: 2,
    asset: { name: "Euro", ticker: "EUR", image: "/images/currencies/EUR.svg", network: "SEPA" },
    balance: 0, balanceUsd: 0, priceUsd: 1.08, performance24h: -1.9,
    product: { name: "Engine Kit" }, amount: 450,
  },
  {
    id: 3,
    asset: { name: "Bitcoin", ticker: "BTC", image: "/images/currencies/BTC.svg", network: "Bitcoin" },
    balance: 0.05, balanceUsd: 3500, priceUsd: 70000, performance24h: 9.3,
    product: { name: "Brake Pad" }, amount: 200,
  },
  {
    id: 4,
    asset: { name: "Ethereum", ticker: "ETH", image: "/images/currencies/ETH.svg", network: "ERC-20" },
    balance: 1.2, balanceUsd: 4200, priceUsd: 3500, performance24h: -2.4,
    product: { name: "Fuel Pump" }, amount: 500,
  },
  {
    id: 5,
    asset: { name: "USD Tether", ticker: "USDT", image: "/images/currencies/USDT_TRON.svg", network: "TRC-20" },
    balance: 0, balanceUsd: 0, priceUsd: 1, performance24h: 0.1,
    product: { name: "Steering Wheel" }, amount: 350,
  },
  {
    id: 6,
    asset: { name: "USD Coin", ticker: "USDC", image: "/images/currencies/USDC.svg", network: "ERC-20" },
    balance: 22, balanceUsd: 22, priceUsd: 1, performance24h: 0,
    product: { name: "Air Filter" }, amount: 180,
  },
  {
    id: 7,
    asset: { name: "Polygon", ticker: "POL", image: "/images/currencies/POL.svg", network: "Polygon" },
    balance: 150, balanceUsd: 85, priceUsd: 0.57, performance24h: 5.2,
    product: { name: "Oil Filter" }, amount: 220,
  },
  {
    id: 8,
    asset: { name: "Tron", ticker: "TRX", image: "/images/currencies/TRX.svg", network: "TRC-20" },
    balance: 0, balanceUsd: 0, priceUsd: 0.19, performance24h: -3.1,
    product: { name: "Radiator Cap" }, amount: 290,
  },
  {
    id: 9,
    asset: { name: "Solana", ticker: "SOL", image: "/images/currencies/SOL.svg", network: "Solana" },
    balance: 12, balanceUsd: 2400, priceUsd: 200, performance24h: 12.8,
    product: { name: "Spark Plug" }, amount: 150,
  },
  {
    id: 10,
    asset: { name: "USD Coin", ticker: "USDC", image: "/images/currencies/USDC_SOL.svg", network: "SOLANA" },
    balance: 100, balanceUsd: 100, priceUsd: 1, performance24h: 0,
    product: { name: "Transmission Fluid" }, amount: 120,
  },
  {
    id: 11,
    asset: { name: "USD Tether", ticker: "USDT", image: "/images/currencies/USDT_SOL.svg", network: "SOLANA" },
    balance: 0, balanceUsd: 0, priceUsd: 1, performance24h: -0.5,
    product: { name: "Transmission Fluid" }, amount: 120,
  },
  {
    id: 12,
    asset: { name: "Binance Coin", ticker: "BNB", image: "/images/currencies/BNB.svg", network: "BEP-20" },
    balance: 2.5, balanceUsd: 1500, priceUsd: 600, performance24h: 1.2,
    product: { name: "Transmission Fluid" }, amount: 120,
  },
];
