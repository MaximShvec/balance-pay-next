"use client";

import { useState } from "react";
import { TradingCard, RecentActivities, ExchangeRateChart } from "@/components/buy-sell";

export function BuySellContent() {
  const [topAssetId, setTopAssetId] = useState("BTC");
  const [bottomAssetId, setBottomAssetId] = useState("USD");

  return (
    <div className="grid gap-4 md:h-[calc(var(--content-full-height)-var(--spacing)*8)] xl:h-[calc(var(--content-full-height)-var(--spacing)*16)] md:min-h-0 md:grid-cols-3 md:[&>*]:min-h-0">
      <TradingCard 
        onAssetChange={(top, bottom) => {
          setTopAssetId(top);
          setBottomAssetId(bottom);
        }} 
      />
      <ExchangeRateChart baseAssetId={topAssetId} quoteAssetId={bottomAssetId} />
      <RecentActivities />
    </div>
  );
}
