"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveIcon } from "@/components/icons";

type AssetItem = { id: string; name: string; shortName: string; icon: string };

const cryptoAssets: AssetItem[] = [
  {
    id: "BTC",
    name: "Bitcoin",
    shortName: "BTC",
    icon: "/images/crypto-icons/bitcoin.svg",
  },
  {
    id: "ETH",
    name: "Ethereum",
    shortName: "ETH",
    icon: "/images/crypto-icons/ethereum.svg",
  },
  {
    id: "SOL",
    name: "Solana",
    shortName: "SOL",
    icon: "/images/crypto-icons/solana.svg",
  },
  {
    id: "AVAX",
    name: "Avalanche",
    shortName: "AVAX",
    icon: "/images/crypto-icons/avalanche.svg",
  },
  {
    id: "XRP",
    name: "XRP",
    shortName: "XRP",
    icon: "/images/crypto-icons/xrp.svg",
  },
  {
    id: "DOGE",
    name: "Dogecoin",
    shortName: "DOGE",
    icon: "/images/crypto-icons/dogecoin.svg",
  },
  {
    id: "USDT",
    name: "Tether",
    shortName: "USDT",
    icon: "/images/crypto-icons/tether.svg",
  },
  {
    id: "USDC",
    name: "USD Coin",
    shortName: "USDC",
    icon: "/images/crypto-icons/usd-coin.svg",
  },
];

const fiatAssets: AssetItem[] = [
  {
    id: "USD",
    name: "US Dollar",
    shortName: "USD",
    icon: "/images/currencies/USD.svg",
  },
  {
    id: "EUR",
    name: "Euro",
    shortName: "EUR",
    icon: "/images/currencies/EUR.svg",
  },
];

const mockBalances: Record<string, string> = {
  BTC: "0.5234",
  ETH: "2.8",
  SOL: "450",
  AVAX: "125.5",
  XRP: "15000",
  DOGE: "25000",
  USDT: "880000",
  USDC: "1200",
  USD: "15000",
  EUR: "0",
};

const mockRatesUsd: Record<string, number> = {
  BTC: 70000,
  ETH: 3500,
  SOL: 200,
  AVAX: 35,
  XRP: 0.52,
  DOGE: 0.08,
  USDT: 1,
  USDC: 1,
  USD: 1,
  EUR: 1.08,
};

function convertAmount(fromId: string, toId: string, amount: number): number {
  const rateFrom = mockRatesUsd[fromId] ?? 1;
  const rateTo = mockRatesUsd[toId] ?? 1;
  return (amount * rateFrom) / rateTo;
}

function formatAmount(value: number, assetId: string): string {
  const rate = mockRatesUsd[assetId] ?? 1;
  if (value >= 1000 || (rate >= 1 && value >= 1)) {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  }
  if (value < 0.0001 && value > 0) return value.toFixed(8);
  if (value < 1) return value.toFixed(6);
  return value.toFixed(2);
}

function formatBalance(value: string): string {
  const num = parseFloat(value.replace(/,/g, ""));
  if (isNaN(num)) return value;
  return num >= 1000
    ? num.toLocaleString("en-US", { maximumFractionDigits: 0 })
    : value;
}

function CoinBlock({
  label,
  value,
  options,
  onValueChange,
  amount,
  onAmountChange,
  showMax,
  amountReadOnly,
}: {
  label: string;
  value: string;
  options: AssetItem[];
  onValueChange: (v: string) => void;
  amount: string;
  onAmountChange: (v: string) => void;
  showMax?: boolean;
  amountReadOnly?: boolean;
}) {
  const asset = options.find((a) => a.id === value) ?? options[0];
  const balance = mockBalances[asset.id] ?? "0";
  const placeholder = `0.01 - ${formatBalance(balance)}`;

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{label}</span>
        <span>
          Доступный баланс: {balance === "0" ? "0" : formatBalance(balance)}
        </span>
      </div>
      <div className="flex justify-between items-center gap-4">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-fit border-none shadow-none focus:ring-0 pl-2 pr-3 bg-muted/40 hover:bg-muted/60 rounded-full [&>svg]:ml-2">
            <SelectValue>
              <div className="flex items-center gap-2 font-medium text-lg">
                <Image
                  width={24}
                  height={24}
                  className="size-6"
                  src={asset.icon}
                  unoptimized
                  alt=""
                />
                {asset.shortName}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                <div className="flex items-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    className="size-5"
                    src={a.icon}
                    unoptimized
                    alt=""
                  />
                  {a.name}/{a.shortName}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-col items-end gap-1 flex-1 min-w-0">
          <Input
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            readOnly={amountReadOnly}
            className="text-right text-lg w-1/2 min-w-[120px]"
            placeholder={placeholder}
          />
          {showMax && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-primary font-medium px-2 h-auto hover:bg-transparent -mr-1"
              onClick={() => onAmountChange(balance)}
            >
              Max
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

type TradingCardProps = {
  onAssetChange?: (topAssetId: string, bottomAssetId: string) => void;
};

export function TradingCard({ onAssetChange }: TradingCardProps) {
  const [activeTab, setActiveTab] = useState("exchange");

  const [topAssetId, setTopAssetId] = useState<string>(cryptoAssets[0].id);
  const [bottomAssetId, setBottomAssetId] = useState<string>(fiatAssets[0].id);
  const [topAmount, setTopAmount] = useState<string>("");

  const isExchange = activeTab === "exchange";
  const [topIsCrypto, setTopIsCrypto] = useState(true);

  const topOptions = isExchange
    ? topIsCrypto
      ? cryptoAssets
      : fiatAssets
    : cryptoAssets;
  const bottomOptions = isExchange
    ? topIsCrypto
      ? fiatAssets
      : cryptoAssets
    : cryptoAssets;

  const topValue = topAssetId;
  const bottomValue = bottomAssetId;

  useEffect(() => {
    onAssetChange?.(topAssetId, bottomAssetId);
  }, [topAssetId, bottomAssetId, onAssetChange]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setTopAmount("");
    if (tab === "exchange") {
      setTopIsCrypto(true);
      setTopAssetId(cryptoAssets[0].id);
      setBottomAssetId(fiatAssets[0].id);
    } else {
      setTopAssetId(cryptoAssets[0].id);
      setBottomAssetId(cryptoAssets[1].id);
    }
  };

  const handleTopAssetChange = (id: string) => {
    if (id !== topAssetId) setTopAmount("");
    setTopAssetId(id);
  };

  const handleBottomAssetChange = (id: string) => {
    if (id !== bottomAssetId) setTopAmount("");
    setBottomAssetId(id);
  };

  const bottomAmount = useMemo(() => {
    const num = parseFloat(topAmount.replace(/,/g, "").replace(/\s/g, ""));
    if (!topAmount.trim() || isNaN(num) || num <= 0) return "";
    const converted = convertAmount(topAssetId, bottomAssetId, num);
    return formatAmount(converted, bottomAssetId);
  }, [topAmount, topAssetId, bottomAssetId]);

  const handleSwap = () => {
    if (isExchange) {
      setTopIsCrypto((prev) => !prev);
    }
    setTopAssetId(bottomAssetId);
    setBottomAssetId(topAssetId);
    setTopAmount(bottomAmount);
  };

  const exchangeContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 relative">
        <CoinBlock
          label="Sell"
          value={topValue}
          options={topOptions}
          onValueChange={handleTopAssetChange}
          amount={topAmount}
          onAmountChange={setTopAmount}
          showMax
        />

        <div className="mx-auto -my-5 z-10">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full bg-background border-border shadow-sm h-8 w-8"
            aria-label="Swap"
            onClick={handleSwap}
          >
            <MoveIcon className="size-4 rotate-90" />
          </Button>
        </div>

        <CoinBlock
          label="Buy"
          value={bottomValue}
          options={bottomOptions}
          onValueChange={handleBottomAssetChange}
          amount={bottomAmount}
          onAmountChange={() => {}}
          amountReadOnly
        />
      </div>

      <Button className="w-full" size="lg" disabled={!topAmount.trim()}>
        Введите сумму
      </Button>
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Available Balance</CardDescription>
        <CardTitle className="font-display text-3xl">$46,200</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="w-full" value="exchange">
              Exchange
            </TabsTrigger>
            <TabsTrigger className="w-full" value="convert">
              Convert
            </TabsTrigger>
          </TabsList>
          <TabsContent value="exchange" className="space-y-6">
            {exchangeContent}
          </TabsContent>
          <TabsContent value="convert" className="space-y-6">
            {exchangeContent}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
