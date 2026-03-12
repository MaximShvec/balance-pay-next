import { generateMeta } from "@/lib/utils";

import { BuySellContent } from "@/components/buy-sell";

export async function generateMetadata() {
  return generateMeta({
    title: "Buy & Sell - Crypto",
    description:
      "Buy and sell cryptocurrency. Track prices, market trends and portfolio performance.",
    canonical: "/buy-sell",
  });
}

export default async function Page() {
  return <BuySellContent />;
}
