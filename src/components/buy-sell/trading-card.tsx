"use client";

import { useState } from "react";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const coins = [
  { name: "Bitcoin", short_name: "BTC", icon: "bitcoin" },
  { name: "Avalanche", short_name: "AVAX", icon: "avalanche" },
  { name: "Ethereum", short_name: "ETH", icon: "ethereum" },
  { name: "Solana", short_name: "SOL", icon: "solana" },
  { name: "Tether", short_name: "USDT", icon: "tether" },
  { name: "XRP", short_name: "XRP", icon: "xrp" },
  { name: "Dogecoin", short_name: "DOGE", icon: "dogecoin" },
];

const mockBalances: Record<string, string> = {
  Bitcoin: "0.5234",
  Avalanche: "125.5",
  Ethereum: "2.8",
  Solana: "450",
  Tether: "880000",
  XRP: "15000",
  Dogecoin: "25000",
};

function formatBalance(value: string): string {
  const num = parseFloat(value.replace(/,/g, ""));
  if (isNaN(num)) return value;
  return num >= 1000 ? num.toLocaleString("en-US", { maximumFractionDigits: 0 }) : value;
}

function CoinBlock({
  label,
  value,
  onValueChange,
  amount,
  onAmountChange,
  showMax,
}: {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  amount: string;
  onAmountChange: (v: string) => void;
  showMax?: boolean;
}) {
  const coin = coins.find((c) => c.name === value);
  const balance = coin ? mockBalances[coin.name] ?? "0" : "0";
  const placeholder = `0.01 - ${formatBalance(balance)}`;

  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{label}</span>
        <span>Доступный баланс -- {coin?.short_name}</span>
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
                  src={`/images/crypto-icons/${coin?.icon}.svg`}
                  unoptimized
                  alt=""
                />
                {coin?.short_name}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {coins.map((c) => (
              <SelectItem key={c.name} value={c.name}>
                <div className="flex items-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    className="size-5"
                    src={`/images/crypto-icons/${c.icon}.svg`}
                    unoptimized
                    alt=""
                  />
                  {c.name}/{c.short_name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex flex-col items-end gap-1 flex-1 min-w-0">
          <Input 
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
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

export function TradingCard() {
  const [selectedBuyCoin, setSelectedBuyCoin] = useState<string>(coins[0].name);
  const [selectedSellCoin, setSelectedSellCoin] = useState<string>(coins[1].name);
  const [buyAmount, setBuyAmount] = useState<string>("");
  const [sellAmount, setSellAmount] = useState<string>("");

  const selectsContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 relative">
        <CoinBlock
          label="Buy"
          value={selectedBuyCoin}
          onValueChange={setSelectedBuyCoin}
          amount={buyAmount}
          onAmountChange={setBuyAmount}
          showMax
        />
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full bg-background border-border shadow-sm h-8 w-8"
            aria-label="Swap"
            onClick={() => {
              const tempCoin = selectedSellCoin;
              setSelectedSellCoin(selectedBuyCoin);
              setSelectedBuyCoin(tempCoin);
              
              const tempAmount = sellAmount;
              setSellAmount(buyAmount);
              setBuyAmount(tempAmount);
            }}
          >
            <MoveIcon className="size-4 rotate-90" />
          </Button>
        </div>

        <CoinBlock
          label="Sell"
          value={selectedSellCoin}
          onValueChange={setSelectedSellCoin}
          amount={sellAmount}
          onAmountChange={setSellAmount}
        />
      </div>
      
      <Button
        className="w-full"
        size="lg"
        disabled={!buyAmount.trim() || !sellAmount.trim()}
      >
        Введите сумму
      </Button>
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardDescription>Trading</CardDescription>
        <CardTitle className="font-display text-3xl">$46,200</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="exchange">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="w-full" value="exchange">
              Exchange
            </TabsTrigger>
            <TabsTrigger className="w-full" value="convert">
              Convert
            </TabsTrigger>
          </TabsList>
          <TabsContent value="exchange" className="space-y-6">
            {selectsContent}
          </TabsContent>
          <TabsContent value="convert" className="space-y-6">
            {selectsContent}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
