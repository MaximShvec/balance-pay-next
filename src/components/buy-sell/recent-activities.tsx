"use client";

import * as React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const activities = [
  {
    type: "Buy",
    name: "Bitcoin",
    icon: "/images/crypto-icons/bitcoin.svg",
    short_name: "BTC",
    date: "Nov 12, 2024 11:34 PM",
    amount: 0.5384,
    valueUSD: 3980.93,
  },
  {
    type: "Buy",
    name: "Ethereum",
    icon: "/images/crypto-icons/ethereum.svg",
    short_name: "ETH",
    date: "Nov 28, 2024 11:34 PM",
    amount: 0,
    valueUSD: 0,
  },
  {
    type: "Sell",
    name: "Dogecoin",
    icon: "/images/crypto-icons/dogecoin.svg",
    short_name: "DOGE",
    date: "Nov 10, 2024 11:34 PM",
    amount: 0.5384,
    valueUSD: 3980.93,
  },
  {
    type: "Buy",
    name: "Tether",
    icon: "/images/crypto-icons/tether.svg",
    short_name: "USDT",
    date: "Nov 12, 2024 11:34 PM",
    amount: 0,
    valueUSD: 0,
  },
  {
    type: "Sell",
    name: "Toncoin",
    icon: "/images/crypto-icons/toncoin.svg",
    short_name: "TON",
    date: "Sept 04, 2024 11:34 PM",
    amount: 0.5384,
    valueUSD: 3980.93,
  },
  {
    type: "Send",
    name: "Avalanche",
    icon: "/images/crypto-icons/avalanche.svg",
    short_name: "AVAX",
    date: "Nov 12, 2019 11:34 PM",
    amount: 0,
    valueUSD: 0,
  },
  {
    type: "Buy",
    name: "Solana",
    icon: "/images/crypto-icons/solana.svg",
    short_name: "SOL",
    date: "Nov 15, 2024 09:20 AM",
    amount: 1.234,
    valueUSD: 245.67,
  },
  {
    type: "Sell",
    name: "XRP",
    icon: "/images/crypto-icons/xrp.svg",
    short_name: "XRP",
    date: "Nov 14, 2024 03:45 PM",
    amount: 500,
    valueUSD: 312.5,
  },
  {
    type: "Send",
    name: "Bitcoin",
    icon: "/images/crypto-icons/bitcoin.svg",
    short_name: "BTC",
    date: "Nov 13, 2024 08:10 AM",
    amount: 0.0123,
    valueUSD: 890.12,
  },
  {
    type: "Buy",
    name: "Ethereum",
    icon: "/images/crypto-icons/ethereum.svg",
    short_name: "ETH",
    date: "Nov 11, 2024 11:22 PM",
    amount: 2.5,
    valueUSD: 9850.0,
  },
  {
    type: "Sell",
    name: "Tether",
    icon: "/images/crypto-icons/tether.svg",
    short_name: "USDT",
    date: "Nov 09, 2024 02:15 PM",
    amount: 10000,
    valueUSD: 10000.0,
  },
  {
    type: "Buy",
    name: "Avalanche",
    icon: "/images/crypto-icons/avalanche.svg",
    short_name: "AVAX",
    date: "Nov 08, 2024 06:30 AM",
    amount: 25,
    valueUSD: 875.0,
  },
  {
    type: "Send",
    name: "Dogecoin",
    icon: "/images/crypto-icons/dogecoin.svg",
    short_name: "DOGE",
    date: "Nov 07, 2024 01:00 PM",
    amount: 1000,
    valueUSD: 185.5,
  },
  {
    type: "Buy",
    name: "Toncoin",
    icon: "/images/crypto-icons/toncoin.svg",
    short_name: "TON",
    date: "Nov 06, 2024 09:45 AM",
    amount: 0,
    valueUSD: 0,
  },
  {
    type: "Sell",
    name: "Solana",
    icon: "/images/crypto-icons/solana.svg",
    short_name: "SOL",
    date: "Nov 05, 2024 04:20 PM",
    amount: 0.5,
    valueUSD: 99.5,
  },
  {
    type: "Buy",
    name: "Bitcoin",
    icon: "/images/crypto-icons/bitcoin.svg",
    short_name: "BTC",
    date: "Nov 04, 2024 10:00 AM",
    amount: 0.001,
    valueUSD: 72.3,
  },
  {
    type: "Send",
    name: "Ethereum",
    icon: "/images/crypto-icons/ethereum.svg",
    short_name: "ETH",
    date: "Nov 03, 2024 07:15 PM",
    amount: 0.1,
    valueUSD: 394.0,
  },
  {
    type: "Buy",
    name: "XRP",
    icon: "/images/crypto-icons/xrp.svg",
    short_name: "XRP",
    date: "Nov 02, 2024 12:30 PM",
    amount: 200,
    valueUSD: 125.0,
  },
];

export function RecentActivities() {
  const [search, setSearch] = React.useState("");
  const [hideZeroBalance, setHideZeroBalance] = React.useState(true);

  const filteredActivities = React.useMemo(() => {
    let result = activities;
    if (hideZeroBalance) {
      result = result.filter((a) => a.amount !== 0 && a.valueUSD !== 0);
    }
    if (!search.trim()) return result;
    const q = search.trim().toLowerCase();
    return result.filter((activity) => {
      const nameMatch = activity.name.toLowerCase().includes(q);
      const amountMatch = String(activity.amount).includes(q);
      const valueMatch = String(activity.valueUSD).includes(q);
      const typeMatch = activity.type.toLowerCase().includes(q);
      const shortNameMatch = activity.short_name.toLowerCase().includes(q);
      return (
        nameMatch || amountMatch || valueMatch || typeMatch || shortNameMatch
      );
    });
  }, [search, hideZeroBalance]);

  return (
    <Card className="h-full flex flex-col min-h-0 overflow-hidden">
      <CardHeader className="shrink-0">
        <CardTitle>Recent Activities</CardTitle>
        <CardAction className="flex items-center gap-2">
          <Switch
            id="recent-hide-zero"
            checked={hideZeroBalance}
            onCheckedChange={setHideZeroBalance}
          />
          <label
            htmlFor="recent-hide-zero"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Hide zero balance
          </label>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1 min-h-0 overflow-hidden pt-2">
        <Input
          placeholder="Search activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[120px] w-full shrink-0"
        />
        <div className="overflow-y-auto flex-1 min-h-0 space-y-6 pr-1">
          {filteredActivities.map((activity, key) => (
            <div className="flex items-center shrink-0" key={key}>
              <Image
                className="bg-muted size-12 rounded-full border p-2"
                src={activity.icon}
                width={40}
                height={40}
                alt={activity.name}
                unoptimized
              />
              <div className="ml-4 space-y-1 min-w-0">
                <p className="text-sm leading-none font-medium">{activity.name}</p>
                <p className="text-muted-foreground text-sm">{activity.short_name}</p>
              </div>
              <div className="ml-auto flex flex-col text-end shrink-0">
                <span>{activity.valueUSD} USD</span>
                <span className="text-muted-foreground text-sm">
                  {activity.amount} {activity.short_name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
