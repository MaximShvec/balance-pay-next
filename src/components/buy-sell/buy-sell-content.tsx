"use client";

import { useState } from "react";
import { TradingCard, RecentActivities, ExchangeRateChart } from "@/components/buy-sell";

export function BuySellContent() {
  const [topAssetId, setTopAssetId] = useState("BTC");
  const [bottomAssetId, setBottomAssetId] = useState("USD");

  return (
    <div className="grid gap-4 md:grid-cols-3 items-start md:items-stretch">
      <TradingCard 
        onAssetChange={(top, bottom) => {
          setTopAssetId(top);
          setBottomAssetId(bottom);
        }} 
      />
      <div className="relative hidden md:block">
        <div className="absolute inset-0">
          <ExchangeRateChart baseAssetId={topAssetId} quoteAssetId={bottomAssetId} />
        </div>
      </div>
      <div className="relative hidden md:block">
        <div className="absolute inset-0">
          <RecentActivities />
        </div>
      </div>
      <div className="md:hidden">
        <ExchangeRateChart baseAssetId={topAssetId} quoteAssetId={bottomAssetId} />
      </div>
      <div className="md:hidden">
        <RecentActivities />
      </div>
    </div>
  );
}
