import { generateMeta } from "@/lib/utils";

import { RecentActivities, TradingCard } from "@/components/buy-sell";

export async function generateMetadata() {
  return generateMeta({
    title: "Buy & Sell - Crypto",
    description:
      "Buy and sell cryptocurrency. Track prices, market trends and portfolio performance.",
    canonical: "/buy-sell",
  });
}

export default async function Page() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TradingCard />
      <RecentActivities />
    </div>
  );
}
